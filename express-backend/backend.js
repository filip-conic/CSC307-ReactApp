import express from "express";
import cors from 'cors';
import ShortUniqueId from "short-unique-id";

const app = express();
app.use(express.json());
app.use(cors());
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
    res.send("Basic Get");
});

// Post
app.post('/users', (req, res) => {
    let userToAdd = req.body;
    const uid = new ShortUniqueId({ length: 6 });
    userToAdd.id = uid.rnd();
    addUser(userToAdd);
    res.status(201).end(JSON.stringify(userToAdd));
});

// Delete
app.delete('/users', (req, res) => {
    const id = req.params['id'];
    let idxToRemove = users.users_list.findIndex((ele) => ele.id == id);
    delete users.users_list.splice(idxToRemove, 1);
    res.status(204).end();
});

// Start App
app.listen(port, () => {
    console.log('Example app listening at http://localhost:${port}');
});