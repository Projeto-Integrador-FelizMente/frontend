import { ChangeEvent, useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { RotatingLines } from 'react-loader-spinner';


import UsuarioLogin from '../../models/UserLogin';

import { AuthContext } from '../../contexts/AuthContext';

function Login() {

  const navigate = useNavigate();
  const { usuario, handleLogin, isLoading } = useContext(AuthContext);

  const [usuarioLogin, setUsuarioLogin] = useState<UsuarioLogin>(
    {} as UsuarioLogin
  );

  useEffect(() => {
    if (usuario.token !== "") {
      navigate('/home')
    }
  }, [usuario])

  function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {
    setUsuarioLogin({
      ...usuarioLogin,
      [e.target.name]: e.target.value
    })
  }

  function login(e: ChangeEvent<HTMLFormElement>) {
    e.preventDefault()
    handleLogin(usuarioLogin)
  }
  function retorno() {
    navigate('/home');
  }

  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-2 h-screen place-items-center font-bold">
        <form className="flex justify-center items-center flex-col w-1/2 gap-4" onSubmit={login}>
          <h2 className=" dark:text-slate-300 text-slate-900 text-5xl ">Entrar</h2>
          <div className="flex flex-col w-full">
            <label htmlFor="usuario">Usuário</label>
            <input
              type="text"
              id="usuario"
              name="usuario"
              placeholder="Usuario"
              className="border-2 dark:bg-slate-900 dark:border-slate-300 border-slate-900 rounded p-2"
              value={usuarioLogin.usuario}
              onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
            />
          </div>
          <div className="flex flex-col w-full">
            <label htmlFor="senha">Senha</label>
            <input
              type="password"
              id="senha"
              name="senha"
              placeholder="Senha"
              className="border-2 dark:bg-slate-900 dark:border-slate-300 border-slate-900 rounded p-2"
              value={usuarioLogin.senha}
              onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
            />
          </div>
          <div className='flex w-full'>
          <button
            className='rounded text-white shadow-lg shadow-red-800 bg-red-400 dark:bg-red-700 hover:bg-red-700 dark:hover:bg-red-950 w-1/2 py-2 m-2' 
            onClick={retorno}>
            Cancelar
          </button>
          <button
            type='submit'
            className="rounded shadow-lg shadow-yellow-800 dark:shadow-blue-500 bg-yellow-500 dark:bg-blue-800  hover:bg-yellow-800 dark:hover:bg-blue-950 flex justify-center  text-white w-1/2 py-2 m-2">
            {isLoading ? <RotatingLines
              strokeColor="white"
              strokeWidth="5"
              animationDuration="0.75"
              width="24"
              visible={true}
            /> :
              <span>Entrar</span>
            }
          </button>
          </div>
          <hr className="border-slate-800 w-full" />

          <p>
            Ainda não tem uma conta?{' '}
            <Link to="/cadastro" className="text-yellow-500 hover:underline">
              Cadastre-se
            </Link>
          </p>
        </form>
        <div className="hidden lg:block"><img src="https://i.imgur.com/9t2S9gc.png" alt="imagem de fundo meditação"></img></div>
             
      </div>
    </>
  );
}

export default Login;