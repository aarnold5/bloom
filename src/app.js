import React from "react";
// eslint-disable-next-line no-unused-vars
import {Link, BrowserRouter as Router} from "react-router-dom";
//import {Welcome, About} from "./index";


export default function App() {
    return (
      <div>
        <h1>Bookkeeper!</h1>
        <nav
        style={{
          borderBottom: "solid 1px",
          paddingBottom: "1rem"
        }}
      >
        <Link to="/invoices">Invoices</Link> |{" "}
      </nav>
      </div>
    );
  }

