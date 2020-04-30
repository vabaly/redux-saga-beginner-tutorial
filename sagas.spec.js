import test from 'tape';

import { delay } from 'redux-saga'
import { put, call } from 'redux-saga/effects'
import { incrementAsync } from './sagas'

test('incrementAsync Saga test', (t) => {
  const generator = incrementAsync()

  t.deepEqual(
    // generator.next() 返回一个对象 { done: boolean, value: any }
    // 其中 done 是说这个生成器有没有执行完，如果生成器中有 n 个 yield，那么在 n + 1 次 generator.next() 调用时 done 才为 false，表示执行完了
    // value 就是当前 yield 表达式返回的内容，即 yield 后面的表达式的返回值
    generator.next().value,
    // 无论是 call 还是 put 这些创建副作用的函数，实际上都只返回一个对象
    // Saga Middleware 会接收到这个对象，并执行相关的动作，所以，开发者实际上是在声明副作用
    // 这个好处就在于能够测试这些副作用了
    call(delay, 1000),
    'counter Saga must call delay(1000)'
  )

  t.deepEqual(
    generator.next().value,
    put({type: 'INCREMENT'}),
    'counter Saga must dispatch an INCREMENT action'
  )

  t.deepEqual(
    generator.next(),
    { done: true, value: undefined },
    'counter Saga must be done'
  )

  t.end()
});
