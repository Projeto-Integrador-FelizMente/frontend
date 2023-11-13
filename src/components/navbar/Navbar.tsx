import { Link, useNavigate } from "react-router-dom";
import { ReactNode, useContext } from 'react'
import { AuthContext } from "../../contexts/AuthContext";


function Navbar() {
  const navigate = useNavigate();
  const { usuario, handleLogout } = useContext(AuthContext);

  function logout() {
    handleLogout();
    alert("Usuário deslogado com sucesso");
    navigate("/login");
  }

  var url_atual = window.location.pathname;

  let component: ReactNode
  if (usuario.token !== "") {

    component = (
      <div className="flex gap-4">
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
      </div>
    )

  } else {
    if (url_atual !== "/login" && url_atual !== "/cadastro")
    component = (
        <div className="flex gap-4">

          <Link to='/login' className="hover:underline border-l-pink-400">
            Logar
          </Link>

          <Link to="/cadastro" className="hover:underline">
            Cadastrar
          </Link>
        </div>
      )
  }

  return (
    <>
      <div className="w-full bg-gradient-to-r from-yellow-300 to-pink-400">

        <div className="container flex flex-wrap justify-between">
          <div className="flex items-center">
            <Link to='./home' className="hover:underline">
              <img className="w-16 m-3" src="https://i.imgur.com/eO3G9kQ.png" alt="Logo Felizmente" />
            </Link>
            <Link to='/home' className="hover:underline">
              <label className="text-violet-950 text-3xl font-bold">FelizMente</label>
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

export default Navbar