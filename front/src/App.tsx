import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Colorer from './assets/Colorer'
import './assets/css/main.css'

import { LoginDto } from './dto/login-dto';
import useLogin from './components/login/useLogin';

import LoginPage from './components/login/LoginPage'; 
import HomePage from './components/home/HomePage';
import ChatPage from './components/chat/ChatPage';

declare global {
  var colorTheme: string;
}

function App() {
  // globalThis.colorTheme = Colorer();

  // const user: LoginDto | undefined = useLogin();
  const user = undefined;

  return (
    <Router>
      <div className="app">
        <Routes>

          {/* <Route path="/" element={<HomePage />} /> */}

          {/* {user === undefined && ( */}
          {user !== undefined && (
            <>
              <Route path="/" element={<LoginPage />} />
            </>
          )

          ||

          <>
            <Route path="/" element={<HomePage user={user} />} />
            {/* <Route path="/chat" element={<ChatPage user={user} />} /> */}
          </>}

        </Routes>
      </div>
    </Router>
  );
}

export default App;
