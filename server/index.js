import express from 'express';
import usersRouts from './Routes/Users.js'
import questionsRouts from './Routes/Questions.js'
import answersRouts from './Routes/Answers.js'
import cors from 'cors'

const app = express();

app.use (cors({ origin: "http://localhost:3001"}))

app.use ('/users', usersRouts)
app.use ('/questions', questionsRouts)
app.use ('/answers', answersRouts)

app.get ('/', (req, res ) => {
    res.send('This is Main Page')
})

app.listen('3002', ()=> {
    console.log('Server is running on port 3002');
})