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
import EditUser from './routes/User/Edit';
import BankAccounts from './routes/User/BankAccounts';
import CreateAccount from './routes/User/CreateAccount';
import EditAccount from './routes/User/EditAccount';

render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/user/new" element={<CreateUser />} />
        <Route path="/user/:id" element={ <EditUser /> } />
        <Route path="/user/:id/bank_accounts" element={ <BankAccounts /> } />
        <Route path="/user/:id/bank_accounts/new" element={ <CreateAccount /> } />
        <Route path="/user/:id/bank_accounts/:accountId" element={ <EditAccount /> } />
      </Routes>
    </BrowserRouter>,
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
