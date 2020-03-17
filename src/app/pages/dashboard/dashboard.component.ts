import { Component, OnInit } from '@angular/core';
import {
  ApiService,
  ProjetoId,
  tipoTamanho,
  MembroId
} from 'src/app/services/api.service';
import { ActivatedRoute, Router } from '@angular/router';

import { map, take } from 'rxjs/operators';
import { NbToastrService } from '@nebular/theme';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  projeto: Observable<ProjetoId>;
  grupoId: string = '';
  userId: string = '';
  resumo: boolean = false;

  rank: any = {
    p: [],
    m: [],
    g: [],
    totalMembros: 0,
    totalVotos: 0
  };

  constructor(
    private api: ApiService,
    private route: ActivatedRoute,
    private router: Router,
    private toastrService: NbToastrService
  ) {}

  ngOnInit(): void {
    this.grupoId = this.route.snapshot.paramMap.get('grupoId');
    this.userId = this.route.snapshot.paramMap.get('userId');

    this.api
      .buscarMembro(this.grupoId, this.userId)
      .valueChanges()
      .pipe(take(1))
      .subscribe(membro => {
        if (!membro) {
          this.router.navigateByUrl('/');
        }
      });

    this.projeto = this.api
      .buscarProjeto(this.grupoId)
      .snapshotChanges()
      .pipe(
        map(action => ({ id: action.payload.key, ...action.payload.val() }))
      );

    this.projeto.subscribe(p => {
      if (p.membros[this.userId].nome !== p.criador) {
        this.router.navigateByUrl('/');
      }

      let membros = Object.values(p.membros);
      this.rank.totalMembros = membros.length - 1;
      this.rank.totalVotos = membros.filter(m => m.votacao !== 3).length;
      this.rank.p = membros.filter(m => m.votacao === 0);
      this.rank.m = membros.filter(m => m.votacao === 1);
      this.rank.g = membros.filter(m => m.votacao === 2);
    });
  }

  toggleResumo(resumo) {
    this.resumo = resumo;
  }

  getUrl() {
    return `https://pplanning.gabriellima.site?grupoId=${this.grupoId}`;
  }

  mensagemCopiada() {
    this.toastrService.show(``, 'Copiada a URL do grupo!', {
      status: 'success',
      icon: ''
    });
  }

  onReiniciar() {
    const membrosKeys = this.api
      .buscarMembros(this.grupoId)
      .snapshotChanges()
      .pipe(take(1))
      .pipe(map(action => action.map(m => m.key)));

    membrosKeys.pipe(take(1)).subscribe(msk => {
      msk.forEach(key => {
        this.api.atualizarVotacao(this.grupoId, key, tipoTamanho.N);
      });
    });
  }
}
