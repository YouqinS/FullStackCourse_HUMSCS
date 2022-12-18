import {useDispatch, useSelector} from "react-redux";
import {toggleImportanceOf} from "../reducers/noteReducer";
import noteService from '../services/notes'
import { connect } from 'react-redux'


const Note = ({note, handleClick}) => {
    return (<li onClick={handleClick}>
        {note.content} :
        <strong>{note.important ? "important" : "not important"}</strong>
    </li>)
}

const Notes = (props) => {
    //const dispatch = useDispatch()
    /*//const notes = useSelector(state => state.notes)
    const notes = useSelector(({filter, notes}) => {
        if (filter === "ALL") {
            return notes
        }
        return filter === "IMPORTANT"
            ? notes.filter(note => note.important)
            : notes.filter(note => !note.important)
    })*/

    const updateNote = async (note) => {
        const changedNote = {
            ...note,
            important: !note.important
        }
        const updatedNote = await noteService.update(note.id, changedNote)
        //dispatch(toggleImportanceOf(updatedNote.id))
    }


    return (
        <ul>
            {props.notes.map(note => <Note key={note.id} note={note}
                                           handleClick={() => props.toggleImportanceOf(note.id)}
            />)}
        </ul>
    )
}

const mapDispatchToProps = {
    toggleImportanceOf,
}

const mapStateToProps = (state) => {
    console.log('state:', state)
    if ( state.filter === 'ALL' ) {
        return {
            notes: state.notes
        }
    }
    return {
        notes: (state.filter  === 'IMPORTANT'
                ? state.notes.filter(note => note.important)
                : state.notes.filter(note => !note.important)
        )
    }
}

const ConnectedNotes = connect(mapStateToProps, mapDispatchToProps)(Notes)
export default ConnectedNotes

//export default Notes
