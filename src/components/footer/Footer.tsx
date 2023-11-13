import { Link } from 'react-router-dom';
function Footer() {

  const data = new Date().getFullYear()

  return (
    <>
      <div className="flex justify-center bg-gradient-to-r from-yellow-300 to-pink-400">
        <div className="container flex flex-col items-center py-4 text-violet-950">
          <p className='text-xl font-bold'>
            FelizMente | Copyright ©️ {data}
          </p>

          <div className='' >
            <Link to="/contato" className='hover:underline'>
              <p className='text-lg'>Contatos</p>
            </Link>
          </div>

        </div>
      </div>
    </>
  )
}

export default Footer