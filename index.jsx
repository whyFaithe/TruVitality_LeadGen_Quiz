import React from 'react';
import ReactDOM from 'react-dom/client';
import Quiz from './src/components/Quiz';


function App() {
  return (
    <div className="app">
      <Quiz/>
    </div>
  )
}

export default App;

ReactDOM.createRoot(document.getElementById('root')).render(<App />); 