import React, { Component } from 'react';
import { getCustomers } from '../../api/customer'
class Shipment extends Component {
  constructor(props) {
    super(props)
    this.state = {
      customers: [],
      loadding: false,
      page: 1
    }

    this.fetchData = this.fetchData.bind(this)
    this.nextPage = this.nextPage.bind(this)
    this.prePage = this.prePage.bind(this)
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

  fetchData(event) {
    this.setState({loadding: true})
    getCustomers({page: this.state.page}).then(response => {
      if (response.code === 200) {
        this.setState({customers: response.data, loadding: false})
      }
    })
  }

  componentWillMount () {
    this.fetchData()
  }

  render() {
    return (
      <section>
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
          <caption>Customers</caption>
          <thead>
            <tr>
              <th>Họ tên</th>
              <th>Số điện thoại</th>
              <th>email</th>
            </tr>
          </thead>
          <tbody>
            <tr className={!this.state.loadding ? 'hidden' : ''}>
              <td colSpan={3} className="text-center">loadding...</td>
            </tr>
            <tr className={this.state.customers.length || this.state.loadding ? 'hidden' : ''}>
              <td colSpan={3} className="text-center text-danger">Không có dữ liệu</td>
            </tr>
            {
              this.state.customers.map((customer) => {
                return (<tr className={this.state.loadding ? 'hidden' : ''} key={customer.id}>
                    <td>{customer.name}</td>
                    <td>{customer.phone}</td>
                    <td>{customer.email}</td>
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
