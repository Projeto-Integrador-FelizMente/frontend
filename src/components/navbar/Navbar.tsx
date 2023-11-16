import React, { useContext,ReactNode } from 'react';
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import { AuthContext } from "../../contexts/AuthContext";
import { useTheme } from "../../hooks/useTheme";

function Navbar() {
  const navigate = useNavigate();
  const { usuario, handleLogout } = useContext(AuthContext);
  const { theme, setTheme } = useTheme();

  function logout() {
    handleLogout();
    alert("Usuário deslogado com sucesso");
    navigate("/login");
  }

  var url_atual = window.location.pathname;

  let component: ReactNode;
  if (usuario.token !== "") {
    component = (
      <div className="flex gap-4 text-xl ">
        <Link to='/postagens' className="hover:underline">
          Postagens
        </Link>

        <Link to='/tema' className="hover:underline">
          Temas
        </Link>

        <Link to='/perfil' className="hover:underline">
          Perfil
        </Link>
        <Link to="" onClick={logout} className="hover:underline">
          Sair
        </Link>
        <button onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
          {theme === 'light' ? 'Modo Escuro' : 'Modo Claro'}
        </button>
      </div>
    );
  } else {
    if (url_atual !== "/login" && url_atual !== "/cadastro") {
      component = (
        <div className="flex gap-4 text-xl p-8 ">
          <Link to='/login' className="hover:underline hover:text-violet-950 text--500 cursor-pointer hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r from-purple-400 to-pink-600">
            Logar
          </Link>

          <Link to="/cadastro" className="hover:underline hover:text-violet-950 text--500 cursor-pointer hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r from-purple-400 to-pink-600">
            Cadastrar
          </Link>
          <button onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
            {theme === 'light' ? 'Modo Escuro' : 'Modo Claro'}
          </button>
        </div>
      );
    }
  }

  return (
    <>
      <div className="w-full bg-gradient-to-r from-yellow-300 to-pink-400">
        <div className="container flex flex-wrap justify-between">
          <div className="flex items-center">
            <Link to='./home' className="hover:underline ">
              <img className="w-16 m-3" src="https://i.imgur.com/eO3G9kQ.png" alt="Logo Felizmente" />
            </Link>
            <Link to='/home'>
              <label className="text-violet-950 text-3xl font-bold cursor-pointer hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r from-purple-400 to-pink-600">
                FelizMente
              </label>
            </Link>
          </div>
          <div className='items-center flex font-serif '>
            {component}
          </div>
        </div>
      </div>
    </>
  )
}

export default Navbar;
