import { useEffect } from 'react';
import ReactGA from 'react-ga';
import './App.css';
import Home from './components/home';
import PlayGround from './components/playground/playgroundMain';
import RecruiterMode from './components/recruiterMode';

function App() {
  useEffect(() => {
    ReactGA.initialize('G-P88RFPWDVG');
    ReactGA.pageview(window.location.pathname + window.location.search);
  }, []);

  const isPlayground = window.location.hash === '#playground';
  const routeParam = new URLSearchParams(window.location.search).get('route');
  const currentPath = (routeParam || window.location.pathname).replace(/\/+$/, '') || '/';
  const isRecruiterMode = currentPath === '/recruiter';

  useEffect(() => {
    if (routeParam) {
      window.history.replaceState({}, '', routeParam);
    }
  }, [routeParam]);

  return (
    <div className="App">
      {isPlayground ? <PlayGround /> : isRecruiterMode ? <RecruiterMode /> : <Home />}
    </div>
  );
}

export default App;
