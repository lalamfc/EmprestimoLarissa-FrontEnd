export interface IClientes {
  subscribe(arg0: (result: any) => void): IClientes;
  id: number;
  nomeCompleto: string;
  cpf: string;
  telefone: string;
  endereco:{
    cep: string;
    rua: string;
    numero: number;
  }
  rendimentoMensal: number;
}
