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
import { LoginDto } from './_dto/login-dto';
import { api_request } from './assets/utils';

import './main.css'

function App() {
  
  let colorer = new ColorTheme(document);
  let [color, setColor] = React.useState('');

  React.useLayoutEffect(() => {
    let begin: Date = new Date('4/13/2023');
    let colorTheme = colorer.setColorThemeByDay(begin);
    setColor(colorTheme);
  }, [])


  const [token, setToken] = React.useState(localStorage.getItem("token") || "");
  const [login, setLogin] = React.useState<LoginDto | undefined>(undefined);

  React.useEffect(() => {
    console.log('set login');
    const getUserData = async () => {
      if (token) {
        api_request('get', '/api/me', token)
        .then((res) => {
          if (res.status === 200) {
            setLogin(res.data as LoginDto);
            return;
          }
        })
        .catch((err) => {
          console.log(err);
        });
      }
      setLogin(undefined);
    }
    getUserData();
  }, [token]);


  return (
    <Router>
      <div className="app">
        <Routes>
          <Route path="/"               element={<HomePage      login={login} setToken={setToken} color={color} />} />
          <Route path="/login"          element={<LoginPage     login={login} setToken={setToken}/>} />
          <Route path="/logout"         element={<LogoutPage    login={login} setToken={setToken}/>} />
          <Route path="/signin-confirm" element={<SigninConfirmPage />} />
          <Route path="/recover"        element={<RecoverPage />} />
          <Route path="/chat"           element={<ChatPage      login={login} setToken={setToken}/>} />
          <Route path="/game"           element={<GamePage      login={login} setToken={setToken}/>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
