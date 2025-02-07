import express from 'express';

const router = express.Router();

const users = [
    {
        name: "John",
        lastname: "Doe",
        age: "25"
    },
    {
        name: "Big",
        lastname: "Bob",
        age: "24"
    }
]

router.get('/', (req, res)=>{
    console.log(users);

    res.json(users);
});

router.post('/', (req,res)=> {
console.log('Post route reached');


users.push(req.body);
res.send(`User with name ${req.body.name} was added`);
});

export default router;