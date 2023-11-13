function CardContato({ nome, linkedin, github }) {
  return (
    <div className="border-slate-900 border flex flex-col rounded overflow-hidden ">
      <div>
        <div className="container w-full bg-gradient-to-r from-yellow-300 to-pink-400  gap-4 flex-col flex py-20 px-11">
          <img
            src="https://i.imgur.com/eO3G9kQ.png"
            className="h-12 rounded-full"
            alt="Imagem integrante"
          />
          <h3 className="text-lg font-bold text-center uppercase">{nome}</h3>
        </div>
        <div className="p-4">
          <h4 className="text-lg font-semibold uppercase">{linkedin}</h4>
          <h4 className="text-lg font-semibold uppercase">{github}</h4>
        </div>
      </div>
    </div>
  );
}

export default CardContato;
