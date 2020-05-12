import React, {useState} from 'react';
import './App.css';
import 'materialize-css';
import modules from "./modules";
import Home from "./modules/routes/Home";
import NotFound from "./modules/routes/NotFound";
import { BrowserRouter, Switch, Route} from 'react-router-dom';
import Header from './modules/components/Header';

function App() {

    return (
        <div>
            <BrowserRouter>
                <Switch>
                    {modules.Routes.map(route => (
                        <Route {...route.routeProps} key={route.name}/>
                    ))}
                </Switch>
            </BrowserRouter>
        </div>

    );
}

export default App;
