import React, { useState } from 'react';
import Comment from './Comment.js';
import './SubredditPost.css';

/**
 * Subreddit post preview
 * 
 * @param {object} (prop) content 
 * @param {object} (prop) c_state
 * @param {function} (prop) c_setState
 * @returns Post from a subreddit defined by content
 */
function SubredditPost({content, c_state, c_setState}) {
    // Prefixed subreddit name, e.g., r/programmerhumor 
    const sub_name = content.subreddit_name_prefixed;

    // Unique content ID (fullname) assigned by Reddit
    const post_id = content.id;

    // Post original score (rating)
    const original_score = content.score;

    // Score state
    const [state, setState] = useState({
        score: Number(content.score),
        score_color: `rgb(255, 255, 255)`,
    });

    // Comment state
    const [comments_state, comments_setState] = [c_state, c_setState];

    /**
     * @summary Fetches a POST request to the proxy for post upvote/downvote
     * @param {string} direction Identifies direction of vote: upvote is "1", downvote is "-1"
     */
    function vote(direction) {
        // Update score display
        setState(prev_state => ({
            ...prev_state,
            score: (direction === '1') ? (original_score + 1).toString() : (original_score - 1).toString(),
            score_color: (direction === '1') ? `rgb(0, 255, 0)` : `rgb(255, 0, 0)`
        }));

        // Send request to Reddit
        fetch(`/api/upvote?id=${encodeURIComponent("t3_" + post_id)}&dir=${encodeURIComponent(direction)}`, {method: "POST"})
        .then(
            response => console.log(response)
        )
    }

    /**
     * @summary Parses comment response data to create Comment object, appends to current comments
     * @param {object} contents 
     */
    function processComment(contents) {
        // console.log(contents.data.body)
        const comment = <Comment key={contents.data.id} content={contents.data}/>

        comments_setState(prev_state => ({
            ...prev_state,
            comments: [...prev_state.comments, comment]
        }));
    }

    /**
     * @summary Fetchs GET request to proxy for post comments, Displays comment modal
     */
    function showComments() {
        // Fetch comments
        fetch(`/api/comments?sub=${encodeURIComponent(sub_name)}&id=${encodeURIComponent(post_id)}`)
        .then(
            response => {
                // console.log(response.json())
                response.json().then((containers) => {
                    // console.log(containers[1])
                    containers[1].data.children.forEach(processComment);
                });
            }
        )

        // Set comment visibility
        comments_setState(prev_state => ({
            ...prev_state,
            post_id: post_id, 
            comments_visible: true,
        }));
    }

    // function hideComments() {
    //     setState(prev_state => ({
    //         ...prev_state,
    //         comments_visible: false,
    //         comments: []
    //     }));
    // }

    return (
        <div className="post">
            <div className="rating">
                <button className="rate" id="upvote" onClick={() => vote("1")}>+1</button>
                <p id="score" style={{color: state.score_color}}>{state.score}</p>
                <button className="rate" id="downvote" onClick={() => vote("-1")}>-1</button>
            </div>
            <div className="description">
                <div id="title">
                    <h1 id="title_text">{content.title}</h1>
                </div>
                <h2 id="author">{content.author}</h2>
                <button id="comments" onClick={showComments}>Comments ({content.num_comments})</button>
            </div>
        </div>
    );
}

export default SubredditPost;