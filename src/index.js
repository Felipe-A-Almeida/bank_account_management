import React from 'react';
import './index.css';
import "antd/dist/antd.css";
import App from './App';
import reportWebVitals from './reportWebVitals';
import { render } from "react-dom";
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import CreateUser from './routes/User/New';

render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/user/new" element={<CreateUser />} />
      </Routes>
    </BrowserRouter>,
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
