function CardContato({ nome, linkedin, github }) {
  return (
    <div className="border-slate-900 border flex flex-col flex-wrap rounded overflow-hidden w-full mx-auto">

      <div className="container w-full bg-gradient-to-r from-yellow-300 to-pink-400  gap-4 flex-col flex py-32 px-11 ">
        <img
          src="https://i.imgur.com/eO3G9kQ.png"
          className="h-12 rounded-full"
          alt="Imagem integrante"
        />
        <h3 className="text-lg font-bold text-center uppercase">{nome}</h3>
      </div>
      <div className="p-4 text-lg font-semibold uppercase">
        <h4>{linkedin}</h4>
        <h4>{github}</h4>
      </div>

    </div>
  );
}

export default CardContato;
