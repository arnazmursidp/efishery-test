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
      searchText: '',
      comodity: '',
      province: '',
      city: '',
      size: '',
      price: '',
      uuid: 'ab1434e0-9b7f-4b74-bf25-420e0bdfe31c'
    }

    this.handleFilteredData = this.handleFilteredData.bind(this)
    this.handleResetButton = this.handleResetButton.bind(this)
    this.handleAddEditData = this.handleAddEditData.bind(this)
    this.handleAddEditButton = this.handleAddEditButton.bind(this)
  }
 
  handleAddEditButton () {
    const {
      comodity,
      province,
      city,
      size,
      price,
      uuid
    } = this.state
    this.props.deleteFishData({
      uuid
    })
  }

  handleResetButton (event) {
    this.setState({
      searchText: ''
    })
  }

  handleAddEditData (event) {
    const target = event.target
    const name = target.name
    const value = target.value

    this.setState({
      [name]: value
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
        <Input
          placeholder="Tambah Komoditas"
          name="comodity"
          value={this.state.comodity}
          onChange={this.handleAddEditData}
        />
        <Input
          placeholder="Tambah Provinsi"
          name="province"
          value={this.state.province}
          onChange={this.handleAddEditData}
        />
        <Input
          placeholder="Tambah Kota"
          name="city"
          value={this.state.city}
          onChange={this.handleAddEditData}
        />
        <Input
          placeholder="Tambah Ukuran"
          name="size"
          value={this.state.size}
          onChange={this.handleAddEditData}
        />
        <Input
          placeholder="Tambah Harga"
          name="price"
          value={this.state.price}
          onChange={this.handleAddEditData}
        />
        <Button
          text="Y"
          onClick={this.handleAddEditButton}
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
