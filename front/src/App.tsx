import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import HomePage from './components/home/HomePage';
import LoginPage from './components/login/LoginPage'; 
import LogoutPage from './components/login/LogoutPage';
import Recover from './components/login/Recover';
import ChatPage from './components/chat/ChatPage';
import GamePage from './components/game/GamePage';
import ColorTheme from './assets/ColorTheme';

import { LoginDto } from './_dto/login-dto';
import { UserDto } from './_dto/user-dto';

import './main.css'

function App() {
  
  let colorer = new ColorTheme(document);
  let [color, setColor] = React.useState('');

  React.useLayoutEffect(() => {
    let begin: Date = new Date('4/13/2023');
    let colorTheme = colorer.setColorThemeByDay(begin);
    setColor(colorTheme);
  }, [])

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
          <Route path="/"         element={<HomePage    user={user} color={color} />} />
          <Route path="/login"    element={<LoginPage   user={user} />} />
          <Route path="/logout"   element={<LogoutPage  user={user} />} />
          <Route path="/recover"  element={<Recover     user={user} />} />
          <Route path="/chat"     element={<ChatPage    user={user} />} />
          <Route path="/game"     element={<GamePage    user={user} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
