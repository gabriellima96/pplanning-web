import { Component, OnInit } from '@angular/core';
import { ApiService, Projeto } from './services/api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(private api: ApiService) {}
  ngOnInit(): void {
    const projeto: Projeto = {
      nome: 'Projeto test',
      criador: 'gabriellima',
      membros: []
    };

    const key = this.api.criarProjeto(projeto);
    console.log(key.key);
  }
}
