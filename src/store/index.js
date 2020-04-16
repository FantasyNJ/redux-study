import {createStore} from '../redux'
import reducer from './reducers'

const loggerMiddleware = store => next => action => {
  console.log(store.getState())
  next(action)
}

const exceptionMiddleware = store => next => action => {
  try {
    next(action)
  } catch (err) {
    console.error(err)
  }
}

const applyMiddleware = (...middlewares) => createStore => (...args) => {
  let store = createStore(...args)
  //顺便说一句: redux 源码中没有直接把 store 传递过去，而是把 getState 和 dispatch 传递给了 middleware
  let middles = middlewares.map(middleware => middleware(store))
  console.log(middles, 'middles')
  //现在我们有多个 middleware，需要多次增强 dispatch
  let dispatch = compose(...middles)(store.dispatch)

  return {
    ...store,
    dispatch
  }
}

function compose(...funcs) {
  //如果没有中间件
  if (funcs.length === 0) {
    return arg => arg
  }
  //中间件长度为1
  if (funcs.length === 1) {
    return funcs[0]
  }

  /*
  let middle1 = logger1(store);
  let middle2 = logger2(store);
  let middle3 = logger3(store);

  middle1(middle2(middle3(store.dispatch)))

  1. (...args) => middle1(middle2(...args)) middle1 middle2
  2. (...args) => middle1(middle2(middle3(...args))) (...args) => middle1(middle2(...args)) middle3
    (...args) => ((...args) => middle1(middle2(...args)))(middle3(...args))

    (...args) => middle1(middle2(middle3(...args)))
  */
  return funcs.reduce(
    (prev, current) => (...args) => prev(current(...args))
  )
}

/*三个中间件*/
let logger1 = store => dispatch => action => {
  console.log('111');
  dispatch(action);
  console.log('444');
}
let logger2 = store => dispatch => action => {
  console.log('222');
  dispatch(action);
  console.log('555')
}
let logger3 = store => dispatch => action => {
  console.log('333');
  dispatch(action);
  console.log('666');
}

export default applyMiddleware(logger1, logger2, logger3)(createStore)(reducer)
