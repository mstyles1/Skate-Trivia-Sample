import express from 'express'
import cors from 'cors'
import signupRouts from './Routes/Signup.js'
import questionsRouts from './Routes/Questions.js'
import answersRouts from './Routes/Answers.js'

const app = express();
app.use(express.json()); 


app.use ('/signup', signupRouts)
app.use ('/questions', questionsRouts)
app.use ('/answers', answersRouts)

app.get ('/', (req,res)=> {
  res.send ("The main server Running")
})

const port = process.env.PORT || 3002;

app.listen (port, ()=>{
  console.log ("Server runnning on port", port)
})