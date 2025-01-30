import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';

export default function ListQuestions() {
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({}); // Store answers by question_id
  const [flipped, setFlipped] = useState({}); // State to track flipped questions

  // Fetch questions from the database
  const fetchQuestions = async () => {
    try {
      const response = await axios.get("http://localhost:3002/questions/");
      setQuestions(response.data); // Set questions in state
    } catch (error) {
      console.error("Error fetching questions:", error);
    }
  };

  const fetchAnswers = async () => {
    try {
      const response = await axios.get("http://localhost:3002/answers");
      setAnswers(response.data); // Store the fetched answers
    } catch (error) {
      console.error("Error fetching answers:", error);
    }
  };

  // Use effect to load questions and answers
  useEffect(() => {
    fetchQuestions(); // Fetch questions when the component mounts
    fetchAnswers();   // Fetch answers when the component mounts
  }, []);

  // Toggle answer visibility
  const toggleAnswer = (question_id) => {
    setFlipped(prev => ({
      ...prev,
      [question_id]: !prev[question_id], // Toggle the flipped state for the specific question
    }));
  };

  return (
    <>
      {questions.map((question, index) => {
        const isFlipped = flipped[question.question_id]; // Check if the question is flipped

        return (
          <div key={index}>
            <div style={{ backgroundColor: "#d8d6d6", padding: "20px" }}>
              <label>
                <strong>Who Was Thrasher Magazine's Skater of the Year In </strong>
              </label>
            </div>
            <div style={{ backgroundColor: "#ffffff", padding: "20px" }}>
              <h4>{question.question_year}</h4>
              <Button 
                variant="info"
                onClick={() => toggleAnswer(question.question_id)} // Toggle the visibility
              >
                {isFlipped ? 'Hide Answer' : 'Show Answer'}
              </Button>

              {isFlipped && (
                <div style={{ marginTop: '20px' }}>
                  {/* Display the answers if the question is flipped */}
                  <p>
                    Answers: {answers[question.question_id] ? answers[question.question_id].join(', ') : 'No answer available'}
                  </p>
                </div>
              )}
            </div>
          </div>
        );
      })}
    </>
  );
}