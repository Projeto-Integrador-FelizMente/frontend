import { Link, useLocation } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../contexts/AuthContext';

function Footer() {
  const data = new Date().getFullYear();
  const { usuario } = useContext(AuthContext);
  const location = useLocation();
  const [showFooter, setShowFooter] = useState(true);

  useEffect(() => {
    const url_atual = location.pathname;

    if (usuario.token !== "") {
      setShowFooter(true);
    } else {
      if (url_atual !== "/login" && url_atual !== "/cadastro") {
        setShowFooter(true);
      } else {
        setShowFooter(false);
      }
    }
  }, [location.pathname, usuario.token]);

  if (!showFooter) {
    return null;
  }

  return (
    <div className="flex justify-center bg-gradient-to-r from-yellow-300 to-pink-400 dark:bg-gradient-to-r dark:from-purple-900 dark:to-pink-800">
      <div className="container flex flex-col items-center py-4 text-violet-950 dark:text-violet-600">
        <p className='text-xl font-bold'>
          FelizMente | Copyright ©️ {data}
        </p>
        <a className='hover:underline text-lg' href="https://linktr.ee/felizmentee" target="_blank" rel="noopener noreferrer">Contatos</a>
      </div>
    </div>
  );
}

export default Footer;
