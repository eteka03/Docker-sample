
require('dotenv').config()
const express =  require('express')
const cors = require('cors')
const morgan = require('morgan')
const knex = require('knex')
const { response } = require('express')

//database initialization
const db=knex({
    client:'pg',
    connection: {
        host: process.env.POSTGRES_HOST,
        user: process.env.POSTGRES_USER,
        password:process.env.POSTGRES_PASSWORD,
        database:process.env.POSTGRES_DB
    }
})

//app initialization
const app = express()

console.log(process.env.POSTGRES_USER)

//middleware
app.use(express.json())
app.use(cors())
app.use(morgan('combined'))

app.get('/',(req,res)=>{

    db.select('email','hash')
    .from('login')
    .where('email','=',res)
    .then(()=>{
        return res.status(200).json('yes')
    })
    .catch(
        err => res.status(400).json('wrong credentials')
   )
})


app.get('/users',(req,res)=>{

    db.select('*')
    .from('users')
    .then(data =>{
        return res.status(200).json(data)
    })
    .catch(err =>{
        return res.status(500).json({error:err})
    })
})

app.post('/login',(req,res)=>{
    const {nom} = req.body

    db('login')
    .insert({hash:nom,email:nom})
    .returning('*')
    .then(data=>{
            return res.status(200).json(data)
    })
    .catch(err => res.status(400).json({error:err}))
})

app.listen(3000,()=>{
    console.log('app running on port 3000')
})
