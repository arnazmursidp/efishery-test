import { Component } from 'react'
import DataTable from 'react-data-table-component'
import Input from './Input'
import Button from './Button'

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

class Table extends Component {
  constructor(props) {
    super(props)
    this.state = {
      searchText: ''
    }

    this.handleFilteredData = this.handleFilteredData.bind(this)
    this.handleResetButton = this.handleResetButton.bind(this)
  }

  handleResetButton (event) {
    this.setState({
      searchText: ''
    })
  }

  handleFilteredData (event) {
    const target = event.target
    this.setState({
      searchText: target.value
    })
  }

  filterLayout () {
    return (
      <div>
        <Input
          placeholder="Cari Data"
          label="Cari"
          value={this.state.searchText}
          onChange={this.handleFilteredData}
        />
        <Button
          text="X"
          onClick={this.handleResetButton}
        />
      </div>
    )
  }

  filteredItems () {
    const { data } = this.props
    const { searchText } = this.state
    return data.filter(
      item =>
        (item.komoditas && item.komoditas.toLowerCase().includes(searchText.toLowerCase())) ||
        (item.area_kota && item.area_kota.toLowerCase().includes(searchText.toLowerCase())) ||
        (item.area_provinsi && item.area_provinsi.toLowerCase().includes(searchText.toLowerCase())) ||
        (item.price && item.price.toLowerCase().includes(searchText.toLowerCase())) ||
        (item.size && item.size.toLowerCase().includes(searchText.toLowerCase()))
    )
  }

  render () {
    return (
      <div className="App">
        <DataTable
          title="Fish Datas"
          subHeader
          subHeaderComponent={this.filterLayout()}
          columns={columns}
          data={this.filteredItems()}
        />
      </div>
    )
  }
}

export default Table
