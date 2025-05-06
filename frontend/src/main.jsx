import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { BrowserRouter } from 'react-router-dom';
import { AppContextProvider } from './context/AppContext.jsx';
import { Provider} from 'react-redux'
import store from "./Inventory/redux/store.js"

import './Inventory/redux/api/EmailApiSlice.js'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
  <AppContextProvider>
  <Provider store={store}>
  <App/>
  </Provider>
  </AppContextProvider>
  </BrowserRouter>
)
