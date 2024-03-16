import React from "react";
import TodoList from "./TodoList";
import "./App.css";

const TodoSection = ({ title, items, droppableId }) => (
  <div className="main">
    <div className="listitem">
        <h1>{title}</h1>
      <TodoList items={items} droppableId={droppableId} />
    </div>
  </div>
);

export default TodoSection;
