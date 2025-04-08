import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { vote } from '../reducers/anecdoteReducer'
import { setNotification, clearNotification } from '../reducers/notificationReducer'
import {voteAnecdote} from '../reducers/anecdoteReducer'
export const AnecdoteList = () => {

    const dispatch = useDispatch()
  
    // Obtener las anécdotas y el filtro del estado
    const anecdotes = useSelector(state => state.anecdotes)
    const filter = useSelector(state => state.filter)
  
    // Filtrar anécdotas según el filtro
    const filteredAnecdotes = anecdotes.filter(anecdote =>
      anecdote.content.toLowerCase().includes(filter?.toLowerCase())
    )
  
    const handleVote = (id) => {
      dispatch(voteAnecdote(id))
      const anecdote = anecdotes.find(a => a.id === id)
      if (anecdote) {
        dispatch(setNotification(`You voted '${anecdote.content}'`))
        setTimeout(() => {
          dispatch(clearNotification())
        }, 5000)
      }
    }
    
    
  return (
    <div>
    {filteredAnecdotes
      .slice() // Crear una copia para no mutar el array original
      .sort((a, b) => b.votes - a.votes) // Ordenar de mayor a menor por votos
      .map(anecdote =>
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote.id)}>vote</button>
          </div>
        </div>
      )}
  </div>
  )
}
