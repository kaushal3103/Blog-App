import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const Post = () => {
  const { postId } = useParams();
  const [post, setPost] = useState(null);
  const [editedTitle, setEditedTitle] = useState('');
  const [editedDescription, setEditedDescription] = useState('');
  const [editedImageUrl, setEditedImageUrl] = useState('');
  const [loading, setLoading] = useState(true);

  const Navigate = useNavigate();

  useEffect(() => {
   
    setLoading(true);
    axios.get(`http://localhost:3001/api/v1/get-post/${postId}`)
      .then(response => {
        const postData = response.data;
        setPost(postData);
        setEditedTitle(postData.title);
        setEditedDescription(postData.description);
        setEditedImageUrl(postData.image || '');
      })
      .catch(error => {
        console.error('Error fetching post:', error);
      })
      .finally(() => {
       
        setLoading(false);
      });
  }, [postId]);

  useEffect(()=>{
    if(!localStorage.getItem('token'))Navigate("/");
  },[])


  const handleEdit = () => {
    
    const postData = {
        title: editedTitle,
        description: editedDescription,
        image: editedImageUrl
      };
  
      axios.patch(`http://localhost:3001/api/v1/update-post/${postId}`, postData)
        .then(response => {
          console.log('Post updated successfully:', response.data);
          window.alert("Post has been updated");
          window.location.reload();
        })
        .catch(error => {
          console.error('Error updating post:', error);
         
        });
  };


  const deletePostFromAllCategoriesAndPost = (postIdToRemove) => {
    
    axios.get('http://localhost:3001/api/v1/getall-category')
      .then(response => {
        const categories = response.data;
  
        
        categories.forEach(category => {
          
          
          
          category.posts = category.posts.filter(postId => postId !== postIdToRemove);
          
          axios.patch(`http://localhost:3001/api/v1/update-category/${category._id}`, category)
            .then(response => {
              console.log(`Post removed from category ${category._id} successfully:`, response.data);
              
            })
            .catch(error => {
              console.error(`Error updating category ${category._id}:`, error);
             
            });
        });
  
       
        axios.delete(`http://localhost:3001/api/v1/delete-post/${postId}`)
          .then(response => {
            console.log('Post deleted successfully:', response.data);
             window.alert("Post has been deleted");
             Navigate("/adminpanel");
            
          })
          .catch(error => {
            console.error('Error deleting post:', error);
            
          });
          
      })
      .catch(error => {
        console.error('Error fetching categories:', error);
        
      });
      
  };
  

  return (
    <div className="post1">
      {loading ? (
        <div>Loading...</div>
      ) : (
        <>
          <div style={{display:'flex',textAlign:'center',alignItems:'center',justifyContent:'center',marginBottom:'30px'}}>
            <h1>Edit Post</h1>
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
          <div className='editanddelete'>
          <button onClick={handleEdit}>Edit Done</button>
          <button onClick={()=>deletePostFromAllCategoriesAndPost(post._id)}>Delete This Post</button>
          </div>
        </>
      )}
    </div>
  );
};

export default Post;
