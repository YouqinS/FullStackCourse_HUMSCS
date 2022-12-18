import {createStore} from "redux";

const counterReducer = (state = 0, action) => {
   /* if (action.type === 'INCREMENT') {
        return state + 1
    } else if (action.type === 'DECREMENT') {
        return state - 1
    } else if (action.type === 'ZERO') {
        return 0
    }*/
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

store.dispatch({type: 'INCREMENT'})

store.subscribe(() => {
    const storeNow = store.getState()
    console.log(storeNow)
})

/*console.log(store.getState())
store.dispatch({type: 'INCREMENT'})
store.dispatch({type: 'INCREMENT'})
store.dispatch({type: 'INCREMENT'})
console.log(store.getState())
store.dispatch({type: 'ZERO'})
store.dispatch({type: 'DECREMENT'})
console.log(store.getState())*/
