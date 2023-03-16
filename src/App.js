import React from "react";
import { Route, Routes, Outlet } from "react-router-dom"



import Layout from './Generic/Layout';
import TweetPage from './TweetPage/TweetPage.jsx';
import ProfilePage from "./ProfilePage/ProfilePage"
import Login from './LoginPage/Login';
import HomePage from "./HomePage/HomePage"
import Test from "./Test";




function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Layout/>}>

          <Route index element={<HomePage/>}/>
          <Route path="test" element={<Test />}/>
          <Route path="tweets/:tweetId" element={<TweetPage />} />
          <Route path='profile/:userId' element={<ProfilePage />} />
          <Route path="login" element={<Login/>} />


        </Route>

                  
      </Routes>

    </div>
  );
}

export default App;
