export enum TipoMovimentacao{
  DEPOSITO,
  SAQUE,
  TRANSFERENCIA
}


export interface Movimentacao {
  dataHora: string;
  operacao: "DEPOSITO" | "SAQUE" | "TRANSFERENCIA";
  idCliente: number | null;
  nomeCliente: string | null;
  valor: number;
  tipo: string;
  saldoConsolidado: number;
}

export interface ExtratoData {
  extrato: Movimentacao[];
  saldoFinal: number;
}

export interface ApiResponseExtrato {
  success: boolean;
  message: string;
  data: ExtratoData;
}