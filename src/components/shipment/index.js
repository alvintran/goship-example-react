import React, { Component } from 'react';
import { getShipments } from '../../api/shipment'
import {
  Link
} from 'react-router-dom'
class Shipment extends Component {
  constructor(props) {
    super(props)
    this.state = {
      shipments: [],
      loadding: false,
      page: 1
    }

    this.fetchData = this.fetchData.bind(this)
    this.nextPage = this.nextPage.bind(this)
    this.prePage = this.prePage.bind(this)
  }

  fetchData(event) {
    this.setState({loadding: true})
    getShipments({page: this.state.page}).then(response => {
      if (response.code === 200) {
        this.setState({
          shipments: response.data,
          loadding: false
        })
      }
    })
  }

  nextPage(event) {
    event.preventDefault()
    this.setState({page: ++this.state.page})
    this.fetchData()
  }

  prePage(event) {
    event.preventDefault()
    if (this.state.page > 1) {
      this.setState({page: --this.state.page})
      this.fetchData()
    }
  }

  componentWillMount () {
    this.fetchData()
  }

  render() {
    return (
      <section>
        <div className="text-right">
          <Link className="btn btn-primary" to="/new-shipment">Tạo vận đơn</Link>
        </div>
        <nav className="text-right">
          <nav aria-label="Page navigation">
            <ul className="pagination">
              <li className={this.state.page === 1 ? 'disabled' : ''}>
                <a href="#" onClick={this.prePage} aria-label="Previous">
                  <span aria-hidden="true">&laquo;</span>
                </a>
              </li>
              <li>
                <a href="#" onClick={this.nextPage} aria-label="Next">
                  <span aria-hidden="true">&raquo;</span>
                </a>
              </li>
            </ul>
          </nav>
        </nav>
        <table className="table table-condensed table-hover table-striped">
          <caption>Shipments</caption>
          <thead>
            <tr>
              <th>Vận đơn</th>
              <th>Người gửi</th>
              <th>Người nhận</th>
              <th>HVC</th>
              <th>Phí</th>
              <th>Trạng thái</th>
            </tr>
          </thead>
          <tbody>
            <tr className={!this.state.loadding ? 'hidden' : ''}>
              <td colSpan={6} className="text-center">loadding...</td>
            </tr>
            <tr className={this.state.shipments.length || this.state.loadding ? 'hidden' : ''}>
              <td colSpan={6} className="text-center text-danger">Không có dữ liệu</td>
            </tr>
            {
              this.state.shipments.map((shipment) => {
                return (<tr className={this.state.loadding ? 'hidden' : ''} key={shipment.id}>
                    <td>
                      <p>{shipment.id}</p>
                      <p>{shipment.created_at}</p>
                    </td>
                    <td>
                      <p>{shipment.address_from.name}</p>
                      <p>{shipment.address_from.phone}</p>
                      <p>{shipment.address_from.street}</p>
                    </td>
                    <td>
                      <p>{shipment.address_to.name}</p>
                      <p>{shipment.address_to.phone}</p>
                      <p>{shipment.address_to.street}</p>
                    </td>
                    <td>
                      <p>{shipment.carrier_name}</p>
                      <p>{shipment.service_name}</p>
                    </td>
                    <td>
                      <p>{shipment.location_fee}</p>
                      <p>{shipment.total_fee}</p>
                    </td>
                    <td>
                      <p>{shipment.status_text}</p>
                      <p>{shipment.status_desc}</p>
                    </td>
                  </tr>)
              })
            }
          </tbody>
        </table>
        <nav className="text-right">
          <nav aria-label="Page navigation">
            <ul className="pagination">
              <li className={this.state.page === 1 ? 'disabled' : ''}>
                <a href="#" onClick={this.prePage} aria-label="Previous">
                  <span aria-hidden="true">&laquo;</span>
                </a>
              </li>
              <li>
                <a href="#" onClick={this.nextPage} aria-label="Next">
                  <span aria-hidden="true">&raquo;</span>
                </a>
              </li>
            </ul>
          </nav>
        </nav>
      </section>
    );
  }
}

export default Shipment;
