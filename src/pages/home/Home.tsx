// import { useContext } from "react"
// import { AuthContext } from "../../context/AuthContext"

function Home() {

  return (
    <>
      <div className="bg-amber-100 flex justify-center">
        <div className='container grid grid-cols-2 text-black'>
          <div className="flex flex-col gap-4 items-center justify-center py-4">
            <h2 className='text-5xl font-bold text-center'>
             Caminhando juntos rumo à FelizMente!
            </h2>
            

            <div className="flex justify-around gap-4">
              <div className='rounded text-black 
                                            border-black border-solid border-2 py-2 px-4'
              >
                Nova Postagem
              </div>
            </div>
          </div>

          <div className="flex justify-center ">
            <img
              src="src/assets/capivara-reflexiva.png"
              alt="Imagem Página Home"
              className='w-2/3'
            />
          </div>
        </div>
      </div>
    </>
  )
}

export default Home