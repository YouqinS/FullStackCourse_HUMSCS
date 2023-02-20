require('dotenv').config()
const { Sequelize, Model, DataTypes } = require('sequelize')
const express = require('express')
const app = express()
app.use(express.json())

const sequelize = new Sequelize(process.env.DATABASE_URL, {
    // dialectOptions: {
    //     ssl: {
    //         require: true,
    //         rejectUnauthorized: false
    //     }
    // },
    dialect: 'postgres',
    protocol: 'postgres',
    dialectOptions: {},
});

//create schema
class Note extends Model {}
Note.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    content: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    important: {
        type: DataTypes.BOOLEAN
    },
    date: {
        type: DataTypes.DATE
    }
}, {
    sequelize,
    underscored: true,
    timestamps: false,
    modelName: 'note'
})
//CREATE TABLE IF NOT EXISTS
Note.sync()
//youqin@youqin-Latitude-7490:~/Downloads/CSM_HU/FullStackCourse_HUMSCS/exercises/part13/lecture$ node index.js
// Server running on port 3001
// Executing (default): SELECT table_name FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'notes'
// Executing (default): CREATE TABLE IF NOT EXISTS "notes" ("id"  SERIAL , "content" TEXT NOT NULL, "important" BOOLEAN, "date" TIMESTAMP WITH TIME ZONE, PRIMARY KEY ("id"));
// Executing (default): SELECT i.relname AS name, ix.indisprimary AS primary, ix.indisunique AS unique, ix.indkey AS indkey, array_agg(a.attnum) as column_indexes, array_agg(a.attname) AS column_names, pg_get_indexdef(ix.indexrelid) AS definition FROM pg_class t, pg_class i, pg_index ix, pg_attribute a WHERE t.oid = ix.indrelid AND i.oid = ix.indexrelid AND a.attrelid = t.oid AND t.relkind = 'r' and t.relname = 'notes' GROUP BY i.relname, ix.indexrelid, ix.indisprimary, ix.indisunique, ix.indkey ORDER BY i.relname;


//select all
app.get('/api/notes', async (req, res) => {
    const notes = await Note.findAll()
    console.log(notes)
    console.log(JSON.stringify(notes, null, 2))
    res.json(notes)
})

//select by id
app.get('/api/notes/:id', async (req, res) => {
    const note = await Note.findByPk(req.params.id)
    if (note) {
        console.log(note)
        console.log(note.toJSON())
        res.json(note)
    } else {
        res.status(404).end()
    }
})
//Executing (default): SELECT table_name FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'notes'
// Executing (default): SELECT i.relname AS name, ix.indisprimary AS primary, ix.indisunique AS unique, ix.indkey AS indkey, array_agg(a.attnum) as column_indexes, array_agg(a.attname) AS column_names, pg_get_indexdef(ix.indexrelid) AS definition FROM pg_class t, pg_class i, pg_index ix, pg_attribute a WHERE t.oid = ix.indrelid AND i.oid = ix.indexrelid AND a.attrelid = t.oid AND t.relkind = 'r' and t.relname = 'notes' GROUP BY i.relname, ix.indexrelid, ix.indisprimary, ix.indisunique, ix.indkey ORDER BY i.relname;
// Executing (default): SELECT "id", "content", "important", "date" FROM "notes" AS "note" WHERE "note"."id" = '1';


//update by id
app.put('/api/notes/:id', async (req, res) => {
    const note = await Note.findByPk(req.params.id)
    if (note) {
        note.important = req.body.important
        await note.save()
        console.log(note)
        console.log(note.toJSON())
        res.json(note)
    } else {
        res.status(404).end()
    }
})

//create
app.post('/api/notes', async (req, res) => {
    console.log(req)
    console.log(req.body)
    try {
        const note = await Note.create(req.body)
        console.log(note)
        console.log(note.toJSON())
        return res.json(note)
    } catch(error) {
        return res.status(400).json({ error })
    }
})

//or
// app.post('/api/notes', async (req, res) => {
//     console.log(req.body)
//     const note = await Note.create(req.body)
//     res.json(note)
//
// /*    //create with "build" and "save"
//     const note = Note.build(req.body)
//     note.important = true
//     await note.save()*/
// })




const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})

