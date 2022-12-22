import React from "react";
import "./App.css";
import ToDo from "./components/pages/toDo/ToDo";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import About from "./components/pages/about/About";
import Contact from "./components/pages/contact/Contact";
import NotFound from "./components/pages/notFound/NotFound";
import NavMenu from "./components/pages/NavMenu/NavMenu";
import SingleTask from "./components/pages/SIngleTask/SingleTask";

//import Conditional from "./demo/conditional/Conditional";
function App() {
  return (
    <div className="App">
      {/*<ToDo />*/}
      <BrowserRouter>
        <NavMenu />
        <Routes>
          <Route path="/" element={<ToDo />} />
          <Route path="/home" element={<ToDo />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/not-found" element={<NotFound />} />
          <Route path="/task/:taskId" element={<SingleTask />} />
          <Route path="*" element={<Navigate to="/not-found" replace />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
