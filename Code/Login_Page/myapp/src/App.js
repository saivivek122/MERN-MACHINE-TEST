import './App.css';
import Login from './Components/Login';
import { useState } from 'react';
import CreateEmployee from './Components/CreateEmployee';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import NavBar from './Components/NavBar';
import GetEmployee from './Components/GetEmployee';

function App() {
  const [isLogin , setIsLogin] = useState(false);

  const handleLogin = (isLogin) => {
    setIsLogin(isLogin)
  }
  return (
    <div>
     
      <Router>
      <NavBar isLogin = {isLogin} updateLogin = {handleLogin}/>
        <Routes>
          <Route path='/' element={<Login updateLogin = {handleLogin}/>} ></Route>
          <Route path='/CreateEmployee' element={<CreateEmployee/>}/>
          <Route path='/GetEmployee' element={<GetEmployee/>}/>
         
        </Routes>
      </Router>
     
    </div>
  );
}

export default App;
