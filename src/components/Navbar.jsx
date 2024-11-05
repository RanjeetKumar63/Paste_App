import React from "react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="flex flex-row gap-4 place-content-evenly bg-black text-white py-2 text-2xl rounded-md">
      <NavLink to="/">Home</NavLink>
      <NavLink to="/pastes">Pastes</NavLink>
    </div>
  );
};

export default Navbar;
