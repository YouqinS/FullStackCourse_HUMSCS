import React, { useState } from 'react'
import ReactDOM from 'react-dom'

import {
    BrowserRouter,
    Switch,
    Route,
    Link,
    Redirect,
    useParams,
    useHistory,
    useRouteMatch
} from "react-router-dom"
import {Alert, Button, Form, Nav, Navbar, Table} from "react-bootstrap";
import {AppBar, TableBody, TableCell, TableContainer, TableRow, TextField, Toolbar} from "@material-ui/core";
//import { Alert } from '@material-ui/lab'

const HomePage = () => (
    <div>
        <h2>TKTL notes app</h2>
        <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
    </div>
)

const Note = ({ notes }) => {
    const id = useParams().id
    const note = notes.find(n => n.id === Number(id))
    return (
        <div>
            <h2>{note.content}</h2>
            <div>{note.user}</div>
            <div><strong>{note.important ? 'important' : ''}</strong></div>
        </div>
    )
}

const Note1 = ({ note }) => {
    return (
        <div>
            <h2>{note.content}</h2>
            <div>{note.user}</div>
            <div><strong>{note.important ? 'important' : ''}</strong></div>
        </div>
    )
}

const Notes = ({notes}) => (
    <div>
        <h2>Notes</h2>
        <h3>notes as a table with Bootstrap</h3>
        <Table striped>
            <tbody>
            {notes.map(note =>
                <tr key={note.id}>
                    <td>
                        <Link to={`/notes/${note.id}`}>{note.content}</Link>
                    </td>
                    <td>
                        {note.user}
                    </td>
                </tr>
            )}
            </tbody>
        </Table>

        <h3>notes as a table with MaterialUI</h3>
        <TableContainer>
            <Table>
                <TableBody>
                    {notes.map(note =>
                        <TableRow key={note.id}>
                            <TableCell>
                                <Link to={`/notes/${note.id}`}>{note.content}</Link>
                            </TableCell>
                            <TableCell>
                                {note.user}
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </TableContainer>



        <h3>notes as a list</h3>
        <ul>
            {notes.map(note =>
                <li key={note.id}>
                    <Link to={`/notes/${note.id}`}>{note.content}</Link>
                </li>
            )}
        </ul>

    </div>
)

const Users = () => (
    <div>
        <h2>TKTL notes app</h2>
        <ul>
            <li>Matti Luukkainen</li>
            <li>Juha Tauriainen</li>
            <li>Arto Hellas</li>
        </ul>
    </div>
)

const Login = (props) => {
    const history = useHistory()

    const onSubmit = (event) => {
        event.preventDefault()
        props.onLogin('root')
        //The history.push('/') call causes the browser's url to change to / and
        // the application renders the corresponding component Home.
        history.push('/')
        //props.displayNotification(`hello`)
    }

    return (
        <div>
{/*            <h2>login without css</h2>
            <form onSubmit={onSubmit}>
                <div>
                    username: <input />
                </div>
                <div>
                    password: <input type='password' />
                </div>
                <button type="submit">login</button>
            </form>*/}

            <h2>login with Bootstrap css</h2>
            <Form onSubmit={onSubmit}>
                <Form.Group>
                    <Form.Label> username: </Form.Label>
                    <Form.Control type="text" name="username" />

                    <Form.Label> password: </Form.Label>
                    <Form.Control type="password" name="password" />

                    <Button variant="primary" type="submit"> login </Button>
                </Form.Group>
            </Form>

            <h2>login with MaterialUI css</h2>
            <form>
                <div>
                    <TextField label="username" />
                </div>
                <div>
                    <TextField label="password" type='password' />
                </div>
                <div>
                    <Button variant="contained" color="primary" type="submit">
                        login
                    </Button>
                </div>
            </form>
        </div>
    )
}

const Home = () => {
    const [notes, setNotes] = useState([
        {
            id: 1,
            content: 'HTML is easy',
            important: true,
            user: 'Matti Luukkainen'
        },
        {
            id: 2,
            content: 'Browser can execute only Javascript',
            important: false,
            user: 'Matti Luukkainen'
        },
        {
            id: 3,
            content: 'Most important methods of HTTP-protocol are GET and POST',
            important: true,
            user: 'Arto Hellas'
        }
    ])
    const [notification, setNotification] = useState('')

    const displayNotification = (message) => {
        setNotification(message)
        setTimeout(() => {
            setNotification('')
        }, 5000)
    }

    const [user, setUser] = useState(null)

    const login = (user) => {
        setUser(user)
        displayNotification(`hello ${user}`)
    }

    const padding = {
        padding: 5
    }

    // useRouteMatch cannot be used in the same component as BrowserRouter
    //       <BrowserRouter>
    //       <Home/>
    //       </BrowserRouter>
    const match = useRouteMatch('/notes/:id')
    const note = match
        ? notes.find(note => note.id === Number(match.params.id))
        : null



    return (
        <div className="container">
            {(notification &&
                <Alert variant="success">
                    {notification}
                </Alert>
            )}

            {(notification &&
                <Alert severity="success">
                    {notification}
                </Alert>
            )}
            {/*<BrowserRouter>*/}
{/*            <h3>nav bar without css</h3>
                <div>
                    <Link style={padding} to="/">home</Link>
                    <Link style={padding} to="/notes">notes</Link>
                    <Link style={padding} to="/users">users</Link>
                    {user ? <Link style={padding} to="/users">users</Link> : null}
                    {user
                        ? <em>user: <strong>{user}</strong></em>
                        : <Link style={padding} to="/login">login</Link>
                    }
                </div>*/}

            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                <Navbar.Toggle aria-controls="responsive-navbar-nav"/>
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="mr-auto">
                        <Nav.Link href="#" as="span">
                            <Link style={padding} to="/">home</Link>
                        </Nav.Link>
                        <Nav.Link href="#" as="span">
                            <Link style={padding} to="/notes">notes</Link>
                        </Nav.Link>
                        <Nav.Link href="#" as="span">
                            {user ? <Link style={padding} to="/users">users</Link> : null}
                        </Nav.Link>
                        <Nav.Link href="#" as="span">
                            {user
                                ? <em>user: <strong>{user}</strong></em>
                                : <Link style={padding} to="/login">login</Link>
                            }
                        </Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>

            <AppBar position="static">
                <Toolbar>
                    <Button color="inherit" component={Link} to="/">
                        home
                    </Button>
                    <Button color="inherit" component={Link} to="/notes">
                        notes
                    </Button>
                    <Button color="inherit" component={Link} to="/users">
                        users
                    </Button>
                    {user
                        ? <em>{user} logged in</em>
                        : <Button color="inherit" component={Link} to="/login">
                            login
                        </Button>
                    }
                </Toolbar>
            </AppBar>

                <Switch>
                    {/*<Route path="/notes/:id">
                        <Note notes={notes} />
                    </Route>*/}
                    <Route path="/notes/:id">
                        <Note1 note={note} />
                    </Route>

                    <Route path="/notes">
                        <Notes notes={notes} />
                    </Route>
                    {/*<Route path="/users">
                        {user ? <Users /> : <Redirect to="/login" />}
                    </Route>*/}
                    <Route path="/users">
                        <Users />
                    </Route>
                    <Route path="/login">
                        <Login onLogin={login} displayNotification={displayNotification}/>
                    </Route>
                    <Route path="/">
                        <HomePage />
                    </Route>
                </Switch>
            {/*</BrowserRouter>*/}
            <div>
                <br />
                <em>Note app, Department of Computer Science 2021</em>
            </div>
        </div>
    )
}

export default Home
