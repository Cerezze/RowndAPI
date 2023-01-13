import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { RowndProvider } from '@rownd/react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import AuthComponent from './components/AuthComponent';
import Component1 from './components/Component1';
import Component2 from './components/Component2';
import UserTest from './components/userTest';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>
  },{
    path: "/component1",
    element: <Component1/>
  },{
    path: "/component2",
    element: <Component2/>
  },{
    path: "/authComponent",
    element: <AuthComponent/>    
  },{
    path: '/usertest',
    element: <UserTest/>
  }
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RowndProvider 
    appKey="your app key">
        <RouterProvider router={router}/>
    </RowndProvider>  
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
