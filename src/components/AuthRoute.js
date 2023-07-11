import React from 'react';
import { connect } from 'react-redux';
import { Route, Navigate, Outlet } from 'react-router-dom';

function AuthRoute({ path, element: Element, isAuthenticated, type }) {
  if (isAuthenticated && type === 'public') {
    return <Navigate to='/' />;
  }
  if (!isAuthenticated && type === 'private') {
    return <Navigate to='/login' />;
  }
  return <Outlet />;
  // return (
  //   <Route
  //     path={path}
  //     render={(props) => {
        

        
  //     }}
  //   />
  // );
}

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.isAuthenticated,
  };
};

export default connect(mapStateToProps)(AuthRoute);
