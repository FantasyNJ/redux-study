import React, {Component} from 'react'
import store from '../store'
import actions from '../store/actions/theme'

export default class Pannel extends Component{
  constructor() {
    super();
    this.state = {
      color: store.getState().theme
    }
  }

  componentDidMount() {
    this.unsub = store.subscribe(() => {
      console.log('color')
      this.setState({
        color: store.getState().theme
      })
    })
  }

  changeColor(color) {
    store.dispatch(actions.changeColor(color))
  }

  render() {
    return (
      <>
        <div style={this.state.color}>
          前端宇宙
        </div>
        <div>
          <div style={this.state.color}>大家好，我是前端宇宙作者刘小夕</div>
          <button onClick={() => this.changeColor('rgb(0, 51, 254)')}>Blue</button>
          <button onClick={() => this.changeColor('rgb(247, 109, 132)')}>Pink</button>
        </div>
      </>
    )
  }

  componentWillUnmount() {
    this.unsub()
  }
}
