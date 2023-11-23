import Popup from 'reactjs-popup';
import FormularioPostagem from '../formularioPostagem/FormularioPostagem';
import { Plus } from '@phosphor-icons/react';
import 'reactjs-popup/dist/index.css';
import './ModalPostagem.css';
import { useTheme } from '../../../hooks/useTheme';
import { useMediaQuery } from 'react-responsive';


function ModalPostagem() {
  const { theme } = useTheme();

  const isMobile = useMediaQuery({ maxWidth: 767 });

  return (
    <>
      <Popup
        trigger={
          <Plus className="fixed bottom-12 right-8 text-white p-3 rounded-full shadow-lg focus:outline-none focus:ring bg-gradient-to-r from-yellow-400 to-cyan-500 w-16 h-16 dark:hover:bg-gradient-to-tr dark:bg-gradient-to-r dark:from-purple-800 dark:to-cyan-800"/>
        }
        modal
        className={`modal ${theme === 'dark' ? 'dark' : ''}`}
        contentStyle={{ width: isMobile ? '100vw' : 'auto', height: isMobile ? '100vh' : 'auto' }}
      >
        <FormularioPostagem/>
      </Popup>
    </>
  );
}

export default ModalPostagem;
