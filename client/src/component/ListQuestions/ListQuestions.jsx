import React from 'react'
import axios from 'axios'
import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

export default function ListQuestions({user}) {
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState([]);
  const [answer_name, setAnswer_name] = useState ("")

  const handleSubmit = async (event, question_id) => {

    event.preventDefault();
    const response = await axios.post ("http://localhost:3002/questions/", {question_id, user_id:user.user_id, answer_name})
  }

  const handleAnswerChange = (event) => {
    setAnswer_name (event.target.value)
  }

  const fetchQuestion = async () => {
    try {
      const response = await axios.get ("http://localhost:3002/questions/")
      setQuestions (response.data)
    }
    catch (error) {
      console.log (error)
    }
  }

  const fetchAnswer = async (question_id) => {
    try {
      const response = await axios.get (`http://localhost:3002/answers?${question_id}`)
      setAnswers ((prevAnswer)=>({...prevAnswer, [question_id]: response.data}))
      console.log (answers)
    }
    catch (error) {
      console.log (error)
    }
}

  useEffect (()=>{
    fetchQuestion()
  },[])

  return (
    <>
      { questions.map ((question, index)=> {
        return (
          <div key={index}>
            <div style={{"backgroundColor": "#d8d6d6", "padding": "20px"}} >
              <label htmlFor=""><strong>Who Was Thrasher Magazine's Skater of the Year in </strong>{question.name}</label>
            </div>
            <div>
              { answers.map ((answer,index) => {
                return (
                  <>
                    {answers.map ((answer,index) => {
                      <div>{answer.answer_name}</div>
                    })}
                  </>
                )
              })}
            
            </div>

            <div style={{"backgroundColor": "#ffffff", "padding": "20px"}}>
              <h4>{question.question_year}</h4>
              <Form.Control type="text" placeholder="Question Answer" onChange={fetchAnswer} />
              <Button variant="warning" onClick={(event)=>handleSubmit(event, question.question_id)}>Submit</Button>
            </div>
          </div>                   
        )
      })}
    </>
  )
}