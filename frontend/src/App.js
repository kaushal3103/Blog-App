import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './index.css';


function App() {
  const [posts, setPosts] = useState([]);
  

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/v1/getallposts');
        console.log(response.data);
        setPosts(response.data);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    fetchPosts();
  }, []);

  const handlelogout = ()=>{
    localStorage.removeItem('token');
  }

  return (
    <div className="App">
   

   <div className='imagehead'>  
   <nav className="navbar">
  <div className="container">
    <div className="logo" style={{marginLeft:'30px'}}>
      <a href="/">Blogging Website</a>
    </div>
    <div className="menu" style={{marginRight:'30px'}}>
      <ul>
        <li><a href="/">Home</a></li>
        <li><a href="/">About</a></li>
        <li><a href="/">Contact</a></li>
       {!localStorage.getItem('token') &&<li><a href="/login">Login Admin</a></li>}
        {!!localStorage.getItem('token') && <li onClick={handlelogout()}>Logout</li>}
      </ul>
    </div>
  </div>
</nav>  
<div className='herotext'>
  <h1 style={{marginBottom:'30px'}}>Hey ! Lets start Blogging with us</h1>
  <p>
  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco.
  </p>
</div>
   </div>
    
      <div className="content">
        {posts.map(post => (
          <div className="post" key={post._id}>
            <h2 style={{marginTop:'10x',marginBottom:'40px'}}>{post.title}</h2>
            <img src ={post.image}/>
            <p>{post.description}</p>
          </div>
        ))}
      </div>

      <footer className="footer">
            <div className="footer-content">
                <p>&copy; 2024 Your Blog Name. All rights reserved.</p>
                <p>Designed by Raj Kaushal Yadav</p>
            </div>
        </footer>
    </div>
  );
}

export default App;
