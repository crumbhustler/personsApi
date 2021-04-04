//Following tutorial from 
//https://fullstackopen.com/en/part3/node_js_and_express

const { response } = require('express')
const express = require('express')
const app = express()

app.use(express.json())

let persons = [{
        id: 1,
        name: "Big John",
        number: "555-555-5555",
    },
    {
        id: 2,
        name: "Little John",
        number: "555-555-5555",
    },
    {
        id: 3,
        name: "Medium John",
        number: "555-555-5555",
    }

]
app.get('/', (request, response) => {
    response.send('<h1>Hello World!</h1>')
})

app.get('/api/persons', (request, response) => {
    response.json(persons)
})

app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const person = persons.find(person => person.id === id)

    if (person) {
        response.json(person)
    } else {
        response.status(404).end()
    }
})

app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    persons = persons.filter(person => person.id !== id)

    response.status(204).end()
})

const generateId = () => {
    const maxId = persons.length > 0 ?
        Math.max(...persons.map(n => n.id)) :
        0
    return maxId + 1
}

app.post('/api/persons', (request, response) => {
    const body = request.body

    if (!body.content) {
        return response.status(400).json({
            error: 'content missing'
        })
    }

    const person = {
        content: body.content,
        important: body.important || false,
        date: new Date(),
        id: generateId(),
    }

    persons = persons.concat(person)

    response.json(person)
})

const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})