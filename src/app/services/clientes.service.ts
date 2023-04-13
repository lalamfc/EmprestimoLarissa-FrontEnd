import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environment/environment';
import { IClientes } from '../interfaces/clientes';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class ClientesService {
  endpoint = 'clientes';
  api = environment.api;
  constructor(private http: HttpClient) { }

buscarTodosOsClientes(){
  return this.http.get<IClientes[]>(`${this.api}/${this.endpoint}`);
}

buscarClientePorCpf(cpf: string){
  return this.http.get<IClientes>(`${this.api}/${this.endpoint}/${cpf}`);
}

cadastrarCliente(cliente: IClientes){
  return this.http.post(`${this.api}/${this.endpoint}`, cliente);
}

atualizarCliente(cliente: IClientes): Observable<IClientes>{
  const url = `${this.api}/${this.endpoint}/${cliente.cpf}`;
  return this.http.put<IClientes>(url,cliente);
}

deletarCliente(cpf: String){
  return this.http.delete(`${this.api}/${this.endpoint}/${cpf}`)
}

}
