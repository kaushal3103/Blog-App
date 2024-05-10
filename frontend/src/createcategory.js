import React, { useState,useEffect} from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Createcategory = () => {

  const [editedTitle, setEditedTitle] = useState('');
  const [editedDescription, setEditedDescription] = useState('');
  const [editedSlug, setEditedSlug] = useState('');
  const Navigate = useNavigate();

  useEffect(()=>{
    if(!localStorage.getItem('token'))Navigate("/");
  },[])

 
  const handleCreatePost = () => {
   
    const postData = {
        title: editedTitle,
        description: editedDescription,
        slug: editedSlug
      };

      
  
      axios.post(`http://localhost:3001/api/v1/create-category`, postData)
        .then(response => {
          console.log('Post Created successfully:', response.data);
          window.alert("Post has been created");
          Navigate("/adminpanel");
          
        })
        .catch(error => {
          console.error('Error updating post:', error);
         
        });
  };

  return (
    <div className="post1">
        <>
          <div style={{display:'flex',textAlign:'center',alignItems:'center',justifyContent:'center',marginBottom:'30px'}}>
            <h1>Create a Category</h1>
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
            <label htmlFor="slug">ISlug:</label>
            <input 
              type="text" 
              id="slug"
              value={editedSlug} 
              onChange={(e) => setEditedSlug(e.target.value)} 
            />
          </div>
          <button onClick={handleCreatePost}>Create Category</button>
        </>
      
    </div>
  );
};

export default Createcategory;
