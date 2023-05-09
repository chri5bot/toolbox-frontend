import React from 'react';
import { Routes, BrowserRouter, Route } from 'react-router-dom';

import Home from './pages/Home';
import NotFound from './pages/NotFound';

const App = () => {
  return (
    <BrowserRouter>
      <div style={{ width: 100, backgroundColor: 'red' }}>
        <Routes>
          <Route path="/" component={Home} />
          <Route component={NotFound} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
