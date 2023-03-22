import React from "react";

function Navbar(props) {
  const isLoggedIn = props.isLoggedIn;

  return (
    <nav>
      <ul>
        <li><a href="#">Home</a></li>
        <li><a href="#">About</a></li>
        {isLoggedIn && (
          <>
            <li><a href="#">Dashboard</a></li>
            <li><a href="#">Profile</a></li>
            <li><a href="#">Logout</a></li>
          </>
        )}
        {!isLoggedIn && (
          <>
            <li><a href="#">Login</a></li>
            <li><a href="#">Register</a></li>
          </>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;
