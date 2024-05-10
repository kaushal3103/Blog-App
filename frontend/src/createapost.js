import React, { useState,useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Createpost = () => {

  const [editedTitle, setEditedTitle] = useState('');
  const [editedDescription, setEditedDescription] = useState('');
  const [editedImageUrl, setEditedImageUrl] = useState('');

  useEffect(()=>{
    if(!localStorage.getItem('token'))Navigate("/");
  },[])


   const Navigate = useNavigate();

  const handleCreatePost = () => {
   
    const postData = {
        title: editedTitle,
        description: editedDescription,
        image: editedImageUrl
      };
  
      axios.post(`http://localhost:3001/api/v1/create-post`, postData)
        .then(response => {
          console.log('Post Created successfully:', response.data);
          window.alert("Post has been created");
          Navigate("/");
          
        })
        .catch(error => {
          console.error('Error updating post:', error);
         
        });
  };

  return (
    <div className="post1">
        <>
          <div style={{display:'flex',textAlign:'center',alignItems:'center',justifyContent:'center',marginBottom:'30px'}}>
            <h1>Create a Post</h1>
          </div>
          <div className="input-container">
            <label htmlFor="title">Title:</label>
            <input 
              type="text" 
              id="title"
              value={editedTitle} 
              onChange={(e) => setEditedTitle(e.target.value)} 
            />
          </div>
          <div className="input-container">
            <label htmlFor="description">Description:</label>
            <textarea 
              type="text" 
              id="description"
              value={editedDescription} 
              onChange={(e) => setEditedDescription(e.target.value)} 
            />
          </div>
          <div className="input-container">
            <label htmlFor="imageUrl">Image URL:</label>
            <input 
              type="text" 
              id="imageUrl"
              value={editedImageUrl} 
              onChange={(e) => setEditedImageUrl(e.target.value)} 
            />
          </div>
          {editedImageUrl && <img src={editedImageUrl} alt={editedTitle} />}
          <button onClick={handleCreatePost}>Create Post</button>
        </>
      
    </div>
  );
};

export default Createpost;
