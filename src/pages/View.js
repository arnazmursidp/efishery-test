import { connect } from 'react-redux'
import { Component } from 'react'
import { Grid } from '@material-ui/core'
import './View.scss';
import * as actions from './Actions'
import Table from '../components/Table/Index'
import Card from '../components/Card/Index'
import Header from '../components/Header'

class App extends Component {
  componentDidMount() {
    this.props.getFishDatas()
  }

  // Computed Data
  totalPrice () {
    const { fishDatas } = this.props
    if (fishDatas.length > 0) {
      const sum = fishDatas
        .map((item) => {
          return Number(item.price || 0)
        })
        .reduce((acc, curr) => !isNaN(curr) ? acc + curr : 0)
      return Number(sum).toLocaleString(['ban', 'id'])
    } else {
      return 0
    }
  }

  render() {
    const { fishDatas, addFishData, editFishData, deleteFishData } = this.props
    return (
      <div className="App">
        <Header title="eFishery Dashboard" />
        {/* Summary Card */}
        <Grid
          className="AppCardSection"
          container
          direction="row"
          spacing={2}
          alignItems="center"
          justify="center"
        >
          <Grid item xs={12} md={6} lg={6} xl={6}>
            <Card
              color="info"
              titleColor="white"
              icon="analytics"
              highlightTextColor="white"
              title="Total Transaksi"
              highlightText={this.props.fishDatas.length}
            ></Card>
          </Grid>
          <Grid item xs={12} md={6} lg={6} xl={6}>
            <Card
              titleColor="white"
              highlightTextColor="white"
              color="primary"
              icon="add_shopping_cart"
              title="Total Harga Barang"
              highlightText={'Rp ' + this.totalPrice()}
            ></Card>
          </Grid>
        </Grid>
        {/* End Summary Card */}
        <div className="AppTable" >
          <Table
            data={fishDatas}
            addFishData={addFishData}
            editFishData={editFishData}
            deleteFishData={deleteFishData}
          />
        </div>
      </div>
    ) 
  }
}

const mapStateToProps = state => ({
  fishDatas: state.fishDatas
})

export default connect(mapStateToProps, actions)(App)
