import React from "react";
import { FaMoon } from "react-icons/fa";
import { FaSun } from "react-icons/fa";
import { useGlobalContext } from "../context/context";

const Nav = () => {
  const { dark, setdark } = useGlobalContext();
  return (
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
  );
};

export default Nav;
