import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import './style/rsuite-no-reset.css'

import {BrowserRouter} from "react-router-dom";

import {StoreProvider} from "./context"


ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <StoreProvider>
      <BrowserRouter>
          <App />
      </BrowserRouter>
    </StoreProvider>

)
