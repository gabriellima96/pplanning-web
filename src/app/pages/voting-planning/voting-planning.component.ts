import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  ApiService,
  ProjetoId,
  tipoTamanho
} from 'src/app/services/api.service';

import { map, take } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { NbToastrService } from '@nebular/theme';

@Component({
  selector: 'app-voting-planning',
  templateUrl: './voting-planning.component.html',
  styleUrls: ['./voting-planning.component.css']
})
export class VotingPlanningComponent implements OnInit {
  nome: '';

  projeto: Observable<ProjetoId>;
  tamanho: tipoTamanho;
  grupoId: string = '';
  userId: string = '';

  totalVotos: number = 0;
  totalMembros: number = 0;

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
      this.tamanho = p.membros[this.userId].votacao;
      let membros = Object.values(p.membros);
      this.totalMembros = membros.length - 1;
      this.totalVotos = membros.filter(m => m.votacao !== 3).length;
    });
  }

  onVoting(tamanho: number) {
    if (this.tamanho === tipoTamanho.N) {
      this.api.atualizarVotacao(this.grupoId, this.userId, tamanho);
    } else {
      this.toastrService.show(
        `Por favor, espere a votação ser reiniciada para votar novamente.`,
        'Ops, parece que você já votou!',
        {
          status: 'info',
          icon: ''
        }
      );
    }
  }
}
