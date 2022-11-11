import './App.css';
import { Routes, Route, useNavigate } from 'react-router-dom';

import Home from './container/Home';
import Login from './components/Login';
import { GoogleOAuthProvider } from '@react-oauth/google';


function App() {
    return (
        <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_API_TOKEN}>
            <div className="App">
                <Routes>
                    <Route path="login" element={<Login />} />
                    <Route path="/*" element={<Home />} />
                </Routes>
            </div>
        </GoogleOAuthProvider>
    );
}

export default App;
