import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './components/App'
import './index.css'
// import './tailwind.css';
import { Provider } from 'react-redux'
// import store from './store'
import { BrowserRouter as Router } from 'react-router-dom'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* <Provider 
    // store={store} 
    > */}
      <Router>
        <App />
      </Router>
      
    {/* </Provider> */}
  </React.StrictMode>,
)
