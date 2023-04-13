import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { IClientes } from 'src/app/interfaces/clientes';
import { ClientesService } from 'src/app/services/clientes.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cadastrar-atualizar-clientes',
  templateUrl: './cadastrar-atualizar-clientes.component.html',
  styleUrls: ['./cadastrar-atualizar-clientes.component.css']
})
export class CadastrarAtualizarClientesComponent {
  clienteForm = new FormGroup({
    nomeCompleto: new FormControl('', Validators.required),
    cpf: new FormControl('', Validators.required),
    telefone: new FormControl('', Validators.required),
    endereco: new FormGroup({
      rua: new FormControl('', Validators.required),
      numero: new FormControl(0, Validators.required),
      cep: new FormControl('', Validators.required)
    }),
    rendimentoMensal: new FormControl(0, Validators.required)
  })

  constructor(private clientesService: ClientesService, private route: ActivatedRoute){}
  clienteCpf = '';

  ngOnInit(){
    this.clienteCpf = String(this.route.snapshot.paramMap.get('cpf'));

    if(this.clienteCpf !== 'null'){
      this.clientesService.buscarClientePorCpf(this.clienteCpf).subscribe((cliente: IClientes)=> {
        return this.clienteForm.setValue({
          nomeCompleto: cliente.nomeCompleto,
          cpf: cliente.cpf,
          telefone: cliente.telefone,
          endereco: {
            rua: cliente.endereco.rua,
            numero: cliente.endereco.numero,
            cep: cliente.endereco.cep
          },
          rendimentoMensal: cliente.rendimentoMensal
        });
      });
    }
  }

  cadastrar(){
    const cliente: IClientes = this.clienteForm.value as IClientes;
    this.clientesService.cadastrarCliente(cliente.subscribe(result => {
      Swal.fire(
        'Tudo ok',
        'Cadastro realizado com sucesso!',
        'success'
      );
    })
  )}

  editar(){
    const cliente: IClientes = this.clienteForm.value as IClientes;
    this.clientesService.atualizarCliente(cliente.subscribe(() => {
      Swal.fire(
        'Tudo ok',
        'Cadastro atualizado com sucesso!',
        'success'
      );
    })
  )}

  deletar(){
    const cliente: IClientes = this.clienteForm.value as IClientes;
    this.clientesService.deletarCliente
  }

  cadastrarOuEditar(){
    if (this.clienteCpf !== '') {
      this.editar();
    } else{
      this.cadastrar();
    }
  }
}
