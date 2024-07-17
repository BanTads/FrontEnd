import {Usuario} from "./Usuario.model";

export class Cliente extends Usuario {
  public conta: string = "";
  public agencia: string = "";
  public gerente!: Usuario;
  public ativo?: boolean;
  public salario?: number;

  constructor(conta?: string, agencia?: string, gerente?: Usuario, ativo?: boolean, salario?: number) {
    super();
    if(conta) this.conta = conta;
    if(agencia) this.agencia = agencia;
    if(salario) this.salario = salario;
  }
}
