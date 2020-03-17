import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, take } from 'rxjs/operators';

import {
  Projeto,
  ApiService,
  ProjetoId,
  Membro,
  tipoTamanho
} from 'src/app/services/api.service';
import { Observable } from 'rxjs';
import { NbToastrService } from '@nebular/theme';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  isLoading = false;

  grupoId = '';
  disabledGrupoId = false;
  showGrupoId = false;
  nome: '';

  constructor(
    private api: ApiService,
    private route: ActivatedRoute,
    private toastrService: NbToastrService
  ) {}

  ngOnInit(): void {
    this.route.queryParamMap.subscribe(queryParams => {
      this.grupoId = queryParams.get('grupoId');

      if (this.grupoId) {
        this.showGrupoId = true;
        this.disabledGrupoId = true;
      }
    });
  }

  onSubmit() {
    this.toggleIsLoading();
    if (this.showGrupoId) {
      this.entrarNoGrupo();
    } else {
      this.criarGrupo();
    }
  }

  entrarNoGrupo(): void {
    const projetoObservable: Observable<ProjetoId> = this.api
      .buscarProjeto(this.grupoId)
      .snapshotChanges()
      .pipe(
        map(action => ({ id: action.payload.key, ...action.payload.val() }))
      );

    projetoObservable.pipe(take(1)).subscribe(projeto => {
      if (!projeto.criador) {
        this.toastrService.show(
          `Não encontramos nenhum grupo com o id ${projeto.id} em nossa base de dados.`,
          'Grupo não encontrado!',
          {
            status: 'warning',
            icon: ''
          }
        );
      } else {
        this.api.adicionarMembro(projeto.id, this.criarMembro());
      }

      this.toggleIsLoading();
    });
  }

  criarGrupo(): void {
    const projetoRef = this.api.criarProjeto(this.criarProjeto());
    this.api.adicionarMembro(projetoRef.key, this.criarMembro());

    this.toggleIsLoading();
  }

  toggleIsLoading(): void {
    this.isLoading = !this.isLoading;
  }

  criarMembro(): Membro {
    return { nome: this.nome, votacao: tipoTamanho.N };
  }

  criarProjeto() {
    const projeto: Projeto = {
      criador: this.nome,
      membros: []
    };

    return projeto;
  }
}
