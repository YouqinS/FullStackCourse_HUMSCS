const app = require('./app') // the actual Express application
const http = require('http')
const config = require('./utils/config')
const logger = require('./utils/logger')

const server = http.createServer(app)

server.listen(config.PORT, () => {
    logger.info(`Server running on port ${config.PORT}`)
})









/**
 * before structural refactoring:
 */

//imports Node's built-in web server module
/*let notes = [
    {
        id: 1,
        content: "HTML is easy",
        date: "2019-05-30T17:30:31.098Z",
        important: true
    },
    {
        id: 2,
        content: "Browser can execute only Javascript",
        date: "2019-05-30T18:39:34.091Z",
        important: false
    },
    {
        id: 3,
        content: "GET and POST are the most important methods of HTTP protocol",
        date: "2019-05-30T19:20:14.298Z",
        important: true
    }
]*/

/*require('dotenv').config()

const express = require('express')
const cors = require('cors')
const Note = require('./models/note')


const app = express()
app.use(express.json())//express json-parser
app.use(cors())*/

/*//mogoDB
const mongoose = require('mongoose')

const password = "rzFjnv5XaTbpAQjp"

const url =
    `mongodb+srv://fullstack:${password}@cluster0.6s6l8.mongodb.net/note-app?retryWrites=true&w=majority`

mongoose.connect(url)

const noteSchema = new mongoose.Schema({
    content: String,
    date: Date,
    important: Boolean,
})

noteSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

const Note = mongoose.model('Note', noteSchema)

app.get('/api/notes', (req, res) => {
    Note.find({}).then(notes => {
        res.json(notes)
    })
})
*/


/*const requestLogger = (request, response, next) => {
    console.log('Method:', request.method)
    console.log('Path:  ', request.path)
    console.log('Body:  ', request.body)
    console.log('---')
    next()
}
//app.use(requestLogger)*/


/*
app.get('/', (req, res) => {
    res.send('<h1>HELLO WORLD</h1>')
})

app.get('/api/notes', (req, res) => {
    Note.find({}).then(notes => {
        res.json(notes)
    })
})*/


/*app.get('/api/notes/:id', (request, response, next) => {
    Note.findById(request.params.id).then(note => {
        if (note) {
            response.json(note)
        } else {
            response.status(404).end()
        }
    }).catch(error => next(error))

    /!*.catch(error => {
        console.log(error)
        //response.status(500).end()
        response.status(400).send({ error: 'malformatted id' })

    })*!/
})*/
/*app.get('/api/notes/:id', (req, res) => {
    console.log(req.params)
    const id = Number(req.params.id)
    const note = notes.find(note => note.id === id)
    if (note) {
        res.json(note)
    } else {
        res.status(404).end()
    }
})*/


/*app.post('/api/notes', (request, response, next) => {
    const body = request.body
    console.log(request.body)
    if (!body || body.content === undefined) {
        return response.status(400).json({
            error: 'content missing'
        })
    }

    const note = new Note({
        content: body.content,
        important: body.important || false,
        date: new Date(),
    })

    note.save().then(savedNote => {
        response.json(savedNote.toJSON())
    }).catch(error => next(error))

    /!*
        const generateId = () => {
        //notes.map(n => n.id) creates a new array that contains all the ids of the notes
        const maxId = notes.length === 0 ? 0 : Math.max(...notes.map(n => n.id))
        return maxId + 1
    }
    const note = {
        content: body.content,
        important: body.important || false,
        date: new Date(),
        id: generateId()
    }

    notes = notes.concat(note)
    console.log(notes)
    response.json(note)*!/
})*/

/*app.put('/api/notes/:id', (request, response, next) => {
    const body = request.body

    const note = {
        content: body.content,
        important: body.important,
    }

    Note.findByIdAndUpdate(request.params.id, note, { new: true })
        .then(updatedNote => {
            response.json(updatedNote.toJSON())
        })
        .catch(error => next(error))
})*/

/*app.delete('/api/notes/:id', (request, response, next) => {
    Note.findByIdAndRemove(request.params.id)
        .then(result => {
            response.status(204).end()
        })
        .catch(error => next(error))
})*/

/*
app.delete('/api/notes/:id', (request, response) => {
    const id= Number(request.params.id)
    notes = notes.filter(note => note.id !== id)

    console.log(notes)

    response.status(204).end()
})
*/


/*const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)*/

/*const errorHandler = (error, request, response, next) => {
    console.error(error.message)

    if (error.name === 'CastError') {
        return response.status(400).send({ error: 'malformatted id' })
    } else if (error.name === 'ValidationError') {
        return response.status(400).json({ error: error.message })
    }

    next(error)
}

// this has to be the last loaded middleware.
app.use(errorHandler)*/



/*const PORT = 3002

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})*/

/*
with Node
const http = require('http')
const app = http.createServer((request, response) => {
    response.writeHead(200, {'Content-Type': 'application/json'})
    response.end(JSON.stringify(notes))
})

const PORT = 3001
app.listen(PORT)
console.log(`Server running on port ${PORT}`)
*/
