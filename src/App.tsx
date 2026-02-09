import React, {useEffect} from 'react';
import ReactGA from 'react-ga';
import './App.css';
import Home from './components/home'
import PlayGround from './components/playground/playgroundMain';

function App() {
  useEffect(() => {
    ReactGA.initialize('G-P88RFPWDVG');
    ReactGA.pageview(window.location.pathname + window.location.search)
    },[]);
  return (
    <div className="App">
      {window.location.hash==="#playground" ? <PlayGround/> : <Home/>}
    </div>
  );
}

export default App;
