import React, {Component} from 'react'
import store from '../store'
import actions from '../store/actions/counter'
import {connect} from '../react-redux'

class Counter extends Component{
  render() {
    return (
      <>
        <div>
          <div>{this.props.number}</div>
          <button onClick={() => this.props.add(2)}>+</button>
          <button onClick={() => this.props.minus(2)}>-</button>
        </div>
      </>
    )
  }

  componentWillUnmount() {
    this.unsub()
  }
}

const mapStateToProps = state => ({
  number: state.counter.number
});

const mapDispatchToProps = (dispatch) => ({
  add: (num) => {
    dispatch(actions.add(num))
  },
  minus: (num) => {
    dispatch(actions.minus(num))
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Counter)
