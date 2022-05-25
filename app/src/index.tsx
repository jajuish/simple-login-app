import ReactDOM from 'react-dom';
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from './pages/Login'
import Register from './pages/Register'
import MainPage from './pages/MainPage'

ReactDOM.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/reg" element={<Register />} />
    </Routes>
  </BrowserRouter>,
  document.getElementById('root')
);