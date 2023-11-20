import React, { useContext, ReactNode, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';
import { useTheme } from '../../hooks/useTheme';
import { toastAlerta } from '../../utils/toastAlerta';
import sunImg from '../navbar/images/sun-dim.svg';
import moonImg from '../navbar/images/moon.svg';

function Navbar() {
  const navigate = useNavigate();
  const { usuario, handleLogout } = useContext(AuthContext);
  const { theme, setTheme } = useTheme();

  const isUserLoggedIn = usuario.token !== '';
  const isLoginPage = window.location.pathname === '/login';
  const isRegisterPage = window.location.pathname === '/cadastro';

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove('light', 'dark');
    root.classList.add(theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const logout = () => {
    handleLogout();
    toastAlerta('Usuário deslogado com sucesso', 'sucesso');
    navigate('/login');
  };

 

  const renderAuthenticatedNavbar = () => (
    <div className="bg-gradient-to-r from-yellow-300 to-pink-400 w-full justify-between flex flex-wrap dark:bg-gradient-to-r dark:from-purple-900 dark:to-pink-800  top-0">

      <div className="flex items-center">
        <Link to="./home" className="hover:underline ">
          <img className="w-16 m-3" src="https://i.imgur.com/eO3G9kQ.png" alt="Logo Felizmente" />
        </Link>
        <Link to="/home">
          <label className="text-violet-950 dark:text-violet-500 text-3xl font-bold cursor-pointer hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-purple-400 hover:to-pink-600 dark:hover:text-transparent dark:hover:bg-clip-text dark:hover:bg-gradient-to-r dark:hover:from-purple-400 dark:hover:to-pink-600">
            FelizMente
          </label>
        </Link>
      </div>
      <div className="items-center flex font-serif">
        <div className="flex gap-4 text-xl mt-3 ">
          <Link to="/postagens" className="p-2 cursor-pointer dark:hover:text-purple-200 hover:text-purple-800 ">
            Postagens
          </Link>

          <Link to="/tema" className="p-2 cursor-pointer dark:hover:text-purple-200 hover:text-purple-800 ">
            Temas
          </Link>

          <Link to="/perfil" className="p-2 cursor-pointer dark:hover:text-purple-200 hover:text-purple-800 ">
            Perfil
          </Link>
          <Link to="" onClick={logout} className="p-2 cursor-pointer dark:hover:text-purple-200 hover:text-purple-800 ">
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
      </div>
    </div>
  );
  const renderGuestNavbar = () => (

    <div className="bg-gradient-to-r from-yellow-300 to-pink-400 w-full justify-between flex flex-wrap dark:bg-gradient-to-r dark:from-purple-900 dark:to-pink-800 top-0 ">
      <div className="flex items-center">
        <Link to="./home" className="hover:underline ">
          <img className="w-16 m-3" src="https://i.imgur.com/eO3G9kQ.png" alt="Logo Felizmente" />
        </Link>
        <Link to="/home">
          <label className="text-violet-950 dark:text-violet-500 text-3xl font-bold cursor-pointer hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-purple-400 hover:to-pink-600 dark:hover:text-transparent dark:hover:bg-clip-text dark:hover:bg-gradient-to-r dark:hover:from-purple-400 dark:hover:to-pink-600">
            FelizMente
          </label>
        </Link>
      </div>
      <div className="items-center flex font-serif">
        <div className="flex gap-4 text-xl mx-2 mt-2  ">
          <Link
            to="/login"
            className="p-2 cursor-pointer dark:hover:text-purple-200 hover:text-purple-800 "
          >
            Logar
          </Link>

          <Link
            to="/cadastro"
            className="p-2 cursor-pointer dark:hover:text-purple-200 hover:text-purple-800 "
          >
            Cadastrar
          </Link>
          <div className="cursor-pointer" onClick={() => setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'))}>
            {theme === 'light' ? (
              <img width="35px" src={moonImg} alt="Botão para trocar o tema entre claro e escuro." />
            ) : (
              <img width="35px" src={sunImg} alt="Botão para trocar o tema entre claro e escuro." />
            )}
          </div>
        </div>
      </div>
    </div>
  );


  return (
    <>
      {isUserLoggedIn ? renderAuthenticatedNavbar() : !isLoginPage && !isRegisterPage && renderGuestNavbar()}
    </>
  );
}

export default Navbar;
