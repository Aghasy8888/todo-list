import React from 'react';
import { connect } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

function AuthRoute({ isAuthenticated, type }) {
  if (isAuthenticated && type === 'public') {
    return <Navigate to='/' />;
  }
  if (!isAuthenticated && type === 'private') {
    return <Navigate to='/login' />;
  }
  return <Outlet />;
}

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.isAuthenticated,
  };
};

export default connect(mapStateToProps)(AuthRoute);
