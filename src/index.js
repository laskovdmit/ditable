import './services/firebase';

import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import {BrowserRouter as Router} from 'react-router-dom';
import ErrorBoundry from './components/error/errorBoundry/';
import { DitableServiceContext, FirebaseServiceContext } from './components/serviceContext/serviceContext';
import DitableService from './services/ditableService';
import FireBaseService from './services/fireBaseService';
import App from './components/app/';
import store from './store';
import GlobalStyles from './styles';

const fireBaseService = new FireBaseService();
const ditableService = new DitableService();

const root = createRoot(document.getElementById('root'));
root.render(
    <Provider store={store}>
        <ErrorBoundry>
            <FirebaseServiceContext.Provider value={fireBaseService}>
                <DitableServiceContext.Provider value={ditableService}>
                    <Router>
                        <GlobalStyles/>
                        <App />
                    </Router>
                </DitableServiceContext.Provider>
            </FirebaseServiceContext.Provider>
        </ErrorBoundry>
    </Provider>
);