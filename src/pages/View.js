import { connect } from 'react-redux'
import './View.css';
import * as actions from './Actions'
import { Component } from 'react'

class App extends Component {
  componentDidMount() {
    this.props.getFishDatas()
    console.log(this.props.fishDatas)
  }

  render() {
    const { fishDatas } = this.props

    return (
      <div className="App">
        {/* {fishDatas.map((data) =>
          <pre>
            {data.uuid}
          </pre>
        )} */}
        <header className="App-header">
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>
    ) 
  }
}

const mapStateToProps = state => ({
  fishDatas: state.fishDatas
})

export default connect(mapStateToProps, actions)(App)
