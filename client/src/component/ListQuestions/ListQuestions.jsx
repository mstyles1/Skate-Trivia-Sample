import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

export default function ListQuestions({ user }) {
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState([]);
  const [question_year, setQuestionYear] = useState("");

  // Function to fetch questions
  const fetchQuestions = async () => {
    try {
      const response = await axios.get("http://localhost:3002/questions/");
      setQuestions(response.data); // Set questions array in state
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchQuestions(); // Fetch questions when component mounts
  }, []);

  // Function to handle form submit
  const handleSubmit = async (event, question_id) => {
    event.preventDefault();

    // Make sure question_id is available
    if (!question_id) {
      console.error("question_id is missing");
      return;
    }

    // Send the request to submit the answer
    try {
      const response = await axios.post("http://localhost:3002/answers/", {
        question_id,
        question_year,
      });
      console.log("Answer submitted successfully:", response.data);
    } catch (error) {
      console.error("Error submitting answer:", error);
    }
  };

  // Handle answer change (year for this example)
  const handleAnswerChange = (event) => {
    setQuestionYear(event.target.value); // Update the year as the answer
  };

  return (
    <>
      {questions.map((questions, index) => {
        return (
          <div key={index}>
            <div style={{ backgroundColor: "#d8d6d6", padding: "20px" }}>
              <label>
                <strong>Who Was Thrasher Magazine's Skater of the Year in </strong>
                {questions.question_year}
              </label>
            </div>
            <div>
              <div>
                {answers.map((answer, index) => (
                  <div key={index}>{answer.answer_name}</div>
                ))}
              </div>
            </div>

            <div style={{ backgroundColor: "#ffffff", padding: "20px" }}>
              <h4>{questions.question_year}</h4>
              <Form.Control
                type="text"
                placeholder="Question Answer"
                onChange={handleAnswerChange}
              />
              <Button
              variant="warning"
              onClick={(event) => {
                console.log("Question object:", questions); // Log the question object to check its structure
                handleSubmit(event, questions.question_id);  // Ensure question_id is passed
              }}>
              Submit
              </Button>
            </div>
          </div>
        );
      })}
    </>
  );
}