import './App.css';
import { ScoreProvider } from './contexts/scoreData';
import Router from './router/router';

function App() {
  return (
    <ScoreProvider>
      <div id="App">
        <Router />
      </div>
    </ScoreProvider>
  );
}

export default App;
