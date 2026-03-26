import { Routes, Route, Navigate } from 'react-router-dom';
import './App.css';

import Login from './components/Login';
import Signup from './components/Signup';
import Home from './components/Home';
import Execute from './components/Execute';
import Projects from './components/Projects';

const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  return token ? children : <Navigate to="/login" />;
};

function App() {
  return (
    <div className="h-screen w-screen bg-[#1e1e1e] text-white">
      <Routes>

        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        <Route
          path="/execute"
          element={
            <PrivateRoute>
              <Execute />
            </PrivateRoute>
          }
        />

        <Route
          path="/myProjects"
          element={
            <PrivateRoute>
              <Projects />
            </PrivateRoute>
          }
        />

        <Route path="*" element={<h1>404 Not Found</h1>} />

      </Routes>
    </div>
  );
}

export default App;