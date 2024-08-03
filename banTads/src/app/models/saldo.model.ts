export class Saldo {
  saldo:number = 0;
  limite: number = 0;
  total: number = 0;

  constructor(saldo:number, limite:number, total:number){
    this.saldo = saldo;
    this.limite = limite;
    this.total = total
  }
}
