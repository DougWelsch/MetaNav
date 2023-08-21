const express = require('express');
const bodyParser = require('body-parser');
const pino = require('express-pino-logger')();

const https = require('https');
const TOKEN = process.env.TOKEN;

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(pino);

/**
 * GET Requests
 */

app.get('/api/greeting', (req, res) => {
  const name = req.query.name || 'World';
  res.setHeader('Content-Type', 'application/json');
  res.send(JSON.stringify({ greeting: `Hello ${name}!` }));
});

app.get('/api/test', (client_req, client_res) => {
  console.log('serve: ' + client_req.url);

  var proxy = https.get('https://jsonplaceholder.typicode.com/users', res => {
    let data = [];
    const headerDate = res.headers && res.headers.date ? res.headers.date : 'no response date';
    console.log('Status Code:', res.statusCode);
    console.log('Date in Response header:', headerDate);

    // *** Check Server Response
    // res.on('data', chunk => {
    //   data.push(chunk);
    // });
    // res.on('end', () => {
    //   console.log('Response ended: ');
    //   const users = JSON.parse(Buffer.concat(data).toString());
    //   for(user of users) {
    //     console.log(`Got user with id: ${user.id}, name: ${user.name}`);
    //   }
    // });

    res.pipe(client_res);
  }).on('error', err => {
    console.log('Error: ', err.message);
  });

  client_req.pipe(proxy);
});

app.get('/api/reddit_test', (client_req, client_res) => {
  console.log('serve: ' + client_req.url);
  let url = 'https://oauth.reddit.com/api/v1/me';
  let options = {
    headers: {
      "User-Agent": "ChangeMeClient/0.1 by YourUsername",
      "Authorization": "bearer " + TOKEN
    }
  }

  var proxy = https.get(url, options, res => {
    let data = [];
    const headerDate = res.headers && res.headers.date ? res.headers.date : 'no response date';
    console.log('Status Code:', res.statusCode);
    console.log('Date in Response header:', headerDate);

    res.pipe(client_res);
  }).on('error', err => {
      console.log('Error: ', err.message);
  });

  client_req.pipe(proxy);
});

app.get('/api/subreddit', (client_req, client_res) => {
  console.log('serve: ' + client_req.url);

  let url = 'https://oauth.reddit.com/r/' + (client_req.query.sub || 'worldnews');
  let options = {
    headers: {
      "User-Agent": "ChangeMeClient/0.1 by YourUsername",
      "Authorization": "bearer " + TOKEN
    }
  }

  var proxy = https.get(url, options, res => {
    let data = [];
    const headerDate = res.headers && res.headers.date ? res.headers.date : 'no response date';
    console.log('Status Code:', res.statusCode);
    console.log('Date in Response header:', headerDate);

    res.pipe(client_res);
  }).on('error', err => {
      console.log('Error: ', err.message);
  });

  client_req.pipe(proxy);
});

app.get('/api/comments', (client_req, client_res) => {
  console.log('serve: ' + client_req.url);
  console.log(client_req.query);
  let url = 'https://oauth.reddit.com/' + client_req.query.sub + '/comments/' + client_req.query.id;
  console.log(url);
  let options = {
    headers: {
      "User-Agent": "ChangeMeClient/0.1 by YourUsername",
      "Authorization": "bearer " + TOKEN
    }
  }

  var proxy = https.get(url, options, res => {
    res.pipe(client_res);
  }).on('error', err => {
      console.log('Error: ', err.message);
  });

  client_req.pipe(proxy);
});

/**
 * POST Requests
 */

app.post('/api/comment', (client_req, client_res) => {
  console.log('serve: ' + client_req.url);
  let url = 'https://oauth.reddit.com/api/comment?api_type=json&text=' + encodeURIComponent(client_req.query.text) + '&thing_id=' + encodeURIComponent(client_req.query.id);
  console.log('URL: ' + url);
  let options  = {
    method: 'POST',
    headers: {
      "User-Agent": "ChangeMeClient/0.1 by YourUsername",
      "Authorization": "bearer " + TOKEN
    }
  };

  var proxy = https.request(url, options, res => {
    res.pipe(client_res);
  }).on('error', err => {
      console.log('Error: ', err.message);
  });

  client_req.pipe(proxy);
});

app.post('/api/upvote', (client_req, client_res) => {
  console.log('serve: ' + client_req.url);
  let url = 'https://oauth.reddit.com/api/vote?id=' + client_req.query.id + '&dir=' + client_req.query.dir;
  let options = {
    method: 'POST',
    form: {
      direction: Number(client_req.query.dir),
      id: client_req.query.id,
    },
    headers: {
      "User-Agent": "ChangeMeClient/0.1 by YourUsername",
      "Authorization": "bearer " + TOKEN
    }
  }

  var proxy = https.request(url, options, res => {
    res.pipe(client_res);
  }).on('error', err => {
      console.log('Error: ', err.message);
  });

  client_req.pipe(proxy);
});

/**
 * LISTEN
 */
app.listen(5000, () =>
  console.log('Express server is running on localhost:5000')
);