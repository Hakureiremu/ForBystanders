import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './JS/LoginPage';
import HomePage from './JS/HomePage';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/homepage" element={<HomePage />} />
      </Routes>
    </Router>
  );
};

export default App;
