function CardContato({ nome, linkedin, github }) {
  return (
    <div className="border-slate-900 border flex flex-col flex-wrap rounded overflow-hidden w-full mx-auto my-2">
      <div className="container w-full bg-gradient-to-r from-yellow-300 to-pink-400 dark:bg-gradient-to-r dark:from-purple-900 dark:to-pink-800 gap-4 flex-col flex py-32 px-11">
        <img
          src="https://i.imgur.com/eO3G9kQ.png"
          className="h-auto sm:h-auto rounded-full"
          alt="Imagem integrante"
        />
        <h3 className="text-sm sm:text-base md:text-lg lg:text-xl font-bold text-center uppercase">
          {nome}
        </h3>
      </div>
      <div className="p-4 text-sm sm:text-base md:text-lg lg:text-xl font-semibold uppercase border border-gray-500">
        <h4>{linkedin}</h4>
        <h4>{github}</h4>
      </div>
    </div>
  );
}

export default CardContato;
