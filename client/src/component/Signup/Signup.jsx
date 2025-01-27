import React, {useState} from 'react'
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import axios from 'axios'

export default function Signup() {

  const [formData, setFormData] = useState ({
      user_name: "",
      user_password: ""
    })
  

    const handleChange = (event) => {
      const name = event.target.name
      const value = event.target.value
      setFormData ({...formData, [name]: value})
    }
  


  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log (formData)
    const response = await axios.post ("http://localhost:3002/users/", formData)
    console.log (response)

  }

  return (
    <>
    <h1>Sign Up</h1>
    <Form noValidate onSubmit={handleSubmit}>
      <Row className="mb-3">
        <Form.Group as={Col} md="4">
          <Form.Label>Username</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="UserName"
            name="user_name"
            onChange = {handleChange}
          />
        </Form.Group>
      </Row>
      <Row className="mb-3">      
        <Form.Group as={Col} md="4">
          <Form.Label>Password</Form.Label>
          <Form.Control
            required
            type="password"
            placeholder="Password"
            name="user_password"
            onChange = {handleChange}
          />
        </Form.Group>
      </Row>
      
      <Button type="submit">Submit</Button>
    </Form>
  </>
  )
}