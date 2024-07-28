
export class Usuario {
  public id!: string;
  public nome: string = "";
  public email: string = "";
  public cargo: string = "";

  constructor(
    id?: string,
    nome?: string,
    email?: string,
    cargo?: string) {
    if(id) this.id = id;
    if(nome) this.nome = nome;
    if(email) this.email = email;
    if(cargo) this.cargo = cargo;
  }
}
