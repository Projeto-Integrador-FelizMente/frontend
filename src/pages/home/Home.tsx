function Home() {
  return (
    <>
      <div className="bg-amber-50 border-b-2 border-zinc-300 dark:border-slate-600  flex justify-center dark:bg-rose-800 dark:text-white">
        <div className='flex grid-cols-2 text-black items-center justify-between '>
          <h2 className='dark:text-white text-2xl sm:text-3xl md:text-5xl lg:text-6x1 font-bold text-center'>
            Caminhando juntos rumo à FelizMente!
          </h2>
          <img
            src="https://i.imgur.com/6FMtYzb.png"
            alt="Imagem Página Home"
            className='w-2/5'
          />
        </div>
      </div>
      <div className='grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 mx-8 mb-5'>
        <div>
          <h1 className='text-5xl font-bold text-Start m-10'>
            Sobre
          </h1>
          <div className="flex text-justify lg:text-2xl items-center flex-col gap-3 w-full">
              <p>
                Bem-vindo ao FelizMente, um refúgio virtual construído com a missão de cuidar da saúde mental e inspirado pela nobre causa da ONU, em especial a ODS 03 - Saúde e Bem-Estar. Em um mundo onde as batalhas internas muitas vezes permanecem silenciosas, nosso site surge como uma luz acolhedora para aqueles que enfrentam a depressão e a ansiedade.
              </p>
              <p>
                Aqui, acreditamos na força transformadora do compartilhamento e da empatia. O FelizMente é um espaço dedicado a proporcionar conforto e apoio, onde cada voz é valorizada e ouvida. Entendemos que falar sobre doenças mentais pode ser desafiador, e é por isso que garantimos total anonimato nas postagens. Neste ambiente seguro, a preocupação com a revelação da identidade é deixada para trás, dando lugar à liberdade de expressão e à busca pela cura.
              </p >
              <p>
                Nossa comunidade é formada por dois grupos essenciais. De um lado, profissionais em psicologia, dedicados e compassivos, oferecem ajuda de forma não-anônima, contribuindo voluntariamente para o bem-estar mental. Do outro lado, temos os usuários comuns, indivíduos corajosos em busca de auxílio, cujas histórias e desabafos podem ser compartilhados de maneira anônima.
              </p >
              <p>
                O FelizMente não é apenas um site; é uma comunidade que se propõe a iluminar caminhos, oferecer suporte e construir pontes para a cura. Juntos, escrevemos histórias de superação, guiados pelo entendimento de que a jornada para a felicidade começa com a coragem de se abrir. Seja parte dessa jornada conosco, no FelizMente, onde a busca pelo equilíbrio emocional é guiada pela esperança e pela compaixão.
              </p>
            </div>
        </div>
        <div className="">
          <img src="https://i.imgur.com/9qL8DQ1.png" alt="Imagem Home" className='w-full h-full '/>
        </div>
      </div>

    </>
  )
}

export default Home
