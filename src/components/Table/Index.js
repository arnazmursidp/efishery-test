import { PureComponent } from 'react'
import { Card } from '@material-ui/core';
import DataTable from 'react-data-table-component'
import Input from '../Input'
import Button from '../Button'
import Dialog from '../Dialog'
import Snackbar from '../Snackbar'

class Table extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      searchText: '',
      comodity: '',
      province: '',
      city: '',
      size: '',
      price: '',
      uuid: '',
      formCondition: '',
      dialog: {
        isDialogFormOpened: false,
        isDialogDeleteOpened: false
      },
      snackbar: {
        isOpened: false,
        text: ''
      }
    }

    this.handleFilteredData = this.handleFilteredData.bind(this)
    this.handleResetButton = this.handleResetButton.bind(this)
    this.handleAddEditData = this.handleAddEditData.bind(this)
  }

  handleOpenedDeleteDialog (condition) {
    this.setState({
      dialog: {
        isDialogDeleteOpened: condition
      }
    })
  }

  handleOpenedFormDialog (condition) {
    this.setState({
      dialog: {
        isDialogFormOpened: condition
      }
    })
  }

  handleOpenedSnackbar (text) {
    this.setState({
      snackbar: {
        isOpened: true,
        text
      }
    })
  }

  handleAddEditButton () {
    const {
      comodity,
      province,
      city,
      size,
      price,
      uuid,
      formCondition
    } = this.state
    if (formCondition === 'edit') {
      this.props.editFishData({
        komoditas: comodity,
        area_provinsi: province,
        area_kota: city,
        size,
        price,
        uuid
      })
        .then(() => {
          this.handleOpenedFormDialog(false)
          this.handleOpenedSnackbar('Data berhasil diubah')
        })
    } else {
      this.props.addFishData({
        komoditas: comodity,
        area_provinsi: province,
        area_kota: city,
        size,
        price,
        uuid: '9900abcdef' + Math.random() * Math.floor(21)
      })
        .then(() => {
          this.handleOpenedFormDialog(false)
          this.handleOpenedSnackbar('Data berhasil ditambah')
        })
    }
  }

  handleDeleteFishData () {
    const { uuid } = this.state
    this.props.deleteFishData({
      uuid
    })
      .then(() => {
        this.handleOpenedDeleteDialog(false)
        this.handleOpenedSnackbar('Data berhasil dihapus')
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

  setTempEditData (data) {
    this.setState({
      uuid: data.uuid,
      comodity: data.komoditas,
      city: data.area_kota,
      province: data.area_provinsi,
      size: data.size,
      price: data.price
    })
  }

  // Initialize columns
  columns () {
    return [
      {
        name: 'uuid',
        selector: 'uuid',
        omit: true,
        sortable: true
      },
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
      },
      {
        name: 'Actions',
        button: true,
        cell: row => this.actionLayout(row)
      }
    ]
  }

  actionLayout (data) {
    return (
      <div>
        <Button text="Edit Data" onClick={(e) => {
          this.setState({ formCondition: 'edit' })
          this.setTempEditData(data)
          this.handleOpenedFormDialog(true)
        }}/>
        <Button text="Hapus Data" onClick={(e) => {
          this.setTempEditData(data)
          this.handleOpenedDeleteDialog(true)
        }}/>
      </div>
    )
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
        <Button
          text="Add"
          onClick={(e) => {
            this.setState({ formCondition: 'add' })
            this.handleOpenedFormDialog(true)
          }}
        />
      </div>
    )
  }

  render () {
    return (
      <div className="App">
        <Card>
          <DataTable
            title="Fish Datas"
            subHeader
            subHeaderComponent={this.filterLayout()}
            columns={this.columns()}
            data={this.filteredItems()}
          />
        </Card>
        <Snackbar
          isOpened={this.state.snackbar.isOpened}
          text={this.state.snackbar.text}
          onClose={() => this.setState({ snackbar: { isOpened: false }})}
        />
        <Dialog
          isOpened={this.state.dialog.isDialogDeleteOpened}
          onClose={(e) => { this.handleOpenedDeleteDialog(false) }}
        >
          <p>Anda yakin ingin menghapus data?</p>
          <Button
            text="X"
            onClick={(e) => {
              this.handleOpenedDeleteDialog(false)
            }}
          />
          <Button
            text="Y"
            onClick={(e) => {
              this.handleDeleteFishData()
            }}
          />
        </Dialog>
        <Dialog
          isOpened={this.state.dialog.isDialogFormOpened}
          onClose={(e) => { this.handleOpenedFormDialog(false) }}
        >
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
            onClick={(e) => {
              this.handleAddEditButton()
            }}
          />
        </Dialog>
      </div>
    )
  }
}

export default Table
