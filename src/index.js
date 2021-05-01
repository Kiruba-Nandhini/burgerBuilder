import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from "./registerServiceWorker"
import {BrowserRouter} from 'react-router-dom'
import {Provider} from 'react-redux'
import {createStore,applyMiddleware,compose,combineReducers} from 'redux'
import burgerBuilderReducer from './store/reducer/burgerbuilder'
import thunk from 'redux-thunk'
import orderReducer from './store/reducer/order'


const rootReducer = combineReducers({
  burgerBuilder:burgerBuilderReducer,
  order:orderReducer
})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(rootReducer,composeEnhancers(applyMiddleware(thunk)));

ReactDOM.render(
  <Provider store={store}>
  <BrowserRouter>
  <React.StrictMode>
    <App />
  </React.StrictMode>
  </BrowserRouter>
  </Provider>,
  document.getElementById('root')

);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
registerServiceWorker
