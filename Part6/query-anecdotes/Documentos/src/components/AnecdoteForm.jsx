import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createAnecdote } from '../requests'
import { useContext } from 'react'
import { AnecdoteContext } from './AnecdoteContext'

const AnecdoteForm = () => {
  const [_, notificationDispatch] = useContext(AnecdoteContext)
  const queryClient = useQueryClient()

  const newAnecdoteMutation = useMutation({ 
    mutationFn: createAnecdote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey:['anecdotes'] })
      /**
       * OnSucces: Esto hace que React Query actualice automáticamente la query con la clave notes, es decir que obtiene nuevamente las notas del servidor. Como resultado, la aplicación renderiza el estado actualizado en el servidor, por lo que la nota agregada también se renderiza.
       */
      notificationDispatch({
        type: 'SET_NOTIFICATION',
        payload: 'Anecdote added successfully!',
      })
      setTimeout(() => {
        notificationDispatch({ type: 'CLEAR_NOTIFICATION' })
      }, 5000)
    },
    onError: (error) => {
      // Maneja el error y muestra el mensaje del servidor
      notificationDispatch({
        type: 'SET_NOTIFICATION',
        payload: error.response.data.error || 'An error occurred',
      })
      setTimeout(() => {
        notificationDispatch({ type: 'CLEAR_NOTIFICATION' })
      }, 5000)
    }
  })
  const id = Math.floor(Math.random() * 1000000)
  
  const addAnecdote = async (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    newAnecdoteMutation.mutate({ content, id, votes: 0 })
    notificationDispatch({
      type: 'SET_NOTIFICATION',
      payload: `You created "${content}"`,
    })
    setTimeout(() => {
      notificationDispatch({ type: 'CLEAR_NOTIFICATION' })
    }, 5000)
  }


  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={addAnecdote}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
