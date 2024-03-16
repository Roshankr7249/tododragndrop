import { faBars, faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import React, { useState } from "react";
import { Draggable, Droppable } from "react-beautiful-dnd";

import "./App.css";

const grid = 8;

const getRandomColor = () => {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

const getItemStyle = (isDragging, draggableStyle) => ({
  userSelect: "none",
  padding: grid * 2,
  margin: `0 0 ${grid}px 0`,
  background: isDragging ? "white" : "white",

  ...draggableStyle,
});

const getListStyle = (isDraggingOver) => ({
  background: isDraggingOver ? "white" : "white",
  padding: grid,
  gap: "10px",
  //   backgroundColor: "lightgrey",
  width: 250,
});

const TodoList = ({ items, droppableId }) => (
  <Droppable droppableId={droppableId}>
    {(provided, snapshot) => (
      <div
        ref={provided.innerRef}
        style={getListStyle(snapshot.isDraggingOver)}
        {...provided.droppableProps}
      >
        {/* <MoreHorizontal/> */}
        {items.map((item, index) => (
          <Draggable key={item.id} draggableId={item.id} index={index}>
            {(provided, snapshot) => (
              <div className="header">
                <div
                  ref={provided.innerRef}
                  {...provided.draggableProps}
                  {...provided.dragHandleProps}
                  style={getItemStyle(
                    snapshot.isDragging,
                    provided.draggableProps.style
                  )}
                  className="todo-item"
                >
                  <div className="todo-content">
                    <div className="line" style={{ color: getRandomColor() }}>
                      -
                    </div>
                    {item.content}
                    <div className="icons">
                      <FontAwesomeIcon
                        icon={faBars}
                        className="hamburger-icon"
                      />
                      <FontAwesomeIcon
                        icon={faEnvelope}
                        className="message-icon"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}
          </Draggable>
        ))}
        {provided.placeholder}
      </div>
    )}
  </Droppable>
);

export default TodoList;
