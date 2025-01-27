import React, { useState}  from 'react'
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import axios from 'axios'

export default function Login({user, setUser}) {
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
    event.preventDefault()
    try {
      const response = await axios.get ("http://localhost:3002/users/",{
      params: {
        user_name: formData.user_name,
        user_password: formData.user_password,
      },})

      
      if ( response.data.length > 0 ) {        
        setUser((prevUser) => {
          const DBuser = response.data[0]
          const updatedUser = { ...prevUser, user_id: DBuser.user_id , user_name: DBuser.user_name};
          return updatedUser;
        });
      }
    }
    catch (error) {
    }
  }

  return (
   <>
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