import "babel-polyfill"

import React from 'react'
import ReactDOM from 'react-dom'
import { createStore, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'

import Counter from './Counter'
import reducer from './reducers'
import rootSaga from './sagas'

// 创建一个 redux-saga 的中间件并连接至 redux 的 store
const sagaMiddleware = createSagaMiddleware()
const store = createStore(
  reducer,
  applyMiddleware(sagaMiddleware)
)
// 运行 sagas
sagaMiddleware.run(rootSaga)

// FIXME: .dispatch 方法可以直接通过 store 调用，因为本质上组件上的 this.props.dispatch 就是 store.dispatch 赋值过去的
const action = type => store.dispatch({type})

function render() {
  ReactDOM.render(
    <Counter
      // FIXME: .getState 方法也是 store 上的
      value={store.getState()}
      onIncrement={() => action('INCREMENT')}
      onDecrement={() => action('DECREMENT')}
      onIncrementAsync={() => action('INCREMENT_ASYNC')}/>,
    document.getElementById('root')
  )
}

render()
// store.subscribe 可能类似于 <Provider> ？
store.subscribe(render)
