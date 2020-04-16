export default function createStore(reducer) {
  let state = {}
  let listeners = []
  const getState = () => state
  const subscribe = (ln) => {
    listeners.push(ln)
    const unSubscribe = () => {
      listeners = listeners.filter(listener => listener !== ln)
    }
    return unSubscribe
  }
  const dispatch = (action) => {
    state = reducer(state, action)
    listeners.forEach(ln => ln())
  }

  // 初始化state
  //你要是有个 action 的 type 的值正好和 `@@redux/__INIT__${Math.random()}` 相等，我敬你是个狠人
  dispatch({ type: `@@redux/__INIT__${Math.random()}` });

  return {
    getState,
    subscribe,
    dispatch
  }
}
