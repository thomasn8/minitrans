import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Colorer from './assets/Colorer'
import './App.css';

import { LoginDto } from './dto/login-dto';
import login from './components/login/login';

import LoginPage from './components/login/LoginPage'; 
import HomePage from './components/home/HomePage';
import ChatPage from './components/chat/ChatPage';

declare global {
  var colorTheme: string;
}

function App() {
  // globalThis.colorTheme = Colorer();

  const user: LoginDto | undefined = login();

  return (
    <Router>
      <div className="">
        <Routes>

          {/* <Route path="/" element={<HomePage />} /> */}

          {user === undefined && (
            <>
              <Route path="/" element={<LoginPage />} />
            </>
          )

          ||

          <>
            <Route path="/apps" element={<HomePage user={user} />} />
            <Route path="/chat" element={<ChatPage user={user} />} />
          </>}

        </Routes>
      </div>
    </Router>
  );
}

export default App;
