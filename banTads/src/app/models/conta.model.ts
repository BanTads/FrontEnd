import {Saldo} from "./saldo.model";

export class Conta {
  public numeroConta!: number;
  public aprovada: boolean | null = null;
  public idCliente!: number;
  public dataCriacao: string = "";
  public limite: number = 0;
  public idGerente!: number;
  public motivo: string | null = null;
  public saldo!: Saldo;

  constructor(
    numeroConta?: number,
    aprovada?: boolean | null,
    idCliente?: number,
    dataCriacao?: string,
    limite?: number,
    idGerente?: number,
    motivo?: string | null,
    saldo?: Saldo) {
    if(numeroConta) this.numeroConta = numeroConta;
    if(aprovada !== undefined) this.aprovada = aprovada;
    if(idCliente) this.idCliente = idCliente;
    if(dataCriacao) this.dataCriacao = dataCriacao;
    if(limite) this.limite = limite;
    if(idGerente) this.idGerente = idGerente;
    if(motivo !== undefined) this.motivo = motivo;
    if(saldo !== undefined) this.saldo = saldo;
  }
}
