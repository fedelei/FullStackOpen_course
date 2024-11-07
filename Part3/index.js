const express = require("express");
const morgan = require("morgan"); 
const app = express();
app.use(express.json());
app.use(morgan('tiny'));

let phonebook = [
  {
    id: 1,
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: 2,
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: 3,
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: 4,
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];

const getInfo = async () => {
  try {
    const numContacts = phonebook.length;

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

app.get("/api/phonebook", (request, response) => {
  response.json(phonebook);
});

app.get("/api/phonebook/:id", (request, response) => {
  const id = Number(request.params.id);
  const persons = phonebook.find((person) => person.id === id);
  if(persons){
      console.log(persons);
      response.json(persons);
    
  } else {
    response.status(404).end()
  }
  
});

app.post("/api/phonebook", (request, response) => {
    console.log("Request Body:", request.body);
    const {name, number} = request.body;
    console.log(name);
    
   
    
    if (!name || !number) {
        return response.status(400).send({error: "Name or number is missing"});
    } else if(phonebook.find(contact => contact.name === name )){
        return response.status(400).send({ error: 'name must be unique' })
    }
    const newContact = {
        id: Math.random(), 
        name,
        number
    };
    phonebook.push(newContact);
    response.json(newContact)
  
})

app.delete('/api/phonebook/:id', (request, response) => {
    const id = Number(request.params.id)
    notes = phonebook.filter(person => person.id !== id)
  
    response.status(204).end()
  })


  const PORT = process.env.PORT || 3001
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })