import React from 'react'
import { Link } from 'react-router-dom'
import { format } from 'date-fns'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './Note.css'
import apiContext from '../api-context'
import config from '../config'

export default class Note extends React.Component {

  static defaultProps = {
    onDeleteNote: () => { },
  }

  static contextType = apiContext;

  handleClickDelete = e => {
    e.preventDefault()
    const noteId = this.props.id
    fetch(`${config.API_ENDPOINT}/notes/${noteId}`, {
      method: 'DELETE',
      headers: {
        'content-type': 'application/json'
      },
    })
      .then(res =>
        (!res.ok)
          ? res.json().then(e => Promise.reject(e))
          : 0
      )
      .then(() => {
        this.context.deleteNote(noteId)
        this.props.onDeleteNote(noteId)
      })
      .catch(error => {
        console.error({ error })
      })
  }

  render() {
    const { note_name, id, date_modified, content } = this.props
    return (
      <div className='Note'>
        <h2 className='Note__title'>
          <Link to={`/note/${id}`}>
            {note_name}
          </Link>
        </h2>
        <button className='Note__delete' type='button'>
          <FontAwesomeIcon icon='trash-alt' />
          {' '}
        remove
      </button>
        <div className='Note__dates'>
          <div className='Note__dates-modified'>
            Modified
          {' '}
            <span className='Date'>
              {format(date_modified, 'Do MMM YYYY')}
              {content}
            </span>
          </div>
        </div>
      </div>
    )
  }
}
