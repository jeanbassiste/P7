import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from './components/header';
import Signup from './components/signup';
import Login from './components/login';
import Posts from './components/posts';
import Profile from './components/profile';

ReactDOM.render(

  <Router>
    <Header />
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/posts" element={<Posts />} />
      <Route path="/profile" element={<Profile />} />
    </Routes> 
  </Router>,
  document.getElementById("root")
);