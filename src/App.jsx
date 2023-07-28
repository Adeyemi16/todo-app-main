import "./App.css";
import React, { useState, useEffect } from "react";
import { FaMoon } from "react-icons/fa";
import { FaSun } from "react-icons/fa";
import { FaXmark } from "react-icons/fa6";
import { RiCheckboxBlankCircleLine } from "react-icons/ri";
import { RiCheckboxBlankCircleFill } from "react-icons/ri";

// to keep the list when it reloads
const getLocalStorage = () => {
  let list = localStorage.getItem("list");
  if (list) {
    return JSON.parse(localStorage.getItem("list"));
  } else {
    return [];
  }
};
function App() {
  const [dark, setdark] = useState(true);
  const [click, setClick] = useState(false);
  const [name, setName] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [editID, setEditID] = useState(null);
  const [list, setList] = useState(getLocalStorage());

  const handleSubmit = (e) => {
    // i did this to prevent the form from reloading the page
    e.preventDefault();

    if (name === "") {
      // incase the user doesn't write anything
      alert("input required");
    } else if (name && isEditing) {
      // when user is editing the tasks
      setList(
        list.map((item) => {
          if (item.id === editID) {
            return { ...item, title: name };
          }
          return item;
        })
      );
      setName("");
      setEditID(null);
      setIsEditing(false);
      setClick(false);
    } else {
      // to add new task to the list
      const newItem = { id: new Date().getTime().toString(), title: name };

      setList([...list, newItem]);
      setName("");
      setClick(false);
    }
  };

  const removeItem = (id) => {
    // to remove a specific task from the list
    setList(list.filter((item) => item.id !== id));
    setName("");
  };

  const editItem = (id) => {
    // to edit the task
    const specificItem = list.find((item) => item.id === id);
    setIsEditing(true);
    setEditID(id);
    setName(specificItem.title);
  };

  useEffect(() => {
    // to store the list locally after list is updated
    localStorage.setItem("list", JSON.stringify(list));
  }, [list]);

  return (
    <div className={dark ? "body-dark" : "body"}>
      {/* used to change between classes when a button is clicked. */}
      <nav className={dark ? "nav-dark" : "nav-light"}>
        <h3>Todo</h3>
        <i className="toggle" onClick={() => setdark(!dark)}>
          {dark ? (
            <FaMoon color="white" size={30} />
          ) : (
            <FaSun color="white" size={30} />
          )}
        </i>
      </nav>

      <div className="todo">
        <form className={dark ? "form-dark" : "form"} onSubmit={handleSubmit}>
          <button
            onClick={() => setClick(!click)}
            className={dark ? "check-dark" : "check"}
            type="submit"
          >
            {click ? (
              <RiCheckboxBlankCircleFill size={20} />
            ) : (
              <RiCheckboxBlankCircleLine size={20} />
            )}
          </button>
          <input
            type="text"
            value={name}
            className={dark ? "input-dark" : "input"}
            onChange={(e) => setName(e.target.value)}
          />
        </form>

        {list.length > 0 && (
          // this is done so it wont display the tasks when it is empty
          <div className={dark ? "items-dark" : "items"}>
            {list.map((item) => {
              // i am checking the list array with the map
              const { id, title } = item;
              // and here  i am destructuring the contents of the array so i can use it
              return (
                <article className="item" key={id}>
                  <p className="title" onClick={() => editItem(id)}>
                    {title}
                  </p>
                  <button className="delete-btn" onClick={() => removeItem(id)}>
                    {dark ? (
                      <FaXmark size={24} color="white" />
                    ) : (
                      <FaXmark size={24} />
                    )}
                  </button>
                </article>
              );
            })}
            <article className="itemsb">
              <p>{list.length} items left</p>
              <p>click tasks to edit</p>
              {/* to clear the list */}
              <p
                onClick={() => setList([])}
                className={dark ? "clearDark" : "clear"}
              >
                clear all
              </p>
            </article>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
