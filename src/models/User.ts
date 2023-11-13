import Postagem  from "./Postagem";

export default interface User {
  id: number;
  nome: string;
  usuario: string;
  foto: string;
  senha: string;
  tipo: string;
  postagem?: Postagem | null;
}