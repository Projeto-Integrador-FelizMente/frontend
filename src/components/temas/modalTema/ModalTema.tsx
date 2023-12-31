import Popup from 'reactjs-popup';
import FormularioTema from '../formularioTema/FormularioTema';
import { Plus } from '@phosphor-icons/react'
import 'reactjs-popup/dist/index.css';
import './ModalTema.css'
import { useTheme } from '../../../hooks/useTheme';
import { useMediaQuery } from 'react-responsive';
import Tema from '../../../models/Tema';

interface ModalTemaProps {
    temas: Tema[]
    getTemas: () => void
}

function ModalTema({ temas, getTemas }: ModalTemaProps) {
    const { theme } = useTheme();

    const isMobile = useMediaQuery({ maxWidth: 767 });

    return (
        <>
            <Popup
                trigger={
                    <Plus className="fixed bottom-12 right-8 text-white p-3 rounded-full shadow-lg  focus:outline-none focus:ring bg-gradient-to-r from-yellow-300 to-pink-400 w-16 h-16 hover:bg-gradient-to-tr dark:bg-gradient-to-r dark:from-purple-800 dark:to-cyan-800" />
                }
                modal
                contentStyle={{ width: isMobile ? '100vw' : '65vw', height: isMobile ? '100vh' : '' }}
                className={`modal ${theme === 'dark' ? 'dark' : ''}`}
            >
                <FormularioTema temas={temas} getTemas={getTemas} />
            </Popup>

        </>
    );
}

export default ModalTema;