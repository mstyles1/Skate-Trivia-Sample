import express from 'express'
import cors from 'cors'
import usersRouts from './Routes/Users.js'
import questionsRouts from './Routes/Questions.js'
import answersRouts from './Routes/Answers.js'
import bodyParser from 'body-parser';


const app = express();
app.use(express.json()); 

app.use(cors({ origin: "http://localhost:3001" }))
app.use(bodyParser.json());  

app.use ('/users', usersRouts);
app.use ('/questions', questionsRouts)
app.use ('/answers', answersRouts)

app.get ('/', (req,res)=> {
  res.send ("The main server Running")
})

const port = process.env.PORT || 3002;

app.listen (port, ()=>{
  console.log ("Server runnning on port", port)
})