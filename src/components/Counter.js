import React, {Component} from 'react'
import store from '../store'
import actions from '../store/actions/counter'

export default class Counter extends Component{
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
