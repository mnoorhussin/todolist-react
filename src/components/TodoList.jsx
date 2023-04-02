import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../App.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faEdit, faSave } from "@fortawesome/free-solid-svg-icons";
import { Container, Row, Col, Form, Button, ListGroup } from "react-bootstrap";

function ToDoList() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");
  const [editingIndex, setEditingIndex] = useState(null);
  const [editingValue, setEditingValue] = useState("");

  const handleEditStart = (index) => {
    setEditingIndex(index);
    setEditingValue(todos[index]);
  };

  const handleEditChange = (event) => {
    setEditingValue(event.target.value);
  };

  const handleEditSave = (index) => {
    const newTodos = [...todos];
    newTodos[index] = editingValue;
    setTodos(newTodos);
    setEditingIndex(null);
    setEditingValue("");
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!newTodo) return; // Don't add an empty todo
    setTodos([...todos, newTodo]);
    setNewTodo("");
  };

  const handleDelete = (todoIndex) => {
    const updatedTodos = todos.filter((_, index) => index !== todoIndex);
    setTodos(updatedTodos);
  };

  return (
    <Container>
      <Row className="justify-content-center mt-5">
        <Col md={8}>
          <h1 className="mb-4">To-Do List</h1>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="newTodo">
              <Form.Control
                type="text"
                placeholder="Enter a new todo"
                value={newTodo}
                onChange={(event) => setNewTodo(event.target.value)}
              />
            </Form.Group>
            <Button
              className="my-2"
              variant="primary"
              type="submit"
              disabled={!newTodo}>
              Add
            </Button>
          </Form>
          <ListGroup className="mt-4">
            {todos.map((todo, index) => (
              <ListGroup.Item key={index}>
                {editingIndex === index ? (
                  <Form.Control
                    type="text"
                    value={editingValue}
                    onChange={handleEditChange}
                    onBlur={() => handleEditSave(index)}
                    autoFocus
                  />
                ) : (
                  <span>{todo}</span>
                )}
                <FontAwesomeIcon
                  className="mx-2 text-primary edit-icon"
                  icon={editingIndex === index ? faSave : faEdit}
                  onClick={() =>
                    editingIndex === index
                      ? handleEditSave(index)
                      : handleEditStart(index)
                  }
                />
                <FontAwesomeIcon
                  className="text-danger delete-icon"
                  icon={faTrash}
                  onClick={() => handleDelete(index)}
                />
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Col>
      </Row>
    </Container>
  );
}

export default ToDoList;
