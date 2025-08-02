import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import AppContent from './AppContent';

function App() {
  return (
    <Router basename="/rdoxmes">
      <AppContent />
    </Router>
  );
}

export default App;