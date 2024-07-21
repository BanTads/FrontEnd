export class Usuario {
  public id!: number;
  public nome: string = "";
  public email: string = "";
  public cpf: string = "";
  public telefone: string = "";
  public senha: string = "";
  public papel: string = "";

  constructor(
    id?: number,
    nome?: string,
    email?: string,
    cpf?: string,
    telefone?: string,
    senha?: string,
    papel?: string) {
    if(id) this.id = id;
    if(nome) this.nome = nome;
    if(email) this.email = email;
    if(cpf) this.cpf = cpf;
    if(telefone) this.telefone = telefone;
    if(senha) this.senha = senha;
    if(papel) this.papel = papel;
  }
}
