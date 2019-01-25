import { Funcionario } from '../provider/funcionario';

export class Profissional {
	public id_profissional : string;
	public id_empresa : string;
	public cpf : string;
	public email : string;
	public nome : string;
	public foto : string;
	public sexo : string;
	public admin : number;
	public lembrar : number;
	public funcionarios : Funcionario[];
}