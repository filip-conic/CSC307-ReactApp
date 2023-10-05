import express from "express";

const app = express();
const port = 8000;

const users = { 
    users_list :
    [
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

function findUserByName(name) {
    return users['users_list'].find( (user) => user['name'] == name);
}

app.use(express.json());

app.get('/users', (req, res) => {
    const name = req.query.name;
    if (name != undefined) {
        let result = findUserByName(name);
        result = {users_list: result};
        res.send(result);
    }
    else {
        res.send(users);
    }
});

app.get('/', (req, res) => {
    res.send("Go fuck yourself");
});

app.listen(port, () => {
    console.log('Example app listening at http://localhost:${port}');
});