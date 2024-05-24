// src/components/HomePage.js

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import InfiniteScroll from 'react-infinite-scroll-component';
import '../CSS/homepage.css';

const generateExamplePosts = (num, startId = 1) => {
  const posts = [];
  for (let i = startId; i < startId + num; i++) {
    posts.push({
      id: i,
      title: `Post Title ${i}`,
      authorName: `Author ${i}`,
      authorAvatar: 'https://via.placeholder.com/50',
      image: i % 2 === 0 ? 'https://via.placeholder.com/600' : null,
      content: `This is the content of post ${i}.`,
      likes: Math.floor(Math.random() * 100),
      dislikes: Math.floor(Math.random() * 20),
      commentsCount: Math.floor(Math.random() * 10),
    });
  }
  return posts;
};

const HomePage = () => {
  const [posts, setPosts] = useState(generateExamplePosts(20));
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(2);

  const fetchMoreData = () => {
    if (posts.length >= 50) {
      setHasMore(false);
      return;
    }

    setTimeout(() => {
      const newPosts = generateExamplePosts(10, posts.length + 1);
      setPosts((prevPosts) => [...prevPosts, ...newPosts]);
      setPage(page + 1);
    }, 1000);
  };

  // useEffect(() => {
  //   fetchPosts(page);
  // }, [page]);

  // const fetchPosts = async (page) => {
  //   const response = await fetch(`http://localhost:5000/posts?page=${page}`);
  //   const data = await response.json();
  //   setPosts((prevPosts) => [...prevPosts, ...data.posts]);
  //   if (data.posts.length === 0) {
  //     setHasMore(false);
  //   }
  // };

  // const fetchMoreData = () => {
  //   setPage((prevPage) => prevPage + 1);
  // };
  
  return (
    <div className="home-page">
      <header className="navbar">
        <input type="text" className="search-box" placeholder="Search..." />
        <div className="user-info">
          <img src="https://via.placeholder.com/50" alt="User Avatar" className="user-avatar" />
          <span className="user-name">Current User</span>
          <button className="logout-button">Logout</button>
        </div>
      </header>
      <InfiniteScroll
        dataLength={posts.length}
        next={fetchMoreData}
        hasMore={hasMore}
        loader={<h4>Loading...</h4>}
        endMessage={<p>Yay! You have seen it all</p>}
      >
        <div className="posts-list">
          {posts.map((post) => (
            <div key={post.id} className="post-summary">
              <Link to={`/post/${post.id}`} className="post-title">
                <h2>{post.title}</h2>
              </Link>
              <div className="post-author">
                <img src={post.authorAvatar} alt={`${post.authorName}'s avatar`} className="author-avatar" />
                <span className="author-name">{post.authorName}</span>
              </div>
              {post.image && <img src={post.image} alt="Post" className="post-image" />}
              <div className="post-content">{post.content}</div>
              <div className="post-stats">
                <span>👍 {post.likes}</span>
                <span>👎 {post.dislikes}</span>
                <span>💬 {post.commentsCount}</span>
              </div>
            </div>
          ))}
        </div>
      </InfiniteScroll>
    </div>
  );
};

export default HomePage;
