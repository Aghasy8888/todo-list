import React, { useEffect } from "react";
import { connect } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import { BrowserRouter, Routes, Navigate, Route } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import ToDo from "./components/pages/toDo/ToDo";
import About from "./components/pages/about/About";
import Contact from "./components/pages/contact/Contact";
import NotFound from "./components/pages/notFound/NotFound";
import NavMenu from "./components/pages/NavMenu/NavMenu";
import SingleTask from "./components/pages/SIngleTask/SingleTask";
import Spinner from "./components/Spinner/Spinner";
import Register from "./components/pages/Register/Register";
import Login from "./components/pages/Login/Login";
import AuthRoute from "./components/AuthRoute";

const toastProps = {
  position: "bottom-left",
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  theme: "light",
};

function App({ loading, successMessage, errorMessage }) {
  useEffect(() => {
    if (successMessage) {
      toast.success(successMessage, toastProps);
    }

    if (errorMessage) {
      toast.error(errorMessage, toastProps);
    }
  }, [successMessage, errorMessage]);

  return (
    <div className="App">
      {/* <Route path="/task/:taskId" element={<SingleTask />} />*/}
      {/*try to enter this page without loggin' in*/}
            <BrowserRouter>
        <NavMenu />
        <Routes>
        <Route path="/" element={<AuthRoute type="private" />} >
          <Route path="/" element={<ToDo />} />
          <Route path="/home" element={<ToDo />}/>
          <Route path="/task/:taskId" element={<SingleTask />} /> 
        </Route>

      <Route element={<AuthRoute type="public" />} >
      <Route path="/register" element={<Register />}/>
      <Route path="/login" element={<Login />} />
      </Route>

        

          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/not-found" element={<NotFound />} />        
          
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
