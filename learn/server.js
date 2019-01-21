const next = require('next')
const express = require('express')

const dev = process.env.NODE_ENV !== 'production'
const port = process.env.PORT || 4004

const server = express()
const app = next({ dev })
const handler = app.getRequestHandler()

app.prepare()
  .then(() => {
    server.get('/learn', (req, res) => {
      app.render(req, res, '/learn/content', {...req.query, course: 'basics', lesson: 'getting-started'})
    })

    server.get('/learn/:course/:lesson/:step?', (req, res) => {
      const { course, lesson, step } = req.params
      app.render(req, res, '/learn/content', { ...req.query, course, lesson, step })
    })

    server.use((req, res) => {
      handler(req, res)
    })

    server.listen(port, (err) => {
      if (err) {
        console.error(err.stack)
        process.exit(1)
      }

      console.log(`App started on port: http://localhost:${port}`)
    })
  })
  .catch((ex) => {
    console.error(ex.stack)
    process.exit(1)
  })