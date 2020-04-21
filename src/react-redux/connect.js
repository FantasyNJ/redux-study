import React, {Component} from 'react';
import {bindActionCreators} from '../redux'
import storeShape from './utils/storeShape'
import shallowEqual from './utils/shallowEqual'

function getDisplayName(WrappedComponent) {
  return WrappedComponent.displayName || WrappedComponent.name || 'Component';
}

const defaultMapStateToProps = state => ({})
const defaultMapDispatchToProps = dispatch => ({ dispatch })

export default function (mapStateToProps = defaultMapStateToProps, mapDispatchToProps = defaultMapDispatchToProps) {
  return function wrapWithConnect (WrappedComponent) {
    return class Connect extends Component {
      //PropTypes.shape 这部分代码与 Provider 中重复，因此后面我们可以提取出来
      static contextTypes = {
        store: storeShape
      }

      // 调试用
      static displayName = `Connect(${getDisplayName(WrappedComponent)})`

      constructor(props, context) {
        super(props, context);
        this.store = context.store;
        this.state = mapStateToProps(this.store.getState())
        //
        if (typeof mapDispatchToProps === 'function') {
          // this.props.dispatch(actions.add(2))
          this.mappedDispatch = mapDispatchToProps(this.store.dispatch)
        } else {
          //传递了一个 actionCreator 对象过来
          this.mappedDispatch = bindActionCreators(mapDispatchToProps, this.store.dispatch);
        }
      }
      componentDidMount() {
        this.unsub = this.store.subscribe(() => {
          const mappedState = mapStateToProps(this.store.getState());
          // 做一层浅比较，如果状态没有改变，则不setState
          if (shallowEqual(this.state, mappedState)) {
            return;
          }
          this.setState(mappedState);
        })
      }

      render() {
        return (
          <WrappedComponent {...this.state} {...this.props} {...this.mappedDispatch} />
        )
      }

      componentWillUnmount() {
        this.unsub()
      }
    }
  }
}
