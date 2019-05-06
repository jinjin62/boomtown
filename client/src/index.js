import React from 'react';
import ReactDOM from 'react-dom';
import { MuiThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import client from './apollo';

import { ApolloProvider } from 'react-apollo';
import { BrowserRouter } from 'react-router-dom';
import { Provider as ReduxProvider } from 'react-redux';

import registerServiceWorker from './registerServiceWorker';
import theme from './theme';
import Layout from './routes/Layout';

import { ViewerProvider } from './context/ViewerProvider';
import Home from './pages/Home';
import ItemsGrid from './components/ItemsGrid';
import store from './redux';
// -------------------------------

import './index.css';
//import Items from './pages/Items/Items';
//<ItemsGrid />

const App = () => {
  return (
    <ReduxProvider store={store}>
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        <ApolloProvider client={client}>
          <ViewerProvider>
            <BrowserRouter>
              <Layout />
            </BrowserRouter>
          </ViewerProvider>
        </ApolloProvider>
      </MuiThemeProvider>
    </ReduxProvider>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
