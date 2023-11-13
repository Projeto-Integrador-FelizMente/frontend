import CardContato from "../../components/contato/cardContato/CardContato";

function Contato() {
  const contatos = [
    { nome: "Gabriel", linkedin: "linkedin.com", github: "github.com" },
    { id: "lucas", nome: "Lucas", linkedin: "linkedin.com", github: "github.com" },
    { id: "Mateus", nome: "Mateus", linkedin: "linkedin.com", github: "github.com" },
    { id: "pedroA", nome: "Pedro A", linkedin: "linkedin.com", github: "github.com" },
    { id: "pedroM", nome: "Pedro M", linkedin: "linkedin.com", github: "github.com" },
    { id: "vitor", nome: "Vitor", linkedin: "linkedin.com", github: "github.com" },
    { id: "felizmente", nome: "FelizMente", linkedin: "linkedin.com", github: "github.com" },
  ];

  return (
    <div className="container ">
      <h1 className="text-4xl font-bold text-center">Contatos</h1>
        <div className="grid grid-cols-6 gap-4 mx-auto p-3">
          {contatos.map((contato) => (
            <CardContato
              key={contato.id}
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
