
import './Home.css'
function Home() {

  
  return (
    <>
      <div className="bg-amber-100 flex justify-center">
        <div className='flex grid-cols-2 text-black items-center justify-between '>
          <h2 className='text-5xl font-bold text-center'>
            Caminhando juntos rumo à FelizMente!
          </h2>
          <img
            src="https://i.imgur.com/6FMtYzb.png"
            alt="Imagem Página Home"
            className='w-2/5'
          />
        </div>
      </div>
      <h1 className='text-5xl font-bold text-Start m-5'>Sobre</h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 max-h-max m-5">
        <div className="flex justify-center items-center flex-col w-2/3 gap-3">
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
      <div className="fundoHome hidden lg:block "></div>

    </div >
   
    </>
  )
}

export default Home
