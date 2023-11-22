import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Dna } from "react-loader-spinner";

import { buscar } from "../../../services/Service";
import { AuthContext } from "../../../contexts/AuthContext";

import Tema from "../../../models/Tema";
import CardTemas from "../cardtemas/CardTemas";
import ModalTema from '../modalTema/ModalTema';
import { toastAlerta } from "../../../utils/toastAlerta";

function ListaTemas() {
  const [temas, setTemas] = useState<Tema[]>([]);

  const navigate = useNavigate();

  const { usuario, handleLogout } = useContext(AuthContext);
  const token = usuario.token;

  async function buscarTemas() {
    try {
      await buscar("/tema", setTemas, {
        headers: { Authorization: token },
      });
    } catch (error: any) {
      if (error.toString().includes("403")) {
        toastAlerta("O token expirou, favor logar novamente", 'info');
        handleLogout();
      }
    }
  }

  useEffect(() => {
    if (token === "") {
      toastAlerta("Você precisa estar logado", 'info');
      navigate("/login");
    }
  }, [token]);

  useEffect(() => {
    buscarTemas();
  }, [temas.length]);

  return (
    <>
      {temas.length === 0 && (
        <Dna
          visible={true}
          height="200"
          width="200"
          ariaLabel="dna-loading"
          wrapperStyle={{}}
          wrapperClass="dna-wrapper mx-auto"
        />
      )}

      <div className="container mx-auto my-4 grid grid-cols-1 row-span-3 md:grid-cols-2 lg:grid-cols-3 gap-4 items-start ">
        {temas.map((tema) => (
          <>
            <CardTemas key={tema.id} tema={tema} />
          </>
        ))}

      </div>
      <ModalTema />
    </>
  );
}

export default ListaTemas;
