import { Link, useNavigate } from "react-router-dom";
import { ReactNode, useContext } from 'react'
import { AuthContext } from "../../contexts/AuthContext";
import { toastAlerta } from "../../utils/toastAlerta";


function Navbar() {
  const navigate = useNavigate();
  const { usuario, handleLogout } = useContext(AuthContext);

  function logout() {
    handleLogout();
    toastAlerta("Usuário deslogado com sucesso", 'sucesso');
    navigate("/login");
  }

  var url_atual = window.location.pathname;

  let component: ReactNode
  if (usuario.token !== "") {

    component = (
      <div className="flex gap-4 text-xl mr-4">
        <Link to='/postagens' className="hover:underline">
          Postagens
        </Link>

        <Link to='/tema' className="hover:underline ">
          Temas
        </Link>

        <Link to='/perfil' className="hover:underline ">
          Perfil
        </Link>
        <Link to="" onClick={logout} className="hover:underline">
          Sair
        </Link>
      </div>
    )

  } else {
    if (url_atual !== "/login" && url_atual !== "/cadastro")
      component = (
        <div className="flex gap-4 text-xl p-8 mr-4">

          <Link to='/login' className="hover:underline hover:text-lime-500">
            Logar
          </Link>

          <Link to="/cadastro" className="hover:underline hover:text-lime-500">
            Cadastrar
          </Link>
        </div>
      )
  }

  return (
    <>
      <div className=" bg-gradient-to-r from-yellow-300 to-pink-400 w-full justify-between  flex flex-wrap dark:bg-gradient-to-r dark:from-purple-900 dark:to-pink-800">
        <div className="flex items-center">
          <Link to='./home' className="hover:underline ">
            <img className="w-16 m-3" src="https://i.imgur.com/eO3G9kQ.png" alt="Logo Felizmente" />
          </Link>
          <Link to='/home'>
            <label className="text-violet-950 dark:text-violet-500 text-3xl font-bold cursor-pointer hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-purple-400 hover:to-pink-600">
              FelizMente
            </label>
          </Link>
        </div>
        <div className='items-center flex font-serif '>
          {component}
        </div>
      </div>
    </>
  )
}

export default Navbar