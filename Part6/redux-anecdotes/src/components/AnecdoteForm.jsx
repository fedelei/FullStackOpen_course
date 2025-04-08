import React from 'react'
import { useDispatch } from 'react-redux'
import {createAnecdote} from '../reducers/anecdoteReducer'
import { setNotificationWithTimeout } from '../reducers/notificationReducer'


export const AnecdoteForm = () => {
    const dispatch = useDispatch()
    
    const handleCreateAnecdote = (event) => {
        event.preventDefault()
        const content = event.target.anecdote.value
        if(!content) {
            return alert('anecdote is required')
        }
        event.target.anecdote.value = ''
        dispatch(createAnecdote(content))
        dispatch(setNotificationWithTimeout(`You created '${content}'`, 10000))
    }
  return (
    <div>
         <h2>create new</h2>
      <form onSubmit={handleCreateAnecdote}>
        <div><input name='anecdote' /></div>
        <button type='submit' >create</button>
      </form>
    </div>
  )
}
