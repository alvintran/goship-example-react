import React, { Component } from 'react';
import { getAllCities, getDistrictsOfCity } from '../../api/city'
import { getRates } from '../../api/rate'
import { createShipment } from '../../api/shipment'
import { debounce } from 'lodash'
class NewShipment extends Component {
  constructor(props) {
    super(props)
    this.state = {
      cities: [],
      districtFroms: [],
      districtTos: [],
      rates: [],
      getRate: false,
      shipment: {
        address_from: {
          name: '',
          phone: '',
          city: '',
          district: '',
          street: ''
        },
        address_to: {
          name: '',
          phone: '',
          city: '',
          district: '',
          street: ''
        },
        parcel: {
          cod: '',
          weight: '',
          height: '',
          length: '',
          width: '',
          metadata: ''
        },
        rate: ''
      },
      changeFeeList: [
        'address_from.city',
        'address_from.district',
        'address_to.city',
        'address_to.district',
        'parcel.weight',
        'parcel.cod',
        'parcel.width',
        'parcel.length',
        'parcel.height',
      ]
    }
     this.handleSubmit = this.handleSubmit.bind(this)
     this.handleChange = this.handleChange.bind(this)
     this.getDistrictsFrom = this.getDistrictsFrom.bind(this)
     this.getDistrictsTo = this.getDistrictsTo.bind(this)
     this.getRates = debounce(this.getRates.bind(this), 1000)
  }

  handleSubmit(event) {
    event.preventDefault()
    createShipment({shipment: this.state.shipment}).then(response => {
      switch (response.code) {
        case 200:
          alert('Tạo mới thành công')
          window.location.href = '/shipment'
          break
        case 422:
          alert(JSON.stringify(response.data.errors))
          break
        default:
          console.log('create shipment fails')
      }
    })
  }

  handleChange(event) {
    if (this.state.changeFeeList.indexOf(event.target.name) > -1) {
      this.setState({getRate: true})
    }
    let str = event.target.name.split('.')
    let newState = Object.assign({}, this.state['shipment'])
    if (str.length === 2) {
      newState[str[0]][str[1]] = event.target.value
      this.setState(newState)
    }
    if (str.length === 1) {
      console.log({
        shipment: {
          ...this.state.shipment,
          [event.target.name]: event.target.value
        }
      })
      this.setState({
        shipment: {
          ...this.state.shipment,
          [event.target.name]: event.target.value
        }
      })
    }
    console.log(this.state.shipment)
  }

  getDistrictsFrom (event) {
    if (this.state.changeFeeList.indexOf(event.target.name) > -1) {
      this.setState({getRate: true})
    }
    let str = event.target.name.split('.')
    let newState = Object.assign({}, this.state['shipment'])
    if (str.length === 2) {
      newState[str[0]][str[1]] = event.target.value
    }
    if (str.length === 1) {
      newState[str[0]] = event.target.value
    }
    this.setState(newState)
    if (event.target.value) {
      getDistrictsOfCity(event.target.value).then(response => {
        if (response.code === 200) {
          this.setState({districtFroms: response.data})
        } else {
          console.log('get district fail')
        }
      })
    } else {
      this.setState({districtFroms: []})
    }
  }

  getDistrictsTo (event) {
    if (this.state.changeFeeList.indexOf(event.target.name) > -1) {
      this.setState({getRate: true})
    }
    let str = event.target.name.split('.')
    let newState = Object.assign({}, this.state['shipment'])
    if (str.length === 2) {
      newState[str[0]][str[1]] = event.target.value
    }
    if (str.length === 1) {
      newState[str[0]] = event.target.value
    }
    if (event.target.value) {
      getDistrictsOfCity(event.target.value).then(response => {
        if (response.code === 200) {
          this.setState({districtTos: response.data})
        } else {
          console.log('get district fail')
        }
      })
    } else {
      this.setState({districtTos: []})
    }
  }

  getRates (event) {
    this.setState({getRate: false})
    getRates({shipment: this.state.shipment}).then(response => {
      switch (response.code) {
        case 200:
          this.setState({rates: response.data})
          break
        case 422:
          alert(JSON.stringify(response.data.errors))
          break
        default:
          console.log('get rates fails')
      }
    })
  }

  componentWillMount () {
    getAllCities().then(response => {
      if (response.code === 200) {
        this.setState({cities: response.data})
      } else {
        console.log('get cities fail')
      }
    })
  }

  componentWillUpdate(nextProps, nextState) {
    let shipment = nextState.shipment
    if (
      shipment.address_from.city &&
      shipment.address_from.district &&
      shipment.address_to.city &&
      shipment.address_to.district &&
      this.state.getRate
    ) {
      this.getRates()
      this.setState({getRate: false})
    }
  }

