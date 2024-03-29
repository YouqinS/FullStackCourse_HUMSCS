describe('Note app', function() {
    beforeEach(function() {
        cy.request('POST', 'http://localhost:3001/api/testing/reset')
        const user = {
            name: 'Superuser',
            username: 'Superuser',
            password: 'salainen'
        }
        cy.request('POST', 'http://localhost:3001/api/users/', user)
        cy.visit('http://localhost:3000')
    })

    it('front page can be opened', function() {
        cy.contains('Notes')
        cy.contains('Note app, Department of Computer Science, University of Helsinki 2021')
    })

    it('login form can be opened', function() {
        cy.contains('login').click()
    })

    it('user can login', function () {
        cy.contains('login').click()
        cy.get('#username').type('Superuser')
        cy.get('#password').type('salainen')
        cy.get('#login-button').click()
        cy.contains('Superuser logged in')
    })


    describe('when logged in', function() {
        /*beforeEach(function() {
            cy.contains('login').click()
            cy.get('input:first').type('Superuser')
            cy.get('input:last').type('salainen')
            cy.get('#login-button').click()
        })*/

        /*beforeEach(function() {
            cy.request('POST', 'http://localhost:3001/api/login', {
                username: 'Superuser', password: 'salainen'
            }).then(response => {
                localStorage.setItem('loggedNoteappUser', JSON.stringify(response.body))
                cy.visit('http://localhost:3000')
            })
        })*/

        beforeEach(function() {
            cy.login({ username: 'Superuser', password: 'salainen' })
        })

        it('a new note can be created', function() {
            cy.contains('new note').click()
            cy.get('input').type('a note created by cypress')
            cy.contains('save').click()
            cy.contains('show all').click()
            cy.contains('a note created by cypress')
        })

        describe('and a note exists', function () {
            /*beforeEach(function () {
                cy.contains('new note').click()
                cy.get('input').type('another note cypress')
                cy.contains('save').click()
                cy.contains('show all').click()
            })*/

            beforeEach(function () {
                cy.createNote({
                    content: 'another note cypress',
                    important: false
                })
            })

            it('it can be made important', function () {
                cy.contains('another note cypress')
                    .contains('make important')
                    .click()

                cy.contains('another note cypress')
                    .contains('make not important')
            })
        })

        describe('and several notes exist', function () {
            beforeEach(function () {
                cy.createNote({ content: 'first note', important: false })
                cy.createNote({ content: 'second note', important: false })
                cy.createNote({ content: 'third note', important: false })
            })

            it('one of those can be made important', function () {
                cy.contains('second note')
                    .contains('make important')
                    .click()

                cy.contains('second note')
                    .contains('make not important')

                // if the element and button are not in same level, use 'parent'
                // cy.contains('second note').parent().find('button').click()
                //   cy.contains('second note').parent().find('button')
                //     .should('contain', 'make not important')

                // define find item 'as':
                // cy.contains('second note').parent().find('button').as('theButton')
                //   cy.get('@theButton').click()
                //   cy.get('@theButton').should('contain', 'make not important')
            })
        })

    })

    it('login fails with wrong password', function() {
        cy.contains('login').click()
        cy.get('input:first').type('Superuser')
        cy.get('input:last').type('xxx')
        cy.get('#login-button').click()
        // cy.get('.error').contains('error login')
        // cy.get('.error').should('have.css', 'color', 'rgb(255, 0, 0)')
        // cy.get('.error').should('have.css', 'border-style', 'solid')
        cy.get('.error')
            .should('contain', 'error login')
            .and('have.css', 'color', 'rgb(255, 0, 0)')
            .and('have.css', 'border-style', 'solid')
        cy.get('html').should('not.contain', 'Superuser logged in')
    })
})
