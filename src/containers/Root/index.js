import React from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';
import App from '../../components/App';
import rootReducer from '../../reducers';

const store = createStore(
    rootReducer,
    applyMiddleware(thunk, createLogger())
);

const Root = () => (
    <Provider store={store}>
        <App />
    </Provider>
)

export default Root;