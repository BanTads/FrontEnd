import { Usuario } from "./usuario.model";

export class Gerente extends Usuario {
  constructor(
    public numeroClientes: number = 0,
    public saldoPositivoTotal: number = 0,
    public saldoNegativoTotal: number = 0,
    id?: string,
    nome?: string,
    email?: string,
    cargo?: string
  ) {
    super(id, nome, email, cargo);
  }
}
