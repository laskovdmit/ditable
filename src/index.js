import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import {BrowserRouter as Router} from 'react-router-dom';
import ErrorBoundry from './components/errorBoundry/';
import DitableServiceContext from './components/ditableServiceContext';
import DitableService from './services/ditableService';
import App from './components/app/';
import store from './store';
import GlobalStyles from './styles';


const ditableService = new DitableService();

const root = createRoot(document.getElementById('root'));
root.render(
    <Provider store={store}>
        <ErrorBoundry>
            <DitableServiceContext.Provider value={ditableService}>
                <Router>
                    <GlobalStyles/>
                    <App />
                </Router>
            </DitableServiceContext.Provider>
        </ErrorBoundry>
    </Provider>
);