import { createSlice } from "@reduxjs/toolkit"
import anecdotes from "../services/anecdotes"

const anecdotesAtStart = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

const initialState = anecdotesAtStart.map(asObject)

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    vote(state, action) {
      const updatedAnecdote = action.payload
      return state.map(anecdote =>
        anecdote.id === updatedAnecdote.id ? updatedAnecdote : anecdote
      )
    },
    addAnecdote(state, action) {
    
      state.push(action.payload)
    },
    appendAnecdote(state, action) {
      state.push(action.payload)
    },
    setAnecdotes(state, action) {
      return action.payload
    }
  }
})

export const { vote, addAnecdote, appendAnecdote, setAnecdotes } = anecdoteSlice.actions

/* Con Redux Thunk, es posible implementar action creators que devuelven
 una función en lugar de un objeto. La función recibe los métodos dispatch y getState del store de Redux como parámetros
En la función interna, es decir, la acción asíncrona, la operación primero obtiene todas las notas del servidor
 y luego despacha la acción setNotes, que las agrega al store.
 */
 export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotesList = await anecdotes.getAll()
    dispatch(setAnecdotes(anecdotesList))
  }
}

export const createAnecdote = content => {
  return async dispatch => {
    const newAnecdote = await anecdotes.createNew(content)
    dispatch(addAnecdote(newAnecdote))
  }
}

export const voteAnecdote = id => {
  return async (dispatch, getState) => {
    // Obtener el estado actual de las anécdotas
    const state = getState()
    const anecdote = state.anecdotes.find(a => a.id === id)

    if (!anecdote) return
    
    // Crear el objeto actualizado con el voto incrementado
    const updatedAnecdote = { ...anecdote, votes: anecdote.votes + 1 }

    // Actualizar el servidor
    await anecdotes.updateVote(id, updatedAnecdote)

    // Despachar la acción con el objeto actualizado
    dispatch(vote(updatedAnecdote))
  }
}

export default anecdoteSlice.reducer