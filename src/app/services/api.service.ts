import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';

export enum tipoTamanho {
  P,
  M,
  G
}

export interface Membro {
  nome: string;
  votacao: tipoTamanho;
}

export interface Projeto {
  nome: string;
  criador: string;
  membros: Membro[];
}

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private PATH = 'projetos/';

  constructor(private db: AngularFireDatabase) {}

  criarProjeto(projeto: Projeto) {
    return this.db.list(this.PATH).push(projeto);
  }
}
