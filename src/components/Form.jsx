import React from "react";
import { useGlobalContext } from "../context/context";
import { RiCheckboxBlankCircleLine } from "react-icons/ri";
import { RiCheckboxBlankCircleFill } from "react-icons/ri";

const Form = () => {
  const { dark, click, setClick, name, setName, handleSubmit } =
    useGlobalContext();
  return (
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
  );
};

export default Form;
