import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import colorer from './assets/colorer'
import './assets/css/main.css'

import { LoginDto } from './dto/login-dto';
import { UserDto } from './dto/user-dto';
import useLogin from './components/login/useLogin';

import HomePage from './components/home/HomePage';
import LoginPage from './components/login/LoginPage'; 
import LogoutPage from './components/login/LogoutPage';
import ChatPage from './components/chat/ChatPage';
import GamePage from './components/game/GamePage';

declare global {
  var colorTheme: string;
}

function App() {
  // globalThis.colorTheme = colorer();

  // const user: LoginDto | undefined = useLogin();

  const user = undefined;
  // const user = {
  //   token: 'test',
  //   setToken: Function,
  //   user: {id: 1, email: 'thomasnanchen@hotmail.com', pseudo: 'tom'},
  //   getHeaders: Function,
  //   getUserData: Function
  // };

  return (
    <Router>
      <div className="app">
        <Routes>
          
          <Route path="/"       element={<HomePage    user={user} />} />
          <Route path="/login"  element={<LoginPage   user={user} />} />
          <Route path="/logout" element={<LogoutPage  user={user} />} />
          <Route path="/chat"   element={<ChatPage    user={user} />} />
          <Route path="/game"   element={<GamePage    user={user} />} />

          {/* {user === undefined &&
          <>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/logout" element={<></>} />
            <Route path="/chat" element={<></>} />
            <Route path="/game" element={<></>} />
          </>

          ||

          <>
            <Route path="/login" element={<></>} />
            <Route path="/logout" element={<LogoutPage user={user} />} />
            <Route path="/chat" element={<ChatPage user={user} />} />
            <Route path="/game" element={<GamePage user={user} />} />
          </>} */}

        </Routes>
      </div>
    </Router>
  );
}

export default App;
