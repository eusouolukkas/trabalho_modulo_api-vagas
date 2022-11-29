import { v4 as idUsuario } from 'uuid';

export class UsuarioModel {
    private _id: string;

    constructor(
        private _nome: string,
        private _username: string,
        private _senha: number,
        private _tipo: string,
        private _empresa: string
    ){
        this._id = idUsuario();
    }

    public get id(){
        return this._id
    }

    public set id(id: string) {
        this._id = id
    }

    public get nome(){
        return this._nome
    }

    public set nome(nome: string) {
        this._nome = nome
    }

    public get username(){
        return this._username
    }

    public set username(username: string) {
        this._username = username
    }

    public get senha(){
        return this._senha
    }

    public set senha(senha: number) {
        this._senha = senha
    }

    public get tipo(){
        return this._tipo
    }

    public set tipo(tipo: string) {
        this._tipo = tipo
    }

    public get empresa(){
        return this._empresa
    }

    public set empresa(empresa: string) {
        this._empresa = empresa
    }

    public toJson() {
        return {
            id: this._id,
            nome: this._nome,
            username: this._username,
            tipo: this._tipo,
            empresa: this._empresa,
        }
    }

    public static create(
        id: string,
        nome: string,
        username: string,
        tipo: string,
        empresa: string,
        senha: number
    ){
        const usuario = new UsuarioModel(nome, username, senha, empresa, tipo)
        usuario._id = id
    }
}

