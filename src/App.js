import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './JS/LoginPage';
import HomePage from './JS/HomePage';
import PostDetail from './JS/PostDetail';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/homepage" element={<HomePage />} />
        <Route path="/post/:postId" element={<PostDetail/>} />
      </Routes>
    </Router>
  );
};

export default App;
