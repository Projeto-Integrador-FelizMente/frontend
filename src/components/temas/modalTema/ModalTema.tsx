import Popup from 'reactjs-popup';
import FormularioPostagem from '../formularioTema/FormularioTema';
import { Plus } from '@phosphor-icons/react'
import 'reactjs-popup/dist/index.css';
import './ModalTema.css'

function ModalPostagem() {
    return (
        <>
            <Popup
                trigger={
                    <Plus className="fixed bottom-12 right-8 text-white p-3 rounded-full shadow-lg  focus:outline-none focus:ring bg-gradient-to-r from-yellow-400 to-cyan-500 w-16 h-16 hover:bg-gradient-to-tr dark:bg-gradient-to-r dark:from-purple-800 dark:to-cyan-800"/>
                }
                modal
            >
                <FormularioPostagem />
            </Popup>

        </>
    );
}

export default ModalPostagem;