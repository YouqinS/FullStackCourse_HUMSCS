const jwt = require('jsonwebtoken')
const router = require('express').Router()

const { SECRET } = require('../util/config')
const User = require('../models/user')

router.post('/', async (request, response) => {
    const body = request.body

//The findOne method obtains the first entry it finds (that fulfills the optional query options, if provided).
    const user = await User.findOne({
        where: {
            username: body.username
        }
    })

    const passwordCorrect = body.password === 'secret'

    if (!(user && passwordCorrect)) {
        return response.status(401).json({
            error: 'invalid username or password'
        })
    }

    if (user.disabled) {
        return response.status(401).json({
            error: 'account disabled, please contact admin'
        })
    }

    const userForToken = {
        username: user.username,
        id: user.id,
    }

    const token = jwt.sign(userForToken, SECRET)

    response
        .status(200)
        .send({ token, username: user.username, name: user.name })
})

module.exports = router