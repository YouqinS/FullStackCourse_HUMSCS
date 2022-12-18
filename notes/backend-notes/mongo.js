//mogoDB
const mongoose = require('mongoose')

if (process.argv.length < 3) {
    console.log('Please provide the password as an argument: node mongo.js <password>')
    process.exit(1)
}

const password = process.argv[2]

const url =
    `mongodb+srv://fullstack:${password}@cluster0.6s6l8.mongodb.net/note-app?retryWrites=true&w=majority`

mongoose.connect(url)

const noteSchema = new mongoose.Schema({
    content: String,
    date: Date,
    important: Boolean,
})

const Note = mongoose.model('Note', noteSchema)

const note = new Note({
    content: 'HTML is Easy',
    date: new Date(),
    important: true,
})

// note.save().then(result => {
//     console.log('note saved!')
//     //mongoose.connection.close()
// })

const note2 = new Note({
    content: "Browser can execute only Javascript",
    date: new Date(),
    important: false,
})
// note2.save().then(result => {
//     console.log(result)
//     //mongoose.connection.close()
// })

const note3 = new Note({
    content: "GET and POST are the most important methods of HTTP protocol",
    date: new Date(),
    important: true,
})
// note3.save().then(result => {
//     console.log(result)
//     mongoose.connection.close()
// })

notes = [note, note2, note3]

// for (let i = 0; i < notes.length; i++) {
//     notes[i].save().then(result => {
//         console.log(result)
//         if (i === notes.length - 1) {
//             mongoose.connection.close()
//         }
//     })
// }


/*Note.find({}).then(result => {
    result.forEach(note => {
        console.log(note)
    })
    mongoose.connection.close()
})*/

Note.find({important: true}).then(result => {
    result.forEach(note => {
        console.log(note)
    })
    mongoose.connection.close()
})


/*let persons = [
    {
        "id": 1,
        "name": "Arto Hellas",
        "number": "040-123456"
    },
    {
        "id": 2,
        "name": "Ada Lovelace",
        "number": "39-44-5323523"
    },
    {
        "id": 3,
        "name": "Dan Abramov",
        "number": "12-43-234345"
    },
    {
        "id": 4,
        "name": "Mary Poppendieck",
        "number": "39-23-6423122"
    }
]

const contacts = []

persons.forEach(p => {
    const contact = new Contact({
        "name": p.name,
        "number": p.number
    })
    contacts.push(contact)
})


for (let i = 0; i < contacts.length; i++) {
    contacts[i].save().then(result => {
        console.log(result)
        if (i === contacts.length - 1) {
            mongoose.connection.close()
        }
    })
}*/
