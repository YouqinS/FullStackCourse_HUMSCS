import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import reportWebVitals from './reportWebVitals'
import {Provider} from "react-redux"
import store from './store'



console.log(store.getState())
store.subscribe(() => console.log(store.getState()))
// store.dispatch(filterChange('IMPORTANT'))
// store.dispatch(createNote('combineReducers forms one reducer from many simple reducers'))



ReactDOM.render(
    <Provider store={store}>
    <App/>,
    </Provider>,
  document.getElementById('root')
)


reportWebVitals()
