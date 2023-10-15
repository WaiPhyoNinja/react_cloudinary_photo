
import { BrowserRouter as Router, Link, Route, Routes } from 'react-router-dom';
import './App.css';
import Upload from './pages/Upload';
import Home from './pages/Home';

function App() {
    return (
        <div className="container">
            <Router>
                <nav>
                    <div className="navbar-brand">React Gallery</div>
                    <ul className="navbar-items">
                        <li className="navbar-item">
                            <Link to="/">Gallery</Link>
                        </li>
                        <li className="navbar-item">
                            <Link to="/upload">Upload</Link>
                        </li>
                    </ul>
                </nav>

                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/upload" element={<Upload />} />
                </Routes>
            </Router>
        </div>
    );
}

export default App;
