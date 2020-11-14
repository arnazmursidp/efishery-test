import { connect } from 'react-redux'
import './View.css';
import * as actions from './Actions'
import { Component } from 'react'
import DataTable from 'react-data-table-component'

// Initialize columns
const columns = [
  {
    name: 'Komoditas',
    selector: 'komoditas',
    sortable: true
  },
  {
    name: 'Provinsi',
    selector: 'area_provinsi',
    sortable: true
  },
  {
    name: 'Kota',
    selector: 'area_kota',
    sortable: true
  },
  {
    name: 'Ukuran',
    selector: 'size',
    sortable: true
  },
  {
    name: 'Harga',
    selector: 'price',
    sortable: true
  }
]

class App extends Component {
  componentDidMount() {
    this.props.getFishDatas()
  }

  render() {
    const { fishDatas } = this.props
    return (
      <div className="App">
        <DataTable
          title="Fish Datas"
          columns={columns}
          data={fishDatas}
        />
      </div>
    ) 
  }
}

const mapStateToProps = state => ({
  fishDatas: state.fishDatas
})

export default connect(mapStateToProps, actions)(App)
