import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Editcategory = () => {
  const { categoryId } = useParams();
  const [post, setPost] = useState(null);
  const [editedTitle, setEditedTitle] = useState('');
  const [editedDescription, setEditedDescription] = useState('');
  const [editedSlug, setEditedSlug] = useState('');
  const [loading, setLoading] = useState(true);
  const [allPosts, setAllPosts] = useState([]);
  const Navigate = useNavigate();
  const [category, setCategory] = useState(null);

  useEffect(() => {
    
    setLoading(true);
    axios.get(`http://localhost:3001/api/v1/getsingle-category/${categoryId}`)
      .then(response => {
        const data = response.data;
        
        setCategory(data);
        setEditedTitle(data.title);
        setEditedDescription(data.description);
        setEditedSlug(data.slug);    
          }
        
      )
      .catch(error => {
        console.error('Error fetching post:', error);
      })
      .finally(() => {
        
        setLoading(false);
      });

  }, [categoryId]);

  useEffect(()=>{
    if(!localStorage.getItem('token'))Navigate("/");
  },[])


  useEffect(() => {
    axios.get('http://localhost:3001/api/v1/getallposts')
      .then(response => {
        const data = response.data;
        setAllPosts(data);
      })
      .catch(error => console.error('Error fetching all posts:', error));
  }, []);


  const getUnassignedPosts = () => {

    return allPosts.filter(post => !category.posts.includes(post._id));
  };

  



  const handleEdit = () => {
   
    const categoryData = {
        title: editedTitle,
        description: editedDescription,
        slug: editedSlug
      };
  
      axios.patch(`http://localhost:3001/api/v1/update-category/${categoryId}`, categoryData)
        .then(response => {
          console.log('Category updated successfully:', response.data);
          window.alert("Category has been updated");
          Navigate("/adminpanel")
        })
        .catch(error => {
          console.error('Error updating post:', error);
         
        });
  };
  

  const addtoCategory = (postId)=>{
    const body = {
        postId: postId
      };
    
      axios.patch(`http://localhost:3001/api/v1/addpost-category/${categoryId}`, body)
        .then(response => {
          console.log('Post added to category successfully:', response.data);
          window.alert("Post has been added to Category");
          Navigate("/adminpanel");
          
        })
        .catch(error => {
          console.error('Error adding post to category:', error);
         
        });
  }

 




  return (
    <>
    <div className="post1">
      {loading ? (
        <div>Loading...</div>
      ) : (
        <>
          <div style={{display:'flex',textAlign:'center',alignItems:'center',justifyContent:'center',marginBottom:'30px'}}>
            <h1>Edit Category</h1>
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
            <label htmlFor="Slug">Slug:</label>
            <input 
              type="text" 
              id="Slug"
              value={editedSlug} 
              onChange={(e) => setEditedSlug(e.target.value)} 
            />
          </div>
          
          <button onClick={handleEdit}>Edit Done</button>
        </>
      )}
    </div>
    <div className='post1'>
    <div style={{display:'flex',textAlign:'center',alignItems:'center',justifyContent:'center',marginBottom:'30px'}}>
            <div className="admin-panel1">
      <h1>Add a Post </h1>
      <div className="post-list">
        {category && getUnassignedPosts().map(post => (
          <div className="post-card" key={post._id}>
            <h2>{post.title}</h2>
            
            <img src={post.image} alt={post.title} />
            <p>{post.description}</p>
            <button onClick={()=>addtoCategory(post._id)}>Add to Category</button>
          </div>
        ))}
      </div>
    </div>
           
    </div>
    </div>
    </>
  );
};

export default Editcategory;
