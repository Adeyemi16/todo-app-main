import React, { useState, useContext, useEffect } from "react";

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const getLocalStorage = () => {
    let list = localStorage.getItem("list");
    if (list) {
      return JSON.parse(localStorage.getItem("list"));
    } else {
      return [];
    }
  };

  const getLocalStorageDarkMode = () => {
    let dark = localStorage.getItem("dark");
    if (dark) {
      return JSON.parse(localStorage.getItem("dark"));
    } else {
      setdark(true);
    }
  };

  const [dark, setdark] = useState(getLocalStorageDarkMode);
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
    localStorage.setItem("dark", JSON.stringify(dark));
  }, [list, dark]);

  return (
    <AppContext.Provider
      value={{
        handleSubmit,
        removeItem,
        editItem,
        dark,
        setdark,
        click,
        setClick,
        name,
        setName,
        isEditing,
        setIsEditing,
        editID,
        setEditID,
        list,
        setList,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };
