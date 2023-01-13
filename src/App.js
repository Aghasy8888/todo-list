import React, { useEffect } from "react";
import "./App.css";
import ToDo from "./components/pages/toDo/ToDo";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import About from "./components/pages/about/About";
import Contact from "./components/pages/contact/Contact";
import NotFound from "./components/pages/notFound/NotFound";
import NavMenu from "./components/pages/NavMenu/NavMenu";
import SingleTask from "./components/pages/SIngleTask/SingleTask";
import Spinner from "./components/Spinner/Spinner";
import { connect } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

//import Conditional from "./demo/conditional/Conditional";
function App({ loading, successMessage, errorMessage }) {
  useEffect(() => {
    if (successMessage) {
      toast.success(successMessage, {
        position: "bottom-left",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,       
        theme: "light",
      });
    }

    if (errorMessage) {
      toast.error(errorMessage, {
        position: "bottom-left",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,       
        theme: "light",
      });
    }

  }, [successMessage, errorMessage]);

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
      {loading && <Spinner />}
      <ToastContainer />
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    loading: state.loading,
    successMessage: state.successMessage,
    errorMessage: state.errorMessage,
  };
};

export default connect(mapStateToProps)(App);
