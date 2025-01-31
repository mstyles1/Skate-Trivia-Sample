import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';

export default function ListQuestions() {
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({}); // Store answers by question_id
  const [flipped, setFlipped] = useState({}); // State to track flipped questions
  const [errorMessage, setErrorMessage] = useState(""); // To store error messages

  
  // State to manage adding a new question
  const [newQuestionYear, setNewQuestionYear] = useState("");

  // State to manage adding a new answer
  const [newAnswer, setNewAnswer] = useState("");
  const [selectedQuestionId, setSelectedQuestionId] = useState(null);

  // Fetch questions from the database
  const fetchQuestions = async () => {
    try {
      const response = await axios.get("http://localhost:3002/questions/");
      setQuestions(response.data); // Set questions in state
    } catch (error) {
      console.error("Error fetching questions:", error);
    }
  };

  // Fetch answers from the database and group by question_id
  const fetchAnswers = async () => {
    try {
      const response = await axios.get("http://localhost:3002/answers");
      const answersByQuestion = {};

      // Organize answers by question_id
      response.data.forEach(answer => {
        if (!answersByQuestion[answer.question_id]) {
          answersByQuestion[answer.question_id] = [];
        }
        answersByQuestion[answer.question_id].push(answer.answer_name);
      });

      console.log("Answers grouped by year:", answersByQuestion);

      setAnswers(answersByQuestion); // Store the answers in the state
    } catch (error) {
      console.error("Error fetching answers:", error);
    }
  };

  // Use effect to load questions and answers
  useEffect(() => {
    fetchQuestions(); // Fetch questions when the component mounts
    fetchAnswers();   // Fetch answers when the component mounts
  }, []);

  // Toggle question answer visibility
  const toggleAnswer = (question_id) => {
    setFlipped(prev => ({
      ...prev,
      [question_id]: !prev[question_id], // Toggle the flipped state for the specific question using question_id
    }));
  };

  // Handle adding a new question
  const handleAddQuestion = async () => {
    try {
        const response = await axios.post("http://localhost:3002/questions", { question_year: newQuestionYear });

        // If the question is added successfully, update the state
        setQuestions(prevQuestions => [
            ...prevQuestions, 
            { question_year: newQuestionYear, question_id: response.data.questionId }
        ]);
        setNewQuestionYear(""); // Reset input field
        setErrorMessage(""); // Clear previous error
    } catch (error) {
        if (error.response && error.response.status === 400) {
            // Handle the case when the year already exists
            setErrorMessage(error.response.data); // Set the error message from the server response
        } else {
            setErrorMessage("An unexpected error occurred. Please try again.");
        }
    }
};

  // Handle adding a new answer
  const handleAddAnswer = async () => {
    if (selectedQuestionId && newAnswer) {
      try {
        await axios.post("http://localhost:3002/answers", { question_id: selectedQuestionId, answer_name: newAnswer });
        setAnswers(prev => ({
          ...prev,
          [selectedQuestionId]: [...(prev[selectedQuestionId] || []), newAnswer]
        }));
        setNewAnswer(""); // Reset input field
      } catch (error) {
        console.error("Error adding answer:", error);
      }
    } else {
      console.error("Please select a question and enter an answer.");
    }
  };

  return (
    <div>
      {/* Display existing questions */}
      <h3>Questions</h3>
      {questions.map((question) => {
        const isFlipped = flipped[question.question_id]; // Check if the question is flipped

        return (
          <div key={question.question_id} style={{ marginBottom: '20px' }}>
            <div style={{ backgroundColor: "#d8d6d6", padding: "20px" }}>
              <label>
                <strong>Who Was Thrasher Magazine's Skater of the Year In </strong>
              </label>
            </div>
            <div style={{ backgroundColor: "#ffffff", padding: "20px" }}>
              <h4>{question.question_year}</h4>
              <Button
                variant="info"
                onClick={() => toggleAnswer(question.question_id)}
              >
                {isFlipped ? 'Hide Answer' : 'Show Answer'}
              </Button>

              {isFlipped && (
                <div style={{ marginTop: '20px' }}>
                  {/* Display the answers if the question is flipped */}
                  <p>
                    Answer: {answers[question.question_id] ? answers[question.question_id].join(', ') : 'No answer available'}
                  </p>
                </div>
              )}
            </div>
          </div>
        );
      })}

      {/* Form to add new question */}
      <div>
        <h4>Add a New Question</h4>
        <input 
          type="number" 
          value={newQuestionYear} 
          onChange={(e) => setNewQuestionYear(e.target.value)} 
          placeholder="Enter Year"
        />
        <button onClick={handleAddQuestion}>Add Question</button>
        {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
      </div>

      {/* Form to add new answer */}
      <div>
        <h4>Add an Answer</h4>
        <select onChange={(e) => setSelectedQuestionId(e.target.value)} value={selectedQuestionId}>
          <option value={null}>Select a question</option>
          {questions.map(question => (
            <option key={question.question_id} value={question.question_id}>
              {question.question_year}
            </option>
          ))}
        </select>
        <input 
          type="text" 
          value={newAnswer} 
          onChange={(e) => setNewAnswer(e.target.value)} 
          placeholder="Enter Answer"
        />
        <button onClick={handleAddAnswer}>Add Answer</button>
      </div>
    </div>
  );
}