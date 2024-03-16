import React, { useState } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import TodoSection from "./TodoSection";

const getItems = (count, offset = 0) =>
  Array.from({ length: count }, (v, k) => k).map((k) => ({
    id: `Project-${k + offset}-${new Date().getTime()}`,
    content: `Project ${k + offset}`,
  }));

const initialData = {
  Todo: getItems(9),
  InProgress: [],
  Review: [],
  Done: [],
};

const QuoteApp = () => {
  const [state, setState] = useState(initialData);
  const [newTodo, setNewTodo] = useState("");

  const onDragEnd = (result) => {
    const { source, destination, draggableId } = result;

    // Dropped outside the list
    if (!destination) return;

    // If dropped in the same list
    if (source.droppableId === destination.droppableId) {
      const updatedItems = reorder(
        state[source.droppableId],
        source.index,
        destination.index
      );
      setState({
        ...state,
        [source.droppableId]: updatedItems,
      });
    } else {
      // If dropped in a different list
      const sourceList = state[source.droppableId];
      const destList = state[destination.droppableId];
      const draggedItem = sourceList.find((item) => item.id === draggableId);

      const updatedSourceItems = [...sourceList];
      updatedSourceItems.splice(source.index, 1);

      const updatedDestItems = [...destList];
      updatedDestItems.splice(destination.index, 0, draggedItem);

      setState({
        ...state,
        [source.droppableId]: updatedSourceItems,
        [destination.droppableId]: updatedDestItems,
      });
    }
  };

  const handleAddTodo = () => {
    if (newTodo.trim() !== "") {
      setState({
        ...state,
        todo: [
          ...state.todo,
          { id: `item-${state.todo.length}`, content: newTodo },
        ],
      });
      setNewTodo("");
    }
  };

  const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    return result;
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="cardarea">
        <div className="innerarea" style={{ display: "flex" }}>
          {Object.keys(state).map((key) => (
            <TodoSection
              key={key}
              title={key}
              items={state[key]}
              droppableId={key}
            />
          ))}
        </div>
        <div className="add">
          <input
            type="text"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            placeholder="Add a Card"
          />
          <button onClick={handleAddTodo}>Add a Card</button>
        </div>
      </div>
    </DragDropContext>
  );
};

export default QuoteApp;
