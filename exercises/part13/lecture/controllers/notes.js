//route handling associated with notes

const router = require('express').Router()
const { Op } = require('sequelize')

const {Note, User} = require('../models')
const {noteFinder, tokenExtractor} = require("../util/middleware");

router.post('/', tokenExtractor, async (req, res) => {
    try {
        const user = await User.findByPk(req.decodedToken.id)
        const note = await Note.create({...req.body, userId: user.id, date: new Date()})

        //const user = await User.findByPk(req.decodedToken.id)
        // create a note without saving it yet
        // const note = Note.build({ ...req.body, date: new Date() })
        // put the user id in the userId property of the created note
        // note.userId = user.id
        // store the note object in the database
        // await note.save()

        // const user = await User.findOne()
        // const note = await Note.create({...req.body, userId: user.id})
        //const note = await Note.create(req.body)
        res.json(note)
    } catch (error) {
        return res.status(400).json({error})
    }
})

router.get('/', async (req, res) => {
    const where = {}

    //http://localhost:3001/api/notes?important=true
    if (req.query.important) {
        where.important = req.query.important === "true"
    }

    //http://localhost:3001/api/notes?search=xx
    if (req.query.search) {
        where.content = {
            [Op.substring]: req.query.search
        }
    }

    const notes = await Note.findAll({
        attributes: { exclude: ['userId'] },
        include: {
            model: User,
            attributes: ['name']
        },
        where,
    })
    res.json(notes)
})

router.get('/:id', noteFinder, async (req, res) => {
    if (req.note) {
        res.json(req.note)
    } else {
        res.status(404).end()
    }
})

router.delete('/:id', noteFinder, async (req, res) => {
    if (req.note) {
        await req.note.destroy()
    }
    res.status(204).end()
})

router.put('/:id', noteFinder, async (req, res) => {
    if (req.note) {
        req.note.important = req.body.important
        await req.note.save()
        res.json(req.note)
    } else {
        res.status(404).end()
    }
})

module.exports = router