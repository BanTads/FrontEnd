import {Conta} from "./conta.model";
import {Usuario} from "./usuario.model";

export class Cliente extends Usuario{
  constructor(
    public cpf: string ="",
    public telefone: string = "",
    public senha: string = "",
    public salario: number = 0,
    public conta: Conta,
    id?: string,
    nome?: string,
    email?: string,
    cargo?: string
    ) {
    super(id, nome, email, cargo);
  }
}
