import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import mainColor from './assets/ColorTheme'
import './assets/css/main.css'

import { LoginDto } from './dto/login-dto';
import { UserDto } from './dto/user-dto';
import useLogin from './components/login/useLogin';

import HomePage from './components/home/HomePage';
import LoginPage from './components/login/LoginPage'; 
import LogoutPage from './components/login/LogoutPage';
import Recover from './components/login/Recover';
import ChatPage from './components/chat/ChatPage';
import GamePage from './components/game/GamePage';
import ColorTheme from './assets/ColorTheme';

function App() {
  
  let colorer = new ColorTheme(document);

  React.useLayoutEffect(() => {
    const begin: Date = new Date('4/13/2023');
    colorer.setColorThemeByDay(begin);
  }, [])

  // const user: LoginDto | undefined = useLogin();

  // const user = undefined;
  const user = {
    token: 'test',
    setToken: Function,
    user: {id: 1, email: 'thomasnanchen@hotmail.com', pseudo: 'tom'},
    getHeaders: Function,
    getUserData: Function
  };

  return (
    <Router>
      <div className="app">
        <Routes>
          <Route path="/"         element={<HomePage    user={user} />} />
          <Route path="/login"    element={<LoginPage   user={user} />} />
          <Route path="/logout"   element={<LogoutPage  user={user} />} />
          <Route path="/recover"  element={<Recover     user={user} />} />
          <Route path="/chat"     element={<ChatPage    loggedUser={user} />} />
          <Route path="/game"     element={<GamePage    user={user} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
