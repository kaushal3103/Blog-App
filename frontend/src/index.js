import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {BrowserRouter,Route,Routes} from 'react-router-dom';
import Admin from "./admin";
import Post from "./editpost";
import CreatePost from './createapost';
import Createcategory from './createcategory';
import Editcategory from './editcategory';
import Login from './login';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
   <BrowserRouter>
   <Routes>
    <Route index element={<App/>} />
    <Route path="/adminpanel" element={<Admin/>}/>
    <Route path="/editpost/:postId" element={<Post/>}/>
    <Route path="/createpost" element={<CreatePost/>}/>
    <Route path="/createcategory" element={<Createcategory/>}/>
    <Route path="/editcategory/:categoryId" element={<Editcategory/>}/>
    <Route path ="/login" element={<Login/>}/>
   </Routes> 
   </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