  render() {
    return (
      <section>
        <form onSubmit={this.handleSubmit}>
          <div className="row">
            <div className="col-sm-6">
              <h3>Thông tin người gửi</h3>
              <div className="form-group">
                <label>Họ và tên</label>
                <input type="text" className="form-control" name="address_from.name" value={this.state.shipment.address_from.name} onChange={this.handleChange} placeholder="Họ và tên" />
              </div>
              <div className="form-group">
                <label>Số điện thoại</label>
                <input type="text" className="form-control" name="address_from.phone" value={this.state.shipment.address_from.phone} onChange={this.handleChange} placeholder="Số điện thoại" />
              </div>
              <div className="form-group">
                <label>Địa chỉ</label>
                <input type="text" className="form-control" name="address_from.street" value={this.state.shipment.address_from.street} onChange={this.handleChange} placeholder="Địa chỉ" />
              </div>
              <div className="form-group">
                <label>Tỉnh thành</label>
                <select value={this.state.shipment.address_from.city} className="form-control" name="address_from.city" onChange={this.getDistrictsFrom} placeholder="Tỉnh thành">
                  <option>Chọn tỉnh thành</option>
                  {
                    this.state.cities.map((city) => {
                      return (
                        <option key={city.id} value={city.id}>{city.name}</option>
                      )
                    })
                  }
                </select>
              </div>
              <div className="form-group">
                <label>Quận huyện</label>
                <select value={this.state.shipment.address_from.district} className="form-control" name="address_from.district" onChange={this.handleChange} placeholder="Quận huyện">
                  <option>Chọn quận huyện</option>
                  {
                    this.state.districtFroms.map((district) => {
                      return (
                        <option key={district.id} value={district.id}>{district.name}</option>
                      )
                    })
                  }
                </select>
              </div>
            </div>
            <div className="col-sm-6">
              <h3>Thông tin người nhận</h3>
              <div className="form-group">
                <label>Họ và tên</label>
                <input type="text" className="form-control" name="address_to.name" value={this.state.shipment.address_to.name} onChange={this.handleChange} placeholder="Họ và tên" />
              </div>
              <div className="form-group">
                <label>Số điện thoại</label>
                <input type="text" className="form-control" name="address_to.phone" value={this.state.shipment.address_to.phone} onChange={this.handleChange} placeholder="Số điện thoại" />
              </div>
              <div className="form-group">
                <label>Địa chỉ</label>
                <input type="text" className="form-control" name="address_to.street" value={this.state.shipment.address_to.street} onChange={this.handleChange} placeholder="Địa chỉ" />
              </div>
              <div className="form-group">
                <label>Tỉnh thành</label>
                <select value={this.state.shipment.address_to.city} className="form-control" name="address_to.city" onChange={this.getDistrictsTo} placeholder="Tỉnh thành">
                  <option>Chọn tỉnh thành</option>
                  {
                    this.state.cities.map((city) => {
                      return (
                        <option key={city.id} value={city.id}>{city.name}</option>
                      )
                    })
                  }
                </select>
              </div>
              <div className="form-group">
                <label>Quận huyện</label>
                <select value={this.state.shipment.address_to.district} className="form-control" name="address_to.district" onChange={this.handleChange} placeholder="Quận huyện">
                  <option>Chọn quận huyện</option>
                  {
                    this.state.districtTos.map((district) => {
                      return (
                        <option key={district.id} value={district.id}>{district.name}</option>
                      )
                    })
                  }
                </select>
              </div>
            </div>
            <div className="col-sm-4">
              <h3>Thông tin hàng hóa</h3>
              <div className="form-group">
                <label>Tiền COD</label>
                <div className="input-group">
                  <input type="number" className="form-control" name="parcel.cod" value={this.state.shipment.parcel.cod} onChange={this.handleChange} placeholder="Tiền COD" />
                  <span className="input-group-addon">đ</span>
                </div>
              </div>
              <div className="form-group">
                <label>Cân nặng</label>
                <div className="input-group">
                  <input type="number" className="form-control" name="parcel.weight" value={this.state.shipment.parcel.weight} onChange={this.handleChange} placeholder="Cân nặng" />
                  <span className="input-group-addon">g</span>
                </div>
              </div>
              <div className="form-group">
                <label>Chiều dài</label>
                <div className="input-group">
                  <input type="number" className="form-control" name="parcel.length" value={this.state.shipment.parcel.length} onChange={this.handleChange} placeholder="Chiều dài" />
                  <span className="input-group-addon">cm</span>
                </div>
              </div>
              <div className="form-group">
                <label>Chiều rộng</label>
                <div className="input-group">
                  <input type="number" className="form-control" name="parcel.width" value={this.state.shipment.parcel.width} onChange={this.handleChange} placeholder="Chiều rộng" />
                  <span className="input-group-addon">cm</span>
                </div>
              </div>
              <div className="form-group">
                <label>Chiều cao</label>
                <div className="input-group">
                  <input type="number" className="form-control" name="parcel.height" value={this.state.shipment.parcel.height} onChange={this.handleChange} placeholder="Chiều cao" />
                  <span className="input-group-addon">cm</span>
                </div>
              </div>
              <div className="form-group">
                <label>Ghi chú</label>
                <textarea className="form-control" name="parcel.metadata" value={this.state.shipment.parcel.metadata} onChange={this.handleChange} placeholder="Ghi chú"></textarea>
              </div>
              <div className="form-group">
                <button type="submit" className="btn btn-primary">Tạo đơn</button>
              </div>
            </div>
            <div className="col-sm-8">
              <h3>Hãng vận chuyển</h3>
              <table className="table table-striped table-condensed table-hover">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>HVC</th>
                    <th>Dịch vụ</th>
                    <th>Phí COD</th>
                    <th>Phí vận chuyển</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    this.state.rates.map((rate) => {
                      return (
                        <tr key={rate.id}>
                          <th><input type="radio" name="rate" value={rate.id} onClick={this.handleChange} checked={this.state.shipment.rate === rate.id} /></th>
                          <th>{rate.carrier_name}</th>
                          <th>{rate.service}</th>
                          <th>{rate.cod_fee}</th>
                          <th>{rate.total_fee}</th>
                        </tr>
                      )
                    })
                  }
                </tbody>
              </table>
            </div>
          </div>
        </form>
      </section>
    );
  }
}

export default NewShipment;
