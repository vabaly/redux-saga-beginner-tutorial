import { all, call, delay, put, takeEvery } from 'redux-saga/effects'

// TODO: 这是 saga 啥？
export function* helloSaga() {
  console.log('Hello Saga!')
}

// saga 任务
export function* incrementAsync() {
  yield delay(1000)
  yield put({type: 'INCREMENT'})
}

// action 监听，监听到就触发指定任务
export function* watchIncrementAsync() {
  yield takeEvery('INCREMENT_ASYNC', incrementAsync)
}

// single entry point to start all Sagas at once
export default function* rootSaga() {
  yield all([
    call(helloSaga),
    call(watchIncrementAsync),
  ])
}
