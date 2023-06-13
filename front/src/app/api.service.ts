import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = 'http://localhost:3000/api'; // URL da sua API Node.js

  constructor(private http: HttpClient) { }

  getDados() {
    return this.http.get(`${this.apiUrl}/dados`);
  }

  // Adicione outras chamadas de API conforme necessário
}