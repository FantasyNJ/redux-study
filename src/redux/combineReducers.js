export default function combineReducers(reducers) {
  return function combination(state={}, action) {
    let nextState = {};
    let hasChanged = false; //状态是否改变
    // 把所有reducers都遍历一遍，所以redux在这边存在性能问题
    for(let key in reducers) {
      // 单个reducer返回的state
      const previousStateForKey = state[key];
      const nextStateForKey = reducers[key](previousStateForKey, action);
      // 所有reducers返回的state合集
      nextState[key] = nextStateForKey;
      //只有所有的 nextStateForKey 均与 previousStateForKey 相等时，hasChanged 的值 false
      hasChanged = hasChanged || nextStateForKey !== previousStateForKey;
    }
    //state 没有改变时，返回原对象
    return hasChanged ? nextState : state;
  }
}
