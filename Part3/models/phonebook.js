const mongoose = require('mongoose')

mongoose.set('strictQuery', false)


const url = process.env.MONGO_URI


console.log('connecting to', url)

mongoose.connect(url)

  .then(result => {
    console.log('connected to MongoDB')
  })
  .catch(error => {
    console.log('error connecting to MongoDB:', error.message)
  })

const personSchema = new mongoose.Schema({
  name: { type: String, required: [true, "El nombre es obligatorio"],  minLength: [3, "El nombre debe tener al menos 3 caracteres"] },
  number: { type: String, required: [true, "El numero es obligatorio"], validate:{
    validator: function(v){
      return /^\d{2,3}-\d{5,}$/.test(v);
    },
    message: props => `${props.value} no es un número de teléfono válido. Debe tener el formato XX-XXXXXXX o XXX-XXXXXXXX.`
  }
 },
})


personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__vs
  }
})


module.exports = mongoose.model('Person', personSchema)