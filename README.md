# MetaNav

## Setup

1. Obtain authentification access token through a POST request to https://www.reddit.com/api/v1/access_token containing the developer's id and secret key in the authorization header (as described [here](https://github.com/reddit-archive/reddit/wiki/OAuth2-Quick-Start-Example) or shown [here](https://www.youtube.com/watch?v=x9boO9x3TDA))
2. Create .env file containing the TOKEN = '{access token obtained in previous step}', to be used by the proxy server

## Run

Execute the following code to start the client on [http://localhost:3000](http://localhost:3000) and server of [http://localhost:5000](http://localhost:5000)

### `npm run dev`