import { ChangeEvent, useContext, useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { RotatingLines } from "react-loader-spinner";

import { atualizar, buscar, cadastrar } from "../../../services/Service";
import { AuthContext } from "../../../contexts/AuthContext";

import Tema from "../../../models/Tema";
import { toastAlerta } from "../../../utils/toastAlerta";
import { ArrowCircleLeft } from '@phosphor-icons/react';

interface ModalTemaProps{
  temas?: Tema[]
  getTemas?: () => void
}


function FormularioTema({temas, getTemas}: ModalTemaProps) {
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [tema, setTema] = useState<Tema>({} as Tema);

  const { id } = useParams<{ id: string }>();

  const { usuario, handleLogout } = useContext(AuthContext);
  const token = usuario.token;

  async function buscarPorId(id: string) {
    try {
      await buscar(`/tema/${id}`, setTema, {
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
    if (token === "") {
      toastAlerta("Você precisa estar logado", 'info');
      navigate("/login");
    }
  }, [token]);

  useEffect(() => {
    if (id !== undefined) {
      buscarPorId(id);
    }
  }, [id]);

  function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {
    setTema({
      ...tema,
      [e.target.name]: e.target.value,
    });
  }

  async function gerarNovoTema(e: ChangeEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsLoading(true);

    if (id !== undefined) {
      try {
        await atualizar(`/tema`, tema, setTema, {
          headers: {
            Authorization: token,
          },
        });

        alert("Tema atualizado com sucesso");
      } catch (error: any) {
        if (error.toString().includes("403")) {
          toastAlerta("O token expirou, favor logar novamente", 'info');
          handleLogout();
        } else {
          toastAlerta("Erro ao atualizar o Tema", 'erro');
        }
      }
    } else {
      try {
        await cadastrar(`/tema`, tema, setTema, {
          headers: {
            Authorization: token,
          },
        });

        toastAlerta("Tema cadastrado com sucesso", 'sucesso');
      } catch (error: any) {
        if (error.toString().includes("403")) {
          toastAlerta("O token expirou, favor logar novamente", 'info');
          handleLogout();
        } else {
          toastAlerta("Erro ao cadastrar o Tema", 'erro');
        }
      }
    }

    setIsLoading(false);
    getTemas();
    retornar();
  }

  function retornar() {
    navigate("/tema");
  }

  return (
    <div className=" dark:bg-slate-900 dark:border-slate-300 container flex flex-col items-center justify-center mx-auto">
      <h1 className="text-4xl text-center my-8">
        {id === undefined ? "Cadastrar Tema" : "Editar Tema"}
      </h1>

      <form className="w-1/2 flex flex-col gap-4" onSubmit={gerarNovoTema}>
        <div className="flex flex-col gap-2">
          <label htmlFor="Nome">Nome do Tema</label>
          <input
            type="text"
            placeholder="Escreva o nome do Tema"
            name="Nome"
            className="border-2  dark:bg-slate-900 dark:border-slate-300 border-slate-700 rounded p-2"
            value={tema.nome}
            onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
          />
          <label htmlFor="descricao">Descrição do Tema</label>
          <input
            type="text"
            placeholder="Descreva aqui seu tema"
            name="descricao"
            className="border-2 dark:border-slate-200 dark:bg-slate-900 border-slate-700 rounded p-2"
            value={tema.descricao}
            onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
          />
        </div>
        <button
          className="w-1/2 text-center py-2 mx-auto flex justify-center rounded shadow-lg shadow-yellow-800  bg-yellow-500 hover:bg-yellow-800  dark:bg-blue-800 dark:hover:bg-blue-950 dark:shadow-blue-500 "
          type="submit"
        >
          {isLoading ? (
            <RotatingLines
              strokeColor="white"
              strokeWidth="5"
              animationDuration="0.75"
              width="24"
              visible={true}
            />
          ) : (
            <span>Confirmar</span>
          )}
        </button>
        <div className="lg:hidden fixed left-4 flex items-center">
                <Link to='/postagens'>
                <ArrowCircleLeft size={48} weight="bold" />
                </Link>
                </div>
      </form>
    </div>
  );
}

export default FormularioTema;
