import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";

import { AuthContext } from "../../contexts/AuthContext";


function Navbar() {

  const navigate = useNavigate();
  const { handleLogout } = useContext(AuthContext);

  function logout() {
    handleLogout();
    alert("Usuário deslogado com sucesso");
    navigate("/login");
  }

  return (
    <>
      <div className="w-full bg-gradient-to-r from-yellow-300 to-pink-400">

        <div className="container flex flex-wrap justify-between">
          <div className="flex items-center"> 
            <img className="w-16 m-3" src="src/assets/LogoFelizMente.png" alt="Logo Felizmente" />
            <label className="text-violet-950 text-3xl font-bold">FelizMente</label>
          </div>

          <div className='items-center flex gap-4 font-serif '>
            <Link to='/home' className="hover:underline">
              Postagens
            </Link>

            <Link to='/temas' className="hover:underline">
              Temas
            </Link>

            <Link to='/cadastroTema' className="hover:underline">
              Cadastrar tema
            </Link>

            <Link to='/home' className="hover:underline">
              Perfil
            </Link>

            <Link to="" onClick={logout} className="hover:underline">
              Sair
            </Link>


          </div>
        </div>
      </div>
    </>
  )
}

export default Navbar