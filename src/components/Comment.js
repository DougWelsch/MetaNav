import './Comment.css';

/**
 * Post comment
 * 
 * @param {object} (prop) content 
 * @returns Populated comment div
 */
function Comment({content}) {
  return (
    <div className="comment">
        <h1 id="comment_author">{content.author}</h1>
        <h2 id="comment_message">{content.body}</h2>
    </div>
  );
};

export default Comment;