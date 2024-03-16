import React from "react";
import ReactDOM from "react-dom";
import { DragDropContext } from "react-beautiful-dnd";
import App from "./App";

ReactDOM.render(
  <DragDropContext>
    <App />
  </DragDropContext>,
  document.getElementById("root")
);
