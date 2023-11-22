import CardContato from "../../components/contato/cardContato/CardContato";

function Contato() {
  const contatos = [
    { nome: "Gabriel", linkedin: "linkedin.com", github: "github.com" },
    {
      nome: "Lucas",
      linkedin: "linkedin.com",
      github: "github.com",
    },
    {
      nome: "Mateus",
      linkedin: "linkedin.com",
      github: "github.com",
    },
    {
      nome: "Pedro A",
      linkedin: "linkedin.com",
      github: "github.com",
    },
    {
      nome: "Pedro M",
      linkedin: "linkedin.com",
      github: "github.com",
    },
    {
      nome: "Vitor",
      linkedin: "linkedin.com",
      github: "github.com",
    },
  ];

  const contats = [
    {
      nome: "FelizMente",
      linkedin: "linkedin.com",
      github: "github.com",
    },
  ];

  return (
    <div>
      <h1 className="text-4xl font-bold mt-4 text-center">
        Contatos
      </h1>
      <div className="mx-auto w-max flex">
        <div className="grid grid-cols-1 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-6 gap-4">
          {contatos.map((contato) => (
            <CardContato
              nome={contato.nome}
              linkedin={contato.linkedin}
              github={contato.github}
            />
          ))}
        </div>
      </div>
      <div className="mx-auto w-max">
        {contats.map((contato) => (
          <CardContato
            nome={contato.nome}
            linkedin={contato.linkedin}
            github={contato.github}
          />
        ))}
      </div>
    </div>
  );
}

export default Contato;
