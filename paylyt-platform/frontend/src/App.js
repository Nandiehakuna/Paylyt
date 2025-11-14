import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import JobsPage from './pages/JobsPage';
import JobDetailPage from './pages/JobDetailPage';
import ContractPage from './pages/ContractPage';
import './App.css';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Switch>
            <Route path="/login" component={LoginPage} />
            <Route path="/register" component={RegisterPage} />
            <Route path="/jobs/:id" component={JobDetailPage} />
            <Route path="/jobs" component={JobsPage} />
            <Route path="/contracts/:id" component={ContractPage} />
            <Route path="/" component={LandingPage} />
          </Switch>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
