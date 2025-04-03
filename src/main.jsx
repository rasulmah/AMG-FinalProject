import  'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/bootstrap/dist/js/bootstrap.bundle';
import './assets/scss/styles.scss'
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './tools/store/store';





createRoot(document.getElementById('root')).render(
  <>

  <Provider store={store}>
  <BrowserRouter> 
    <App />
    </BrowserRouter>
  </Provider>
  </>,
)
