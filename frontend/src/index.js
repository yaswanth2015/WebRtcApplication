import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { UserLoginProvider, UserSignUpProvider } from "./context/UserLogin.jsx"
import { UserListProvider } from './context/UserList';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <UserListProvider>
    <UserLoginProvider>
      <UserSignUpProvider>
      <App />
      </UserSignUpProvider>
    </UserLoginProvider>
    </UserListProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
