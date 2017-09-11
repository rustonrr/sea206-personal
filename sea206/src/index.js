import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Landing from './Components/Landing/Landing';
import Market from './Components/Market/Market';
import About from './Components/About/About';
import Contact from './Components/Contact/Contact';
import ProductPage from './Components/ProductPage/ProductPage';

import registerServiceWorker from './registerServiceWorker';

import { BrowserRouter, Route, Switch } from 'react-router-dom';

ReactDOM.render(
    <BrowserRouter>
        <div>
            <Switch>
                <Route path='/' exact component={Landing} />
                <Route exact path='/market' component={Market} />
                <Route path='/market/:productID' component={ProductPage} />
                <Route path='/about' component={About} />
                <Route path='/contact' component={Contact} />
            </Switch>
        </div>
    </BrowserRouter>
    , document.getElementById('root'));
registerServiceWorker();
