import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import UserForm from './Components/UserForm';
import UserList from './Components/UserList';
import UpdateDetails from './Components/UpdateDetails';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<UserForm/>} />
        <Route path="/users" element={<UserList/>} />
        <Route path="/users/:userId" element = {<UpdateDetails />}/>
      </Routes>
    </Router>
  );
};

export default App;