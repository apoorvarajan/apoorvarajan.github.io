import { useEffect } from 'react';
import ReactGA from 'react-ga';
import './App.css';
import Home from './components/home';
import PlayGround from './components/playground/playgroundMain';
import RecruiterMode from './components/recruiterMode';
import analytics from './utils/analytics';

function App() {
  const isPlayground = window.location.hash === '#playground';
  const routeParam = new URLSearchParams(window.location.search).get('route');
  const currentPath = (routeParam || window.location.pathname).replace(/\/+$/, '') || '/';
  const isRecruiterMode = currentPath === '/recruiter';

  useEffect(() => {
    if (routeParam) {
      const params = new URLSearchParams(window.location.search);
      params.delete('route');
      const query = params.toString();
      window.history.replaceState({}, '', `${routeParam}${query ? `?${query}` : ''}${window.location.hash}`);
    }
  }, [routeParam]);

  useEffect(() => {
    ReactGA.initialize('G-P88RFPWDVG');
    ReactGA.pageview(window.location.pathname + window.location.search);
  }, []);

  useEffect(() => {
    analytics.pageView(currentPath);
    const handleRouteChange = () => analytics.pageView(window.location.pathname || '/');
    window.addEventListener('popstate', handleRouteChange);
    window.addEventListener('hashchange', handleRouteChange);
    return () => {
      window.removeEventListener('popstate', handleRouteChange);
      window.removeEventListener('hashchange', handleRouteChange);
    };
  }, [currentPath]);

  useEffect(() => {
    const handleClick = (event: MouseEvent) => analytics.trackClick(event.target);
    document.addEventListener('click', handleClick, true);
    return () => document.removeEventListener('click', handleClick, true);
  }, []);

  return (
    <div className="App">
      {isPlayground ? <PlayGround /> : isRecruiterMode ? <RecruiterMode /> : <Home />}
    </div>
  );
}

export default App;
