import { connect } from 'react-redux'
import './View.css';
import * as actions from './Actions'
import { Component } from 'react'
import Table from '../components/Table'

class App extends Component {
  componentDidMount() {
    this.props.getFishDatas()
  }

  render() {
    const { fishDatas } = this.props
    return (
      <div className="App">
        <Table data={fishDatas}/>
      </div>
    ) 
  }
}

const mapStateToProps = state => ({
  fishDatas: state.fishDatas
})

export default connect(mapStateToProps, actions)(App)
