const https = require('https')

const getRepos = (username, done) => {
  if (!username) {
    return done(new Error('You need to specify user name'))
  }
  const options = {
    hostname: 'api.github.com',
    path: `/users/${username}/repos`,
    headers: {
      'User-Agent': username
    }
  }
  const req = https.get(options,  res => {
    res.setEncoding('utf-8')

    if (res.statusCode === 200) {
      let body = ''
      res.on('data', data => body += data)
      res.on('end', () => {
        try {
          const result = JSON.parse(body)
          done(null, result)
        } catch (error) {
          done(Error(`Failure to handle data (${error.message})`))
        }
        
      })
    } else {
      done(new Error(`Failure to get data from server (${res.statusCode} ${res.statusMessage})`))
    }
  })

  req.on('error', error => {
    done(new Error(`Request failed ${error.message}`))
  })
}

module.exports = {
  getRepos
}