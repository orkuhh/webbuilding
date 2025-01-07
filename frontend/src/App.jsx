import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import BuildEditor from './components/BuildEditor';

function App() {
  return (
    <Router>
      <div className="text-center">
        <h1 className="text-4xl font-bold text-division mb-8">
          <Link to="/">The Division 2 Builds</Link>
        </h1>
        
        <Routes>
          <Route path="/" element={
            <div className="bg-division-dark p-6 rounded-lg shadow-lg">
              <p className="text-division-light mb-4">
                Build your perfect Division 2 loadout
              </p>
              <Link 
                to="/create" 
                className="bg-division text-division-dark px-4 py-2 rounded hover:bg-division-light transition-colors"
              >
                Create New Build
              </Link>
            </div>
          } />
          
          <Route path="/create" element={<BuildEditor />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
