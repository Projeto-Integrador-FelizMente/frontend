import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Dna } from "react-loader-spinner";

import { buscar } from "../../../services/Service";
import { AuthContext } from "../../../contexts/AuthContext";

import Postagem from "../../../models/Postagem";
import CardPostagens from "../cardPostagens/CardPostagens";
import ModalPostagem from "../modalPostagem/ModalPostagem";
import { toastAlerta } from "../../../utils/toastAlerta";

function ListaPostagensById() {
  const navigate = useNavigate();

  const { usuario, handleLogout } = useContext(AuthContext);
  const token = usuario.token;

    const [postagens, setPostagens] = useState<Postagem[]>([]);

    async function buscarPostagens() {
        try {
          await buscar("/postagens", setPostagens, {
            headers: {
              Authorization: token,
            },
          });
        } catch (error: any) {
          if (error.toString().includes("403")) {
            toastAlerta("O token expirou, favor logar novamente", 'info');
            handleLogout();
          }
        }
      }

      useEffect(() => {
        buscarPostagens();
      }, [token]);

  useEffect(() => {
    if (token === "") {
      toastAlerta("Você precisa estar logado", 'info');
      navigate("/");
    }
  }, [token, navigate]);



  return (
    <>
      {postagens.length === 0 && (
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
        {postagens
          .filter((postagem) => postagem.user?.id === usuario.id)
          .map((filteredPostagem) => (
            <CardPostagens key={filteredPostagem.id} post={filteredPostagem} />
          ))}
      </div>
      <ModalPostagem posts={postagens} getPosts={buscarPostagens}/>
    </>
  );
}

export default ListaPostagensById;
