import axios from 'axios'
const baseUrl = 'http://localhost:3001/persons'

const getAll = () =>  axios.get(baseUrl)


const create = newObject => axios.post(baseUrl, newObject)


const update = (id, updatedPerson) => axios.put(`${baseUrl}/${id}`, updatedPerson)


const suprimir = (id) =>  axios.delete(`${baseUrl}/${id}`)


export default { 
  getAll: getAll, 
  create: create, 
  update: update, 
  suprimir: suprimir
}