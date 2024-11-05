const express = require('express')
const app = express()

let phonebook = 
    [
        { 
          "id": 1,
          "name": "Arto Hellas", 
          "number": "040-123456"
        },
        { 
          "id": 2,
          "name": "Ada Lovelace", 
          "number": "39-44-5323523"
        },
        { 
          "id": 3,
          "name": "Dan Abramov", 
          "number": "12-43-234345"
        },
        { 
          "id": 4,
          "name": "Mary Poppendieck", 
          "number": "39-23-6423122"
        }
    ]


const getInfo = async() => {
    try{
        const numContacts = phonebook.length;
        
        
        const currenDate = new Date();
        const dateString = currenDate.toString();
        
        return {
            numContacts,
            dateString
        }
    } catch(error){
        console.log("Error al obtener a informacion del directorio telefonico");
        return null;    
    }
}

app.get('/info', async (req, res) => {
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


app.get('/api/phonebook', (request, response) => {
  response.json(phonebook)
})



const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})