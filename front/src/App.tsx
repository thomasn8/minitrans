import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import HomePage from './components/home/HomePage';
import LoginPage from './components/login/LoginPage'; 
import LogoutPage from './components/login/LogoutPage';
import RecoverPage from './components/login/RecoverPage';
import SigninConfirmPage from './components/login/SigninConfirmPage';
import ChatPage from './components/chat/ChatPage';
import GamePage from './components/game/GamePage';
import ColorTheme from './assets/ColorTheme';

import useLogin from './components/login/useLogin';
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

  let login: LoginDto | undefined = useLogin();
  console.log('login:', login);

  // let [loginer, setLoginer] = React.useState(login);

  // let [login, setLogin] = React.useState<LoginDto | undefined>(undefined);

  // let login: LoginDto | undefined = undefined;
  // React.useEffect(() => {
  //   setLoginer(login);
  // }, [loginer]);

  return (
    <Router>
      <div className="app">
        <Routes>
          <Route path="/"               element={<HomePage      login={login} color={color} />} />
          <Route path="/login"          element={<LoginPage     login={login} />} />
          <Route path="/logout"         element={<LogoutPage    login={login} />} />
          <Route path="/signin-confirm" element={<SigninConfirmPage           />} />
          <Route path="/recover"        element={<RecoverPage                 />} />
          <Route path="/chat"           element={<ChatPage      login={login} />} />
          <Route path="/game"           element={<GamePage      login={login} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
