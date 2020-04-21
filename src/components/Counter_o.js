import React, {Component} from 'react'
import store from '../store'
import actions from '../store/actions/counter'
import {connect} from '../react-redux'

class Counter extends Component{
  constructor() {
    super();
    this.state = {
      number: store.getState().counter.number
    }
  }
  componentDidMount() {
    this.unsub = store.subscribe(() => {
      this.setState({
        number: store.getState().counter.number
      })
    })
  }

  add() {
    store.dispatch(actions.add(2))
  }
  minus() {
    store.dispatch(actions.minus(2))
  }
  render() {
    return (
      <>
        <div>
          <div>{this.state.number}</div>
          <button onClick={this.add}>+</button>
          <button onClick={this.minus}>-</button>
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
