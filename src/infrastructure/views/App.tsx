import { StyledEngineProvider } from '@mui/material/styles';
import './App.css';
import PodCastPlayer from './components/PodcastPlayer';
import { Outlet } from 'react-router-dom';
import { PodcastGlobalProvider } from './contexts/PodcastGlobalContext';

function App() {
  return (
    // Add StyledEngineProvider to avoid MUI styles to override TailWindCSS
    <StyledEngineProvider injectFirst>
      <PodcastGlobalProvider>
        <main className='min-w-screen min-h-screen flex flex-col items-center'>
          <div className='w-4/5 min-h-screen md:w-2/4 flex flex-col items-center mt-7'>
            <Outlet />
          </div>
          <PodCastPlayer />
        </main>
      </PodcastGlobalProvider>
    </StyledEngineProvider>
  );
}

export default App;
