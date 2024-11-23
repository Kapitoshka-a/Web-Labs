import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Establishments from './scripts/Establishments';
import EstablishmentDetail from './scripts/EstablishmentDetail';
import CommentManager from './scripts/CommentSection';
import Home from "./Home";

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Establishments />} />
                <Route path="/home" element={<Home />} />
                <Route path="/establishment/:slug" element={<EstablishmentDetail />} />
                <Route path="/establishment/:slug/comments/:id" element={<CommentManager />} />
            </Routes>
        </Router>
    );
};

export default App;


