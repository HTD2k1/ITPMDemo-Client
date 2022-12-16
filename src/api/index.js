import axios from 'axios';

const URL = axios.create({ baseURL: 'http://localhost:5000' });

URL.interceptors.request.use((req) => {
  if (localStorage.getItem('profile')) {
    req.headers.authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
  }

  return req;
});

export const fetchPost = (id) => URL.get(`/posts/${id}`);
export const fetchPosts = (page) =>{
  console.log("FETCHING POSTS: page",page)
  const result = URL.get(`/posts?page=${page}`);
  return result
} 
export const fetchPostsByCreator = (name) => URL.get(`/posts/creator?name=${name}`);
export const fetchPostsBySearch = (searchQuery) => URL.get(`/posts/search?searchQuery=${searchQuery.search || 'none'}&tags=${searchQuery.tags}`);
export const createPost = (newPost) => URL.post('/posts', newPost);
export const likePost = (id) => URL.patch(`/posts/${id}/likePost`);
export const comment = (value, id) => URL.post(`/posts/${id}/commentPost`, { value });
export const updatePost = (id, updatedPost) => URL.patch(`/posts/${id}`, updatedPost);
export const deletePost = (id) => URL.delete(`/posts/${id}`);

export const signIn = (formData) => URL.post('/user/login', formData);
export const signUp = (formData) => URL.post('/user/register', formData);
