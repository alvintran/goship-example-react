import React, { Component } from 'react'
import { login } from '../../api/login'
import ls from '../../libs/ls'

class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      client_id: 4,
      client_secret: "hjg5CRXMcj7Qfnaxjj4RVsPPrFkixgQliDp0AseZ",
      username: '',
      password: ''
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(event) {
    this.setState({[event.target.name]: event.target.value})
  }

  handleSubmit(event) {
    event.preventDefault()
    login(this.state).then(response => {
      switch (response.code) {
        case 200:
          ls.set('authen', response)
          alert('success')
          window.location.href = '/shipment'
          break
        case 422:
          alert(JSON.stringify(response.data.errors))
          break
        default:
          alert('fail')
      }
    })
  }

  render() {
    return (
      <div className="col-sm-6 col-sm-offset-3">
        <form onSubmit={this.handleSubmit} className="form-horizontal">
          <div className="form-group">
            <label className="col-sm-2">Username:</label>
            <div className="col-sm-10">
              <input type="email" className="form-control" value={this.state.username} name="username" onChange={this.handleChange} />
            </div>
          </div>
          <div className="form-group">
            <label className="col-sm-2">Password:</label>
            <div className="col-sm-10">
              <input type="password" className="form-control" value={this.state.password} name="password" onChange={this.handleChange} />
            </div>
          </div>
          <div className="form-group">
            <div className="col-sm-offset-2 col-sm-10">
              <button type="submit" className="btn btn-primary">Login</button>
            </div>
          </div>
        </form>
      </div>
    )
  }
}

export default Login
