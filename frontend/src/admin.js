import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './index.css'; 
import { useNavigate } from 'react-router-dom';

const Admin = () => {
  const [categories, setCategories] = useState([]);
  const Navigate = useNavigate();
  

  useEffect(() => {
   
    axios.get('http://localhost:3001/api/v1/getall-category')
      .then(response => {
        const data = response.data;
        const updatedCategories = [];
  
        data.forEach(category => {
          const updatedCategory = { ...category, posts: [] };
          let postsFetchedCount = 0; 
  
          if (category.posts.length === 0) {
           
            updatedCategories.push(updatedCategory);
          } else {
            
            category.posts.forEach(postId => {
              axios.get(`http://localhost:3001/api/v1/get-post/${postId}`)
                .then(response => {
                  const postData = response.data;
                  updatedCategory.posts.push(postData);
                  postsFetchedCount++;
  
                  if (postsFetchedCount === category.posts.length) {
                    
                    updatedCategories.push(updatedCategory);
                    
                    if (updatedCategories.length === data.length) {
                      
                      setCategories(updatedCategories);
                    }
                  }
                })
                .catch(error => console.error(`Error fetching post ${postId} details:`, error));
            });
          }
        });
      })
      .catch(error => console.error('Error fetching categories:', error));
  }, []);
  

  const handleEditImage = (postId) => {
   
    Navigate(`/editpost/${postId}`);
  };

  const handlecreatePost = ()=>{
    Navigate('/createpost');
  }

  const handlecreateCategory = ()=>{
    Navigate('/createcategory');
  }
  
  const handleeditCategory = (categoryId)=>{
    Navigate(`/editcategory/${categoryId}`);
  }

  const removePostFromCategory = (categoryId, postIdToRemove) => {
    console.log(categoryId,postIdToRemove)
    axios.get(`http://localhost:3001/api/v1/getsingle-category/${categoryId}`)
      .then(response => {
        const category = response.data;
  
        
        category.posts = category.posts.filter(postId => postId !== postIdToRemove);
        
        console.log(category);
        
        axios.patch(`http://localhost:3001/api/v1/update-category/${categoryId}`,category)
          .then(response => {
            console.log('Post removed from category successfully:', response.data);
            window.location.reload();
            
          })
          .catch(error => {
            console.error('Error updating category:', error);
           
          });
      })
      .catch(error => {
        console.error('Error fetching category:', error);
       
      });
  };

  const handlehome = ()=>{
    Navigate("/");
  }
  
  useEffect(()=>{
    if(!localStorage.getItem('token'))Navigate("/");
  },[])

  return (
    <div className="admin-panel">
      <h1>Admin Panel</h1>
      <div className='adminbackhome'>
      <h3 onClick={handlehome}>Back to home</h3>
      </div>
      <div className='postandcat'>
        <button onClick={()=>handlecreatePost()}>Create a new Post</button>
        <button onClick={()=>handlecreateCategory()}>Create a new Category</button>
      </div>
      <table className="admin-table">
        <thead>
          <tr>
            <th>Category Name</th>
            <th>Description</th>
            <th>Posts</th>
            <th>Add Post</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((category,index) => (
            <tr key={index}>
              <td style={{fontSize:'20px'}}>{category.title}</td>
              <td>{category.description}</td>
              <td>
                <ul>
                  {category.posts.length > 0 && category.posts.map((post,index) => (
                    <li key={index}>
                      <div>
                        {post.name && <strong>{post.name}</strong>}
                        {post.image && <img src={post.image} alt={post.name}/>}
                        <div style={{marginLeft:'100px'}}>

                  <button onClick={() => handleEditImage(post._id)}>Edit</button>
                  <button onClick={()=>removePostFromCategory(category._id,post._id)} >Delete</button>
                </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </td>
              <td>
                <button className='newpostbtn' onClick={()=>handleeditCategory(category._id)}>Add New / Edit Post to category</button>
              </td>
             
            </tr>
          ))}
        </tbody>
      </table>
      
    </div>
  );
};

export default Admin;
