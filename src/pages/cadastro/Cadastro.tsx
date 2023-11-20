import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { RotatingLines } from 'react-loader-spinner';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { cadastrarUsuario, atualizarUsuario, buscar } from '../../services/Service';
import Usuario from '../../models/User';
import { AuthContext } from '../../contexts/AuthContext';

import './Cadastro.css';
import { toastAlerta } from '../../utils/toastAlerta';

function Cadastro() {
  const navigate = useNavigate();

  const { id } = useParams<{ id: string }>();

  const { usuario, handleLogout } = React.useContext(AuthContext);
  const token = usuario.token;

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [confirmaSenha, setConfirmaSenha] = useState<string>("");
  const [tipoSelecionado, setTipoSelecionado] = useState<string>('');

  const [user, setUsuario] = useState<Usuario>({
    id: 0,
    nome: '',
    usuario: '',
    foto: '',
    senha: '',
    tipo: ''
  });

 

  function retornarCadastro() {
    navigate('/home');
  }

  function retornarPerfil() {
    navigate('/perfil');
  }

  function handleConfirmarSenha(e: ChangeEvent<HTMLInputElement>) {
    setConfirmaSenha(e.target.value);
  }

  function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {
    setUsuario({
      ...user,
      [e.target.name]: e.target.value
    });
  }

  const handleSelectChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = event.target.value;
    setTipoSelecionado(selectedValue);
    setUsuario((prevUsuario) => ({
      ...prevUsuario,
      tipo: selectedValue
    }));
  };

  async function buscarUsuarioPorId(usuarioId: string) {
    await buscar(`/usuarios/${usuarioId}`, setUsuario, {
        headers: {
            Authorization: token,
        },
    });
}

useEffect(() => {
  if (id !== undefined) {
    buscarUsuarioPorId(id);
  }
}, [id]);

  async function cadastrarNovoUsuario(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (confirmaSenha === user.senha && user.senha.length >= 8) {
      setIsLoading(true);
      if (id !== undefined) {
        try {
          await atualizarUsuario(`/usuarios/atualizar`, user, setUsuario, {
            headers: {
              Authorization: token,
            },
          });
          toastAlerta('Usuário atualizado com sucesso', 'sucesso');
          retornarPerfil()
        } catch (error) {
          toastAlerta('Erro ao atualizado o Usuário', 'erro');
        }
      } else {
        try {
          await cadastrarUsuario(`/usuarios/cadastrar`, user, setUsuario);
          toastAlerta('Usuário cadastrado com sucesso', 'sucesso');
          retornarCadastro();
        } catch (error) {
          toastAlerta('Erro ao cadastrar o Usuário', 'erro');
        }
      }
    } else if (user.senha.length < 8){
      toastAlerta('Senhas menor que 8 caracteres. Verifique as informações de cadastro.', 'erro');

      setConfirmaSenha("");
    }else {
      toastAlerta('Senhas inconsistentes. Verifique as informações de cadastro.', 'erro');
      setConfirmaSenha("");
    }

    
    setIsLoading(false);
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 h-screen place-items-center font-bold">
      <div className="fundoCadastro hidden lg:block"></div>
      <form
        className='flex justify-center items-center flex-col w-2/3 gap-3'
        onSubmit={cadastrarNovoUsuario}
      >
        <h2 className='dark:text-slate-300 text-slate-900 text-5xl'>
          {id !== undefined ? 'Editar Usuario' : 'Cadastrar'}
        </h2>
        <div className="flex flex-col w-full">
          <label htmlFor="nome">Nome</label>
          <input
            type="text"
            id="nome"
            name="nome"
            placeholder="Nome"
            className="border-2 dark:bg-slate-900 dark:border-slate-300 border-slate-700 rounded p-2"
            value={user.nome}
            onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
          />
        </div>
        <div className="flex flex-col w-full">
          <label htmlFor="usuario">Usuario</label>
          <input
            type="text"
            id="usuario"
            name="usuario"
            placeholder="Usuario"
            className="border-2 dark:bg-slate-900 dark:border-slate-300 border-slate-700 rounded p-2"
            value={user.usuario}
            onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
          />
        </div>
        <div className="flex flex-col w-full">
          <label htmlFor="foto">Foto</label>
          <input
            type="text"
            id="foto"
            name="foto"
            placeholder="Foto"
            className="border-2 dark:bg-slate-900 dark:border-slate-300 border-slate-700 rounded p-2"
            value={user.foto}
            onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
          />
        </div>

        <div className="flex flex-col w-full">


          <div className="flex flex-col gap-2">
            <p>Tipo</p>
            <select
              name="tipo"
              id="tipo"
              className='border p-2 dark:bg-slate-900 dark:border-slate-300 border-slate-800 rounded'
              onChange={handleSelectChange}
              value={tipoSelecionado}
            >
              <option value="" disabled>Selecione um Tipo</option>
              <option value="Profissional">Profissional</option>
              <option value="Utilizador">Utilizador</option>
            </select>
          </div>
        </div>

        <div className="flex flex-col w-full">
          <label htmlFor="senha">Senha</label>
          <input
            type="password"
            id="senha"
            name="senha"
            placeholder="Senha"
            className="border-2 dark:bg-slate-900 dark:border-slate-300 border-slate-700 rounded p-2"
            value={user.senha}
            onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
          />
        </div>
        <div className="flex flex-col w-full">
          <label htmlFor="confirmarSenha">Confirmar Senha</label>
          <input
            type="password"
            id="confirmarSenha"
            name="confirmarSenha"
            placeholder="Confirmar Senha"
            className="border-2 dark:bg-slate-900 dark:border-slate-300 border-slate-700 rounded p-2"
            value={confirmaSenha}
            onChange={(e: ChangeEvent<HTMLInputElement>) => handleConfirmarSenha(e)}
          />
        </div>
        <div className="flex justify-around w-full gap-8">
          <button
            className='rounded shadow-lg shadow-red-800 dark:bg-red-700 dark:hover:bg-red-950 text-white bg-red-400 hover:bg-red-700 w-1/2 py-2'
            onClick={id !== undefined ? retornarPerfil : retornarCadastro}>
            Cancelar
          </button>
          <button
            className='rounded text-white shadow-lg shadow-yellow-800 dark:shadow-blue-500 bg-yellow-500 dark:bg-blue-800 hover:bg-yellow-800 dark:hover:bg-blue-950 w-1/2 py-2 flex justify-center'
            type='submit'>
            {isLoading ? <RotatingLines
              strokeColor="white"
              strokeWidth="5"
              animationDuration="0.75"
              width="24"
              visible={true}
            /> :
              <span>{id !== undefined ? 'Atualizar' : 'Cadastrar'}</span>
            }
          </button>
        </div>
        <hr className="border-slate-800 w-full" />

          <p>
            Já possui uma conta conosco?{' '}
            <Link to="/login" className="text-yellow-500 hover:underline">
              Logar-se
            </Link>
          </p>
      </form>
    </div>
  );
}

export default Cadastro;
