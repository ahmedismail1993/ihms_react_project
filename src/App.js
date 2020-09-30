import React from 'react';
import axiosInstance from './axiosConfig/index';
import Routes from './routes/index';
import { connect } from 'react-redux';
import { setServerErrors, clearServerErrors } from './actions/errors';
import cookie from 'js-cookie';
function App({ setServerErrors, clearServerErrors }) {
  axiosInstance.interceptors.request.use((config) => {
    config.headers.common['X-locale'] = cookie.get('locale') || 'ar';
    return config;
  });
  axiosInstance.interceptors.response.use(
    (res) => {
      clearServerErrors();
      return res;
    },
    (err) => {
      if (err && err.response.data.errors) {
        setServerErrors(err.response.data.errors);
      }
    }
  );
  return (
    <div className="App">
      <Routes />
    </div>
  );
}

export default connect(null, { setServerErrors, clearServerErrors })(App);
