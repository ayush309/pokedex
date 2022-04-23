import React from "react";
import "./style.css";

function Navbar() {
  const refreshPage = () => {
    window.location.reload();
  };

  return (
    <>
      <div onClick={refreshPage} className="Navbar">
        AYUSH POKEDEX
      </div>
      {/* <div className="Navbar2">Home</div> */}
    </>
  );
}

export default Navbar;
