import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';

export enum tipoTamanho {
  P,
  M,
  G,
  N
}

export interface Membro {
  nome: string;
  votacao: tipoTamanho;
}

export interface Projeto {
  criador: string;
  membros: Membro[];
}

export interface ProjetoId extends Projeto {
  id: string;
}

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private PATH = 'projetos/';
  private MEMBRO_PATH = 'membros/';

  constructor(private db: AngularFireDatabase) {}

  criarProjeto(projeto: Projeto) {
    return this.db.list(this.PATH).push(projeto);
  }

  buscarProjeto(key: string) {
    return this.db.object<ProjetoId>(this.PATH + key);
  }

  adicionarMembro(key: string, membro: Membro) {
    return this.db.list(`${this.PATH}${key}/${this.MEMBRO_PATH}`).push(membro);
  }
}
