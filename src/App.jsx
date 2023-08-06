import "./App.css";
import React from "react";
import { useGlobalContext } from "./context/context";
import Form from "./components/Form";
import Function from "./components/Function";
import Nav from "./components/Nav";

function App() {
  const { dark, list } = useGlobalContext();

  return (
    <div className={dark ? "body-dark" : "body"}>
      <Nav />
      {/* nav */}

      <div className="todo">
        <Form />
        {/* form */}

        {list.length > 0 && <Function />}
      </div>
    </div>
  );
}

export default App;
