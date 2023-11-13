import Tema from './Tema';
import User from './User';

export default interface Postagem {
  id: number;
  titulo: string;
  estado: string;
  texto: string;
  link: string;
  data: string;
  tema: Tema | null;
  user: User | null;
}