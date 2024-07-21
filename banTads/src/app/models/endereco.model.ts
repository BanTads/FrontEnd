export class Endereco {
    public id!: number;
    public tipo!: string;
    public logradouro!: string;
    public numero!: string;
    public complemento!: string;
    public cep!: string;
    public cidade!: string;
    public uf!: string;

    constructor(
        id?: number,
        tipo?: string,
        logradouro?: string,
        numero?: string,
        complemento?: string,
        cep?: string,
        cidade?: string,
        uf?: string
    ) {
        if(id) this.id = id;
        if(tipo) this.tipo = tipo;
        if(logradouro) this.logradouro = logradouro;
        if(numero) this.numero = numero;
        if(complemento) this.complemento = complemento;
        if(cep) this.cep = cep;
        if(cidade) this.cidade = cidade;
        if(uf) this.uf = uf;
    }

}
