import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';

export default function ListQuestions({ user }) {
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [flipped, setFlipped] = useState({}); // State to track flipped questions

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

  // Function to toggle question visibility
  const toggleAnswer = (question_id) => {
    setFlipped((prev) => ({
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
                  {/* Display the answer if the question is flipped */}
                  <p>
                    Answer: {answers[question.question_id] || 'No answer available'}
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