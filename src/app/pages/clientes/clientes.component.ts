import { Component } from '@angular/core';
import { IClientes } from 'src/app/interfaces/clientes';
import { ClientesService } from 'src/app/services/clientes.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent {
  clientes:IClientes[] = [];
  constructor(private clientesService: ClientesService){}

ngOnInit(){
   this.clientesService.buscarTodosOsClientes().subscribe((result: IClientes[]) => {
    this.clientes = result;
   });
}

deletaCliente(cpf: string){
  Swal.fire({
    icon: 'error',
    title: 'Cliente deletado!',
    text: 'Success',
  })
}
}
