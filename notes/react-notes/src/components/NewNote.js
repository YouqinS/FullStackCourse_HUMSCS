import {useDispatch} from "react-redux";
import {createNote} from "../reducers/noteReducer";
import noteService from '../services/notes'
import { connect } from 'react-redux'



const NewNote = (props) => {
  const dispatch = useDispatch()
    const addNote = async (event) => {
        event.preventDefault()
        const content = event.target.note.value
        event.target.note.value = ""
        const newNote = await noteService.createNew(content)
        //dispatch(createNote(newNote))
        props.createNote(content)
    }

    return (
        <form onSubmit={addNote}>
            <input name="note"/>
            <button type="submit">add</button>
        </form>
    )
}


//export default NewNote
export default connect(
    null,
    { createNote }
)(NewNote)
