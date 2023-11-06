import Tema from './Tema';
import Usuario from './Usuario';

export default interface Postagem {
  id: number;
  titulo: string;
  estado: string;
  texto: string;
  link: string;
  data: string;
  tema: Tema | null;
  usuario: Usuario | null;
}