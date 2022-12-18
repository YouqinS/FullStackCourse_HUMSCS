import logo from './logo.svg';
import './App.css';
import {createStore} from "redux";
import ReactDOM from "react-dom";

const counterReducer = (state = 0, action) => {
    switch (action.type) {
        case 'INCREMENT':
            return state + 1
        case 'DECREMENT':
            return state - 1
        case 'ZERO':
            return 0
        default:
            return state
    }
}

const store = createStore(counterReducer)


function App() {
    return (
        <div className="App">
            {/*<header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>*/}
            <h2>hello</h2>

            <div>
                {store.getState()}
            </div>
            <button onClick={() => store.dispatch({type: 'INCREMENT'})}>
                plus
            </button>
            <button onClick={e => store.dispatch({type: 'DECREMENT'})}>
                minus
            </button>
            <button onClick={e => store.dispatch({type: 'ZERO'})}>
                zero
            </button>

        </div>
    );
}

//When the state in the store is changed,
// React is not able to automatically rerender the application.
const renderApp = () => {
    ReactDOM.render(<App/>, document.getElementById('root'))
}

renderApp()
store.subscribe(renderApp)

export default App;
