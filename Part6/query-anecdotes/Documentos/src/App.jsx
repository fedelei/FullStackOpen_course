import { useQuery, useMutation, useQueryClient} from '@tanstack/react-query'
import { getAnecdotes, updateAnecdote} from './requests'
import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { useReducer } from 'react'
import {AnecdoteContext, notificationReducer} from './components/AnecdoteContext'

const App = () => {
  const [notification, notificationDispatch] = useReducer(notificationReducer, '')
  console.log(notification);
  
  const queryClient = useQueryClient()
  /**
   * La función useQuery se utiliza para obtener datos de una API y manejar el estado de carga, error y datos. 
   * En este caso, se está utilizando para obtener la lista de anécdotas desde la API.
   */

  const updateAnecdoteMutation = useMutation({
    mutationFn: updateAnecdote,
    /**
     * onMutate:
          Se ejecuta antes de que la mutación se envíe al servidor.
          Cancela cualquier query en curso para evitar conflictos.
          Guarda el estado anterior (previousAnecdotes) para restaurarlo en caso de error.
          Actualiza el estado local de las anécdotas para reflejar inmediatamente el cambio.
     */
    onMutate: async (updatedAnecdote) => {
      await queryClient.cancelQueries({ queryKey: ['anecdotes'] })
  
      const previousAnecdotes = queryClient.getQueryData(['anecdotes'])
  
      queryClient.setQueryData(['anecdotes'], (old) =>
        old.map((anecdote) =>
          anecdote.id === updatedAnecdote.id
            ? { ...anecdote, votes: updatedAnecdote.votes }
            : anecdote
        )
      )
  
      return { previousAnecdotes }
    },
    // Maneja posibles errores:
    onError: (error, updatedAnecdote, context) => {
      queryClient.setQueryData(['anecdotes'], context.previousAnecdotes)
  
    },
    /* 
    * onSettled:Una vez que la mutación se completa (con éxito o error), invalida la query para asegurarse de que los datos estén sincronizados con el servidor.
    */
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['anecdotes'] })
    },
  })
 

  const result = useQuery({
    queryKey: ['anecdotes'],
    queryFn: getAnecdotes
  })
  console.log(JSON.parse(JSON.stringify(result)));

  if (result.isLoading) {
    return <div>loading data...</div>
  }

  const anecdotes = result.data
  
  const handleVote = (anecdote) => {
    updateAnecdoteMutation.mutate({ ...anecdote, votes: anecdote.votes + 1 })
    notificationDispatch({
      type: 'SET_NOTIFICATION',
      payload: `You voted for "${anecdote.content}"`,
    })
    setTimeout(() => {
      notificationDispatch({ type: 'CLEAR_NOTIFICATION' })
    }, 5000)
  }

  return (
    <AnecdoteContext.Provider value={[notification, notificationDispatch]}>
    <div>
      <h3>Anecdote app</h3>
    
      <Notification />
      <AnecdoteForm />
    
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
              has {anecdote.votes}
              <button onClick={() => handleVote(anecdote)}>vote</button>
            </div>
          
        </div>
      )}
    </div>
    </AnecdoteContext.Provider>
  )
}

export default App
