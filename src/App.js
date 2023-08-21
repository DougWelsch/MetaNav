import React, { useState } from 'react';
import SubredditPost from './components/SubredditPost';
import CommentModal from './components/CommentModal.js';
import './App.css';

/**
 * Primary application wrapper
 * 
 * @returns App
 */
function App() {  
  // Mr. Saturn, from the illustrious Earthbound, providing moral support
  const saturn_quotes = [
    "Boing.",
    "Never tire of this.",
    "Dakota!",
    "Am happy. Am in trouble. No, wait. Am happy."
  ];
  
  // Subreddit post state
  const [state, setState] = useState({
    title_quote: saturn_quotes[Math.floor(Math.random() * saturn_quotes.length)],
    subreddit: "ProgrammerHumor",
    posts: []
  });

  // Post comment state
  const [comments_state, comments_setState] = useState({
    post_id: "",
    comments: [],
    comments_visible: false,
  })

  // /**
  //  * @summary Set server authorization token
  //  * @param {object} event 
  //  */
  // function init(event) {
  //   event.preventDefault();
  //   fetch(`/api/init`, {method: "POST"})
  //   .then(
  //     response => console.log(response)
  //   )
  // }

  /**
   * @summary Generates a subreddit post preview from [contents] and appends to current posts
   * @param {object} contents 
   */
  function addPost(contents) {
    // console.log("Data.Title: " + contents.data.title)
    // console.log("Data: " + JSON.stringify(contents.data))
    const post = <SubredditPost key={contents.data.id} content={contents.data} c_state={comments_state} c_setState={comments_setState}/>

    setState(prev_state => ({
      ...prev_state,
      posts: [...prev_state.posts, post]
    }));
  }

  /**
   * @summary Updates subreddit name field
   * @param {object} event 
   */
  function updateSubreddit(event) {
    // setState({
    //   ...state,
    //   subreddit: event.target.value
    // });
    setState(prev_state => ({
      ...prev_state,
      subreddit: event.target.value
  }));
  }

  /**
   * @summary Sends a GET to the proxy to populate subreddit posts
   * @param {object} event 
   */
  function handleSubreddit(event) {
    event.preventDefault();

    // Clear posts of current subreddit
    setState(prev_state => ({
      ...prev_state,
      posts: []
    }));

    // Fetch GET to proxy
    fetch(`/api/subreddit?sub=${encodeURIComponent(state.subreddit)}`)
    .then(
      response => response.json()
    ).then(
      data => {
        // console.log(data)
        // console.log(data.data.children.forEach(addPost))
        data.data.children.forEach(addPost)
      }
    );
  }

  /**
   * @summary Clears comments and hides modal
   */
  function hideComments() {
    comments_setState({
      comments: [],
      comments_visible: false,
    })
  }

  return (
    <div className="App">
      <header className="App-header">
        <p>{state.title_quote}</p>

        <form onSubmit={handleSubreddit}>
          <label htmlFor="name">Enter subreddit: </label>
          <input
            id="subreddit"
            type="text"
            value={state.subreddit}
            onChange={updateSubreddit}
          />
          <button type="submit">Submit</button>
        </form>
        {/* <button onClick={init}>Set Access</button> */}
        <CommentModal show={comments_state.comments_visible} handleClose={hideComments} comments={comments_state.comments} setComments={comments_setState} post_id={comments_state.post_id}/>
      </header>
      <body className="App-body">
        {state.posts}
      </body>
    </div>
  );
}

export default App;