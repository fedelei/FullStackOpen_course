require('dotenv').config()
const express = require("express");
const morgan = require("morgan"); 
const app = express();
app.use(express.static('dist'))
app.use(express.json());
app.use(morgan('tiny'));
const Person = require('./models/phonebook')


app.get('/api/phonebook', (request, response) => {
  Person.find({}).then(contact => {
    response.json(contact)
  })
})


const getInfo = async () => {
  try {
    const numContacts = Person.length;

    const currenDate = new Date();
    const dateString = currenDate.toString();

    return {
      numContacts,
      dateString,
    };
  } catch (error) {
    console.log("Error al obtener a informacion del directorio telefonico");
    return null;
  }
};

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/dist/index.html');
});



app.get("/info", async (req, res) => {
  const info = await getInfo();
  if (info) {
    res.send(`
            <div>
                <p>Phonebook has info for ${info.numContacts} people</p>
                <p>${info.dateString}</p>
            </div>
        `);
  } else {
    res.status(500).send("Error obteniendo la información.");
  }
});


app.get("/api/phonebook/:id", (request, response, next) => {
 Person.findById(request.params.id)
 .then(person => {
  if(person){
    response.json(person)
  } else {
    response.status(404).end()
  }
})
 .catch(error => next(error))
});

app.post("/api/phonebook", (request, response) => {
  const { name, number } = request.body;

  if (!name) {
    return response.status(400).json({ error: "Name is required" });
  }

  if (!number) {
    return response.status(400).json({ error: "Number is required" });
  }

  const numberPattern = /^\d{2,3}-\d+$/;
  if (!numberPattern.test(number)) {
    return response.status(400).json({ error: "Number format is invalid. It should be in the format XX-XXXXXXX or XXX-XXXXXXX" });
  }

  Person.findOne({ name })
    .then(existingPerson => {
      if (existingPerson) {
        return response.status(400).json({ error: "Name must be unique" });
      }

      const newContact = new Person({ name, number });
      return newContact.save();
    })
    .then(savedContact => {
      response.json(savedContact);
    })
    .catch(error => {
      console.error("Error al guardar el contacto:", error);
      response.status(500).json({ error: 'Error al guardar el contacto' });
    });
});

app.put('/api/phonebook/:id', (request, response, next) => {
  const { name, number } = request.body;

  const updatedPerson = { name, number };

  Person.findByIdAndUpdate(request.params.id, updatedPerson, { new: true, runValidators: true, context: 'query' })
    .then(updatedContact => {
      if (updatedContact) {
        response.json(updatedContact);
      } else {
        response.status(404).send({ error: 'El contacto no existe' });
      }
    })
    .catch(error => next(error));
});



app.delete('/api/phonebook/:id', (request, response, next) => {
  Person.findByIdAndDelete(request.params.id)
  .then(result => {
    response.status(204).end()
  })
  .catch(error => next(error))
  })

const errorHandler = (error, request, response, next) => {
  console.log(error.message);

  if(error.name === 'CastError'){
    return response.status(400).send({error: 'malformated id'})
  }
  next(error)
}

app.use(errorHandler)

  const PORT = process.env.PORT || 3001
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })