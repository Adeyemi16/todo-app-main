import React from "react";
import { useGlobalContext } from "../context/context";
import { FaXmark } from "react-icons/fa6";

const Function = () => {
  const { list, editItem, removeItem, dark, setList } = useGlobalContext();
  return (
    <div className={dark ? "items-dark" : "items"}>
      {list.map((item) => {
        //checking the list array with the map
        const { id, title } = item;
        //destructuring the contents of the array so i can use it
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
          // todo
        );
      })}

      <article className="itemsb">
        <p>{list.length} items left</p>
        <p>click tasks to edit</p>
        {/* to clear the list */}
        <p onClick={() => setList([])} className={dark ? "clearDark" : "clear"}>
          clear all
        </p>
      </article>
      {/* clear */}
    </div>
  );
};

export default Function;
