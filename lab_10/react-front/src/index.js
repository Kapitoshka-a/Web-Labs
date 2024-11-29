import React from "react";
import ReactDOM from "react-dom/client"; // Use 'react-dom/client' for React 18+
import App from "./containers/App/App";
import store from './store';
import {Provider} from 'react-redux'
// Create a root for React 18
const root = ReactDOM.createRoot(document.getElementById("root"));


root.render(
    <Provider store={store}><App /> </Provider>
);
