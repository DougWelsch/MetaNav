# MetaNav

## NOTICE

This is a prototype application made under time constraint

## Setup

1. Obtain authentification access token through a POST request to https://www.reddit.com/api/v1/access_token containing the developer's id and secret key in the authorization header (as described [here](https://github.com/reddit-archive/reddit/wiki/OAuth2-Quick-Start-Example) or shown [here](https://www.youtube.com/watch?v=x9boO9x3TDA))
2. Create .env file containing the TOKEN = '{access token obtained in previous step}', to be used by the proxy server

## Run

Execute the following code to start the client on [http://localhost:3000](http://localhost:3000) and server of [http://localhost:5000](http://localhost:5000)

### `npm run dev`

## Proposed Updates and Critique

- Running the proxy server requires the definition of a TOKEN (either directly in server > index.js or in a .env file) given as an access_token received when POST-ing the developer API credentials to some /api/v1/access_token. Since the specifications indicated authentication was a plus, I was using Postman to run the request and didn't have time to incorporate it into the interface. If you have any trouble recreating this (e.g., by wanting to forego creating an account for the developer API credentials), I can just send those credentials  (or the token) over since I created them using a burner account
- For the proxy, there is an established Reddit API wrapper (snoowrap), but I decided to forego it since it simplifies the process enough that the current code is likely more reflective of my knowledge dealing with  back-ends.
- There are some errors (as well as miscellaneous console logs from debugging) noted in the console; however, they don't appear to make a functional difference
- Add handling for various request status codes, errors (For example, I want to only update the post score and comments when Reddit actually accepted those requests.)
- All React elements are functions; I am not certain if there is a significant design difference if they were classes/components
- Labeling between className and id fields is a mess, standardized in the format of parent being "ParentName", child being "ParentName-ChildName", etc.
- Add login page that redirects to main app page
- Add, in .env, fields for server/client ports
- What components of the requests to/from the proxy should be retained?
- Desired header format: Subreddit title on left, rounded search input on right with the placeholder of "Enter subreddit title" and search icon. Additionally, have the header fixed to the top of the screen while scrolling subreddit posts
- Disable comment modal until populated
- Disable background scrolling while comment modal is active
- Restructure project layout to separate component.js and component.css
- Add media display or redirects links for subreddit posts


