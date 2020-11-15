import { connect } from 'react-redux'
import './View.css';
import * as actions from './Actions'
import { Component } from 'react'
import Table from '../components/Table/Index'

class App extends Component {
  componentDidMount() {
    this.props.getFishDatas()
  }

  render() {
    const { fishDatas, addFishData, editFishData, deleteFishData } = this.props
    return (
      <div className="App">
        <Table
          data={fishDatas}
          addFishData={addFishData}
          editFishData={editFishData}
          deleteFishData={deleteFishData}
        />
      </div>
    ) 
  }
}

const mapStateToProps = state => ({
  fishDatas: state.fishDatas
})

export default connect(mapStateToProps, actions)(App)
