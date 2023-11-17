import React, { useContext, ReactNode, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';
import { useTheme } from '../../hooks/useTheme';
import { toastAlerta } from '../../utils/toastAlerta';
import sunImg from '../navbar/images/sun-dim.svg';  // Adapte o caminho conforme necessário
import moonImg from '../navbar/images/moon.svg';    // Adapte o caminho conforme necessário

function Navbar() {
  const navigate = useNavigate();
  const { usuario, handleLogout } = useContext(AuthContext);
  const { theme, setTheme } = useTheme();

  function logout() {
    handleLogout();
    toastAlerta('Usuário deslogado com sucesso', 'sucesso');
    navigate('/login');
  }

  var url_atual = window.location.pathname;

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove('light', 'dark');
    root.classList.add(theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  let component: ReactNode;
  if (usuario.token !== '') {
    component = (
      <div className="flex gap-4 text-xl mr-4">
        <Link to="/postagens" className="hover:underline">
          Postagens
        </Link>

        <Link to="/tema" className="hover:underline">
          Temas
        </Link>

        <Link to="/perfil" className="hover:underline">
          Perfil
        </Link>
        <Link to="" onClick={logout} className="hover:underline">
          Sair
        </Link>
        <div className="cursor-pointer" onClick={() => setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'))}>
          {theme === 'light' ? (
            <img width="35px" src={moonImg} alt="Botão para trocar o tema entre claro e escuro." />
          ) : (
            <img width="35px" src={sunImg} alt="Botão para trocar o tema entre claro e escuro." />
          )}
        </div>
      </div>
    );
  } else {
    if (url_atual !== '/login' && url_atual !== '/cadastro') {
      component = (
        <div className="flex gap-4 text-xl p-8 ">
          <Link
            to="/login"
            className="hover:underline hover:text-violet-950 text--500 cursor-pointer hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r from-purple-400 to-pink-600"
          >
            Logar
          </Link>

          <Link
            to="/cadastro"
            className="hover:underline hover:text-violet-950 text--500 cursor-pointer hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r from-purple-400 to-pink-600"
          >
            Cadastrar
          </Link>
          <div
            className="border border-transparent p-1 rounded-full duration-500 hover:shadow-2xl hover:shadow-blue-400 hover:border hover:bg-zinc-800 hover:text-black cursor-pointer"
            onClick={() => setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'))}
          >
            {theme === 'light' ? (
              <img width="35px" src={moonImg} alt="Botão para trocar o tema entre claro e escuro." />
            ) : (
              <img width="35px" src={sunImg} alt="Botão para trocar o tema entre claro e escuro." />
            )}
          </div>
        </div>
      );
    }
  }

  return (
    <>
      <div className="bg-gradient-to-r from-yellow-300 to-pink-400 w-full justify-between flex flex-wrap dark:bg-gradient-to-r dark:from-purple-900 dark:to-pink-800">
        <div className="flex items-center">
          <Link to="./home" className="hover:underline ">
            <img className="w-16 m-3" src="https://i.imgur.com/eO3G9kQ.png" alt="Logo Felizmente" />
          </Link>
          <Link to="/home">
            <label className="text-violet-950 dark:text-violet-500 text-3xl font-bold cursor-pointer hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-purple-400 hover:to-pink-600">
              FelizMente
            </label>
          </Link>
        </div>
        <div className="items-center flex font-serif">{component}</div>
      </div>
    </>
  );
}

export default Navbar;
