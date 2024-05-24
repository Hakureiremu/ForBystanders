import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import '../CSS/postdetail.css'; // 确保CSS正确链接

//sample post and comments
const examplePost = {
  id: 1,
  title: 'First Post',
  authorName: 'John Doe',
  authorAvatar: 'https://via.placeholder.com/50',
  image: 'https://via.placeholder.com/600',
  content: 'This is the content of the first post.',
  likes: 10,
  dislikes: 2,
  comments: [
    {
      id: 1,
      authorName: 'Commenter One',
      authorAvatar: 'https://via.placeholder.com/30',
      content: 'This is a comment on the post.',
      replies: [
        {
          id: 2,
          authorName: 'Replying Commenter',
          authorAvatar: 'https://via.placeholder.com/30',
          content: 'This is a reply to the comment.',
        },
      ],
    },
  ],
};

const PostDetail = () => {
  const { postId } = useParams();
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');

  useEffect(() => {
    // Simulate fetching post data
    setPost(examplePost);
  }, [postId]);

  // useEffect(() => {
  //   // Fetch post details
  //   const fetchPost = async () => {
  //     try {
  //       const response = await fetch(`http://localhost:5000/post/${postId}`);
  //       const data = await response.json();
  //       setPost(data.post);
  //       setComments(data.comments);
  //     } catch (error) {
  //       console.error('Error fetching post details:', error);
  //     }
  //   };

  //   fetchPost();
  // }, [postId]);


  const handleCommentChange = (e) => {
    setNewComment(e.target.value);
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (newComment.trim() === '') return;

    try {
      const response = await fetch(`http://localhost:5000/post/${postId}/comment`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ content: newComment }),
      });
      const data = await response.json();
      setComments([...comments, data.comment]);
      setNewComment('');
    } catch (error) {
      console.error('Error posting comment:', error);
    }
  };

  if (!post) return <div>Loading...</div>;

  return (
    <div className="post-detail">
      <div className="post-header">
        <h1 className="post-title">{post.title}</h1>
        <div className="post-author">
          <img src={post.authorAvatar} alt={`${post.authorName}'s avatar`} className="author-avatar" />
          <span className="author-name">{post.authorName}</span>
        </div>
      </div>
      {post.image && <img src={post.image} alt="Post" className="post-image" />}
      <div className="post-content">{post.content}</div>
      <div className="post-actions">
        <button className="post-action-button">👍 {post.likes}</button>
        <button className="post-action-button">👎 {post.dislikes}</button>
        <button className="post-action-button">💬 {comments.length}</button>
      </div>
      <div className="comments-section">
        <form className="comment-form" onSubmit={handleCommentSubmit}>
          <input
            type="text"
            placeholder="Write a comment..."
            value={newComment}
            onChange={handleCommentChange}
            className="comment-input"
          />
          <button type="submit" className="comment-submit-button">Comment</button>
        </form>
        <div className="comments-list">
          {comments.map((comment) => (
            <Comment key={comment.id} comment={comment} />
          ))}
        </div>
      </div>
    </div>
  );
};

const Comment = ({ comment }) => {
  const [showReply, setShowReply] = useState(false);
  const [replyContent, setReplyContent] = useState('');
  const [replies, setReplies] = useState(comment.replies || []);

  const handleReplyChange = (e) => {
    setReplyContent(e.target.value);
  };

  const handleReplySubmit = async (e) => {
    e.preventDefault();
    if (replyContent.trim() === '') return;

    try {
      const response = await fetch(`http://localhost:5000/post/${comment.postId}/comment/${comment.id}/reply`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ content: replyContent }),
      });
      const data = await response.json();
      setReplies([...replies, data.reply]);
      setReplyContent('');
      setShowReply(false);
    } catch (error) {
      console.error('Error posting reply:', error);
    }
  };

  return (
    <div className="comment">
      <div className="comment-header">
        <img src={comment.authorAvatar} alt={`${comment.authorName}'s avatar`} className="comment-author-avatar" />
        <span className="comment-author-name">{comment.authorName}</span>
      </div>
      <div className="comment-content">{comment.content}</div>
      <div className="comment-actions">
        <button className="comment-action-button" onClick={() => setShowReply(!showReply)}>Reply</button>
      </div>
      {showReply && (
        <form className="reply-form" onSubmit={handleReplySubmit}>
          <input
            type="text"
            placeholder="Write a reply..."
            value={replyContent}
            onChange={handleReplyChange}
            className="reply-input"
          />
          <button type="submit" className="reply-submit-button">Reply</button>
        </form>
      )}
      <div className="replies-list">
        {replies.map((reply) => (
          <Comment key={reply.id} comment={reply} />
        ))}
      </div>
    </div>
  );
};

export default PostDetail;
