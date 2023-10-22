import { StyledEngineProvider } from '@mui/material/styles';
import './App.css';
import PodCastPlayer from './components/Podcast';
import { Outlet } from 'react-router-dom';

function App() {
  return (
    // Add StyledEngineProvider to avoid MUI styles to override TailWindCSS
    <StyledEngineProvider injectFirst>
      <main className='min-w-screen min-h-screen flex flex-col items-center'>
        <div className='w-4/5 md:w-2/4 flex flex-col items-center mt-6'>
          <Outlet />
        </div>
        <PodCastPlayer />
      </main>
    </StyledEngineProvider>
  );
}

export default App;
