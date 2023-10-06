import express from "express";
import { UnorderedBulkOperation } from "mongodb";

const app = express();
app.use(express.json());
const port = 8000;

//Variables
const users = { 
    users_list: [
       { 
          id : 'xyz789',
          name : 'Charlie',
          job: 'Janitor',
       },
       {
          id : 'abc123', 
          name: 'Mac',
          job: 'Bouncer',
       },
       {
          id : 'ppp222', 
          name: 'Mac',
          job: 'Professor',
       }, 
       {
          id: 'ggg123',
          name: 'Dennis',
          job: 'Engineer'
       },
       {
          id: 'yat999', 
          name: 'Dee',
          job: 'Aspring actress',
       },
       {
          id: 'zap555', 
          name: 'Dennis',
          job: 'Bartender',
       }
    ]
}

// Helper Functions
function findUserByNameAndJob(name, job) {
    return users.users_list.filter((user) => user.name == name && user.job == job);
}

function findUserByName(name) {
    return users['users_list'].filter( (user) => user['name'] == name);
}

function findUserById(id) {
    return users.users_list.find( (ele) => ele.id == id);
}

function addUser(user){
    users['users_list'].push(user);
}

// HTTP Operations

// Get
app.get('/users', (req, res) => {
    const name = req.query.name;
    const job = req.query.job;
    if (name != undefined && job != undefined) {
       let result = findUserByNameAndJob(name, job);
       result = {users_list: result};
       res.send(result);
    }
    else if (name != undefined) {
        let result = findUserByName(name);
        result = {users_list: result};
        res.send(result);
    }
    else {
        res.send(users);
    }
});

app.get('/users/:id', (req, res) => {
    const id = req.params['id'];
    let result = findUserById(id);
    if (result === undefined || result.length == 0)
        res.status(404).send('Resource not found.');
    else {
        result = {users_list: result};
        res.send(result);
    }
});

app.get('/', (req, res) => {
    res.send("Go fuck yourself");
});

// Post
app.post('/users', (req, res) => {
    const userToAdd = req.body;
    addUser(userToAdd);
    res.status(200).end();
});

// Delete
app.delete('/users/:id', (req, res) => {
    const id = req.params['id'];
    let idxToRemove = users.users_list.findIndex((ele) => ele.id == id);
    delete users.users_list[idxToRemove];
    res.status(200).end();
});

// Start App
app.listen(port, () => {
    console.log('Example app listening at http://localhost:${port}');
});