import { PureComponent } from 'react'
import {
  Card,
  DialogTitle,
  Grid,
  DialogContent
} from '@material-ui/core';
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

  // Actions
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

  // Computed Datas
  formatDate (date) {
    const newDate = new Date(date)
    return newDate.getDate() + '-' + Number(newDate.getMonth() + 1) + '-' + newDate.getFullYear()
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

  // Layouts
  layoutTableColumns () {
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
        sortable: true,
        cell: row => <p>Rp {Number(row.price).toLocaleString(['ban', 'id'])}</p>
      },
      {
        name: 'Tanggal Ditambahkan',
        selector: 'tgl_parsed',
        sortable: true,
        cell: row => <p>{this.formatDate(row.tgl_parsed)}</p>
      },
      {
        name: 'Actions',
        compact: true,
        minWidth: '140px',
        cell: row => this.layoutAction(row)
      }
    ]
  }

  layoutAction (data) {
    return (
      <Grid spacing={1} container direction="row" justify="start" align="center">
        <Grid item>
          <Button size="small" text="Edit" onClick={(e) => {
            this.setState({ formCondition: 'edit' })
            this.setTempEditData(data)
            this.handleOpenedFormDialog(true)
          }}/>
        </Grid>
        <Grid item>
          <Button size="small" color="secondary" text="Hapus" onClick={(e) => {
            this.setTempEditData(data)
            this.handleOpenedDeleteDialog(true)
          }}/>
        </Grid>
      </Grid>
    )
  }

  layoutFilter () {
    return (
      <div>
        <Grid
          container
          direction="row"
          justify="center"
          spacing={1}
          alignItems="center"
          style={{
            marginBottom: '8px'
          }}
        >
          <Grid item xs={8}>
            <Input
              placeholder="Cari Data"
              label="Cari"
              value={this.state.searchText}
              onChange={this.handleFilteredData}
            />
          </Grid>
          <Grid item xs={3}>
            <Button
              size="medium"
              text="X"
              onClick={this.handleResetButton}
            />
          </Grid>
        </Grid>
        <Button
          text="Tambah Data"
          size="medium"
          onClick={(e) => {
            this.setState({ formCondition: 'add' })
            this.handleOpenedFormDialog(true)
          }}
        />
      </div>
    )
  }

  layoutDeleteDialog () {
    return (
      <Dialog
        isOpened={this.state.dialog.isDialogDeleteOpened}
        onClose={(e) => { this.handleOpenedDeleteDialog(false) }}
      >
        <DialogTitle>Anda yakin ingin menghapus data?</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} direction="row" alignItems="center" justify="center">
            <Grid item xs={6}>
              <Button
                size="medium"
                text="Ya"
                color="secondary"
                onClick={(e) => {
                  this.handleDeleteFishData()
                }}
              />
            </Grid>
            <Grid item xs={6}>
              <Button
                size="medium"
                text="Tidak"
                onClick={(e) => {
                  this.handleOpenedDeleteDialog(false)
                }}
              />
            </Grid>
          </Grid>
        </DialogContent>
      </Dialog>
    )
  }

  layoutAddEditDialog () {
    return (
      <Dialog
        isOpened={this.state.dialog.isDialogFormOpened}
        onClose={(e) => { this.handleOpenedFormDialog(false) }}
      >
        <DialogTitle>
          {this.state.formCondition === 'edit' ? 'Ubah Data' : 'Tambah Data' }
        </DialogTitle>
        <DialogContent>
          <Input
            style={{
              marginBottom: '16px'
            }}
            label={
              this.state.formCondition === 'edit'
              ? 'Edit Komoditas'
              : 'Tambah Komoditas'
            }
            placeholder={
              this.state.formCondition === 'edit'
              ? 'Edit Komoditas'
              : 'Tambah Komoditas'
            }
            name="comodity"
            value={this.state.comodity}
            onChange={this.handleAddEditData}
          />
          <Input
            style={{
              marginBottom: '16px'
            }}
            label={
              this.state.formCondition === 'edit'
              ? 'Edit Provinsi'
              : 'Tambah Provinsi'
            }
            placeholder={
              this.state.formCondition === 'edit'
              ? 'Edit Provinsi'
              : 'Tambah Provinsi'
            }
            name="province"
            value={this.state.province}
            onChange={this.handleAddEditData}
          />
          <Input
            style={{
              marginBottom: '16px'
            }}
            label={
              this.state.formCondition === 'edit'
              ? 'Edit Kota'
              : 'Tambah Kota'
            }
            placeholder={
              this.state.formCondition === 'edit'
              ? 'Edit Kota'
              : 'Tambah Kota'
            }
            name="city"
            value={this.state.city}
            onChange={this.handleAddEditData}
          />
          <Input
            style={{
              marginBottom: '16px'
            }}
            label={
              this.state.formCondition === 'edit'
              ? 'Edit Ukuran'
              : 'Tambah Ukuran'
            }
            placeholder={
              this.state.formCondition === 'edit'
              ? 'Edit Ukuran'
              : 'Tambah Ukuran'
            }
            name="size"
            value={this.state.size}
            onChange={this.handleAddEditData}
          />
          <Input
            style={{
              marginBottom: '16px'
            }}
            label={
              this.state.formCondition === 'edit'
              ? 'Edit Harga'
              : 'Tambah Harga'
            }
            placeholder={
              this.state.formCondition === 'edit'
              ? 'Edit Harga'
              : 'Tambah Harga'
            }
            name="price"
            value={this.state.price}
            onChange={this.handleAddEditData}
          />
          <Button
            text={
              this.state.formCondition === 'edit'
              ? 'Ubah Data'
              : 'Tambah Data'
            }
            size="medium"
            style={{
              marginBottom: '16px'
            }}
            onClick={(e) => {
              this.handleAddEditButton()
            }}
          />
        </DialogContent>
      </Dialog>
    )
  }

  // Render function
  render () {
    return (
      <div className="App">
        <Card>
          <DataTable
            title="Fish Datas"
            subHeader
            subHeaderComponent={this.layoutFilter()}
            columns={this.layoutTableColumns()}
            data={this.filteredItems()}
            pagination
            paginationTotalRows={this.filteredItems().length}
          />
        </Card>

        <Snackbar
          isOpened={this.state.snackbar.isOpened}
          text={this.state.snackbar.text}
          onClose={() => this.setState({ snackbar: { isOpened: false }})}
        />

        {/* Layout callers */}
        {this.layoutDeleteDialog()}
        {this.layoutAddEditDialog()}
      </div>
    )
  }
}

export default Table
