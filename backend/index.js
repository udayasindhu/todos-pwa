const express = require('express');
const cors = require('cors');
const Database = require('./storage/db');
const adminData = require('./data.json');

const todoCol = async () => {
    const db = await Database.get();
    return db.todos;
};

const app = express();
app.use(express.json());
app.use(cors());

app.post('/api/myTodos', async (req, res) => {
    const { user: username } = req.query;
    const { name, status } = req.body;
    if (!username || !name) {
        return res.status(400).json({ message: 'Invalid request!' });
    }
    const todoCollection = await todoCol();
    const userDetails = await todoCollection.findOne(username).exec();
    const todos = userDetails ? userDetails.todos : null;
    const newTodo = { name, status };
    let dataAdded = false;
    const updatedTodos = todos ? todos.map(todo => {
        if (todo.name === name) {
            dataAdded = true;
            return { ...todo, status };
        }
        return todo;
    }) : [];
    if (!dataAdded) {
        updatedTodos.push(newTodo);
    }
    const result = await todoCollection.upsert({
        username: username,
        todos: updatedTodos
    });
    res.status(201).json(result.todos);
});

app.get('/api/myTodos', async (req, res) => {
    const { user: username } = req.query;
    if (!username) {
        return res.status(400).json({ message: 'Invalid Username!' });
    }
    const todoCollection = await todoCol();
    const userDetails = await todoCollection.findOne(username).exec();
    if (!userDetails) {
        const result = await todoCollection.insert({
            username: username,
            todos: []
        });
        return res.status(201).json(result.todos);
    }
    return res.status(200).json(userDetails.todos);
});

app.listen(3000, async () => {
    const todoCollection = await todoCol();
    await todoCollection.insert({
        username: 'admin',
        todos: adminData
    });
    console.log('Server started at port 3000!');
});