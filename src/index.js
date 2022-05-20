import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

import { BrowserRouter, Routes , Route } from "react-router-dom";
import TweetPage from './TweetPage';
import ProfilePage from "./ProfilePage"
import Login from './Login';
import HomePage from "./HomePage"
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<HomePage />}/>
        <Route path="/tweets/:tweetId" element={<TweetPage />} />
        <Route path='/profile/:userId' element={<ProfilePage />} />
        <Route path="/login" element={<Login/>} />

      </Route>
    </Routes>
  </BrowserRouter>
);

