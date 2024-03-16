import React from "react";
import TodoList from "./TodoList";
import "./App.css";

const TodoSection = ({ title, items, droppableId }) => (
  <div className="main">
    <div className="listitem">
      <div className="menuhead">
        <h1>{title}</h1>
        <p className="menu">...</p>
      </div>
      <TodoList items={items} droppableId={droppableId} />
    </div>
  </div>
);

export default TodoSection;
