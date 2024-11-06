import React from "react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="flex flex-row gap-4 place-content-evenly bg-black text-white py-2 text-2xl rounded-md hover:bg-gray-600">
      <NavLink to="/" className="hover:bg-red-500 rounded-md scale-y-75">
        Home
      </NavLink>
      <NavLink to="/pastes" className="hover:bg-red-500 rounded-md scale-y-75 ">
        Pastes
      </NavLink>
    </div>
  );
};

export default Navbar;
