import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Landing from './Components/Landing/Landing';
import Market from './Components/Market/Market';
import About from './Components/About/About';
import Contact from './Components/Contact/Contact';
import ProductPage from './Components/ProductPage/ProductPage';
import Cart from './Components/Cart/Cart';
import ReviewOrder from './Components/ReviewOrder/ReviewOrder';
import ThankYou from './Components/ThankYou/ThankYou';

import { Provider } from 'react-redux';
import store from './redux/store';

import registerServiceWorker from './registerServiceWorker';

import { BrowserRouter, Route, Switch } from 'react-router-dom';

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <div>
                <Switch>
                    <Route path='/' exact component={Landing} />
                    <Route exact path='/market' component={Market} />
                    <Route path='/market/:productID' component={ProductPage} />
                    <Route path='/about' component={About} />
                    <Route path='/contact' component={Contact} />
                    <Route path='/cart' component={Cart} />
                    <Route path='/revieworder' component={ReviewOrder} />
                    <Route path='/thankyou' component={ThankYou} />
                </Switch>
            </div>
        </BrowserRouter>
    </Provider>
    , document.getElementById('root'));
registerServiceWorker();
