import React, { useState } from 'react';
import { Form, Button, Row, Col, Container } from 'react-bootstrap';

const BookingForm = ({ onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    time: '',
    guests: '',
    message: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you can handle form submission, e.g., send data to backend or display a message
    console.log(formData);
    // Reset form fields after submission
    setFormData({
      name: '',
      email: '',
      phone: '',
      date: '',
      time: '',
      guests: '',
      message: '',
    });
    onClose(); // Close the modal after form submission
  };

  const containerStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  };

  return (
    <div>
      
      <Container >
      <div >
        <p style={containerStyle}>Select your preferred party size, date and time from the options below:</p>
        <p style={containerStyle}>Make a Booking</p>
      </div>
      <Row className="justify-content-center">
        <Col xs={12} sm={8} md={6}>
          <Form onSubmit={handleSubmit} className="p-3 border rounded bg-light">
            <Form.Group controlId="formName">
              <Form.Label>Name:</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                size='sm'
              />
            </Form.Group>
            <Form.Group controlId="formDate">
              <Form.Label>Date:</Form.Label>
              <Form.Control
                type="date"
                placeholder="Enter the date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                required
                size='sm'
              />
            </Form.Group>
            <Form.Group controlId="formPersons">
              <Form.Label>Persons:</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter number of persons"
                name="persons"
                value={formData.persons}
                onChange={handleChange}
                required
                size='sm'
              />
            </Form.Group>
            <Button variant="primary" type="submit" block>
              Find a Table
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
    </div>
  );
};

export default BookingForm;
