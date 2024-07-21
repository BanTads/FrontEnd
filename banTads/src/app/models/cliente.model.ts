import {Usuario} from "./Usuario.model";
import {Endereco} from "./endereco.model";

export class Cliente extends Usuario {
  public conta: string = "";
  public agencia: string = "";
  public gerente!: Usuario;
  public ativo?: boolean;
  public salario?: number;
  public endereco!: Endereco;

  constructor(conta?: string, agencia?: string, gerente?: Usuario, ativo?: boolean, salario?: number, endereco?: Endereco) {
    super();
    if(conta) this.conta = conta;
    if(agencia) this.agencia = agencia;
    if(salario) this.salario = salario;
    if(endereco) this.endereco = endereco;
  }
}
