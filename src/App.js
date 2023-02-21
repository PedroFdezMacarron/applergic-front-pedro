import './App.css';
import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
// import { MyContext } from './context/MyContext';

import OnboardingPage from './pages/OnboardingPage/OnboardingPage';
import LoginPage from './pages/LoginPage/LoginPage';
import RegisterPage from './pages/RegisterPage/RegisterPage';
import ProfilePage from './pages/ProfilePage/ProfilePage';
import ProfileAlergicPage from './pages/ProfileAlergicPage/ProfileAlergicPage';
import ProfileEmergencyPage from './pages/ProfileEmergencyPage/ProfileEmergencyPage';
import ProfileAlergicConfirmPage from './pages/ProfileAlergicConfirmPage/ProfileAlergicConfirmPage';
import ProfileEndPage from './pages/ProfileEndPage/ProfileEndPage';
import ScanPage from './pages/ScanPage/ScanPage';
import EvaluatePage from './pages/EvaluatePage/EvaluatePage';
import ScanResultPage from './pages/ScanResultPage/ScanResultPage';
import HomePage from './pages/HomePage/HomePage';
import DiaryPage from './pages/DiaryPage/DiaryPage';
import { JwtContext} from './shared/contexts/JwtContext';

import React, { useState } from 'react';


function App() {
  const [jwt, setJwt] = useState(localStorage.getItem('token') || null);
 
  const [newUser,setUser] = useState({});
  const [barCode,setBarcode] = useState('2002345678901');  // por defecto la salsa de tomate

  return (
    <JwtContext.Provider value={{ jwt, setJwt , newUser, setUser, barCode, setBarcode }} >
      
      <Router>
        <div className="app">
          <Routes>             
              <Route path="/" element={<OnboardingPage></OnboardingPage>}/>
              <Route path="/login" element={<LoginPage></LoginPage>}/>
              <Route path="/register" element={<RegisterPage></RegisterPage>}/>
              <Route path="/profile" element={<ProfilePage></ProfilePage>}/>
              <Route path="/profile/emergency" element={<ProfileEmergencyPage></ProfileEmergencyPage>}/> 
              <Route path="/profile/alergics" element={<ProfileAlergicPage></ProfileAlergicPage>}/>
              <Route path="/profile/alergics/confirm" element={<ProfileAlergicConfirmPage></ProfileAlergicConfirmPage>}/>
              <Route path="/profile/end" element={<ProfileEndPage></ProfileEndPage>}/>
              <Route path="/scan" element={<ScanPage></ScanPage>}/>
              <Route path="/evaluate" element={<EvaluatePage></EvaluatePage>}/>
              <Route path="/scan/result" element={<ScanResultPage></ScanResultPage>}/>
              <Route path="/home" element={<HomePage></HomePage>}/>
              <Route path="/diary" element={<DiaryPage></DiaryPage>}/>

          </Routes>
        </div>
      </Router>
    {/* </MyContext.Provider> */}

    </JwtContext.Provider>
  );
}

export default App;