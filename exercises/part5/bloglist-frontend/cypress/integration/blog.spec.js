describe('Blog app', function () {
    beforeEach(function() {
        cy.request('POST', 'http://localhost:3003/api/testing/reset')
        const user = {
            name: 'Superuser',
            username: 'Superuser',
            password: 'salainen'
        }
        cy.request('POST', 'http://localhost:3003/api/users/', user)
        cy.visit('http://localhost:3000')
    })

    it('Login form is shown', function() {
        cy.contains('username')
        cy.contains('password')
        cy.contains('login').click()
    })

    describe('Login',function() {
        it('succeeds with correct credentials', function() {
            cy.get('#username').type('Superuser')
            cy.get('#password').type('salainen')
            cy.get('#login-button').click()
            cy.contains('Superuser logged in')
        })

        it('fails with wrong credentials', function() {
            cy.get('input:first').type('Superuser')
            cy.get('input:last').type('xxx')
            cy.get('#login-button').click()
            cy.get('.error')
                .should('contain', 'wrong username or password')
                .and('have.css', 'color', 'rgb(255, 0, 0)')
                .and('have.css', 'border-style', 'ridge')
            cy.get('html').should('not.contain', 'root logged in')
        })
    })

    describe('When logged in', function() {
        beforeEach(function() {
            cy.login({ username: 'Superuser', password: 'salainen' })
        })

        it('A blog can be created', function() {
            cy.contains('create new blog').click()
            cy.get('#title').type('a blog title')
            cy.get('#author').type('author')
            cy.get('#url').type('a blog url')
            cy.get('#createBtn').click()
            cy.contains('a blog title')
            cy.contains('author')
        })

        describe('and a note exists', function () {
            beforeEach(function () {
                cy.createBlog({
                    title: 'another blog title',
                    author: 'author',
                    url: 'a blog url'
                })
            })

            it('users can like a blog.', function () {
                cy.get('#blog').contains('view').click()

                cy.get('#blog-details').should('contain', '0')
                cy.get('#blog-details').contains('like').click()
                cy.get('#blog-details').should('contain', '1')
            })

            it('user who created a blog can delete it', function () {
                cy.get('#blog').contains('view').click()
                cy.get('#blog-details').contains('remove').click()
                cy.should('not.contain', 'another blog title')
            })
        })

        describe('and multiple blogs exist', function () {
            beforeEach(function () {
                cy.createBlog({
                    title: 'Blog 1',
                    author: 'author1',
                    url: 'a blog url',
                    likes: 10
                })
                    .then(() =>
                        cy.createBlog({
                            title: 'Blog 2',
                            author: 'author2',
                            url: 'a blog url',
                            likes: 20,
                        })
                    )
                    .then(() =>
                        cy.createBlog({
                            title: 'Blog 3',
                            author: 'author3',
                            url: 'a blog url',
                            likes: 30,
                        })
                    )
            })

            it('blogs are ordered by number of likes', function () {
                cy.get('.blog').then((blogs) => {
                    console.log(blogs)
                    expect(blogs[0].textContent).to.contains('Blog 3')
                    expect(blogs[1].textContent).to.contains('Blog 2')
                    expect(blogs[2].textContent).to.contains('Blog 1')
                })
        })

        })
    })
})
