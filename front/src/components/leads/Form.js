import React, { Component } from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import { addLeads } from '../../actions/leads'


export class Form extends Component {

    state = {
        name:'',
        email:'',
        message:''
    }

    static propTypes = {
        addLeads: PropTypes.func.isRequired
    }

    onChange = e => this.setState({ [e.target.name]: e.target.value })

    onSubmit = e => {
        e.preventDefault()
        const {name, email, message} = this.state
        const lead = {name, email, message}
        this.props.addLeads(lead)
        this.setState({
            name: '',
            email: '',
            message: '',
          });
    }

    render() {
        const {name, email, message} = this.state

        return (
            <div className="card card-body mt-4 mb-4">

                <h2>Add New Lead Form</h2>

                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Name</label>
                        <input className="form-control" name="name" type="text" onChange={this.onChange} value={name} />
                    </div>

                    <div className="form-group">
                        <label>Email</label>
                        <input className="form-control" name="email" type="email" onChange={this.onChange} value={email} />
                    </div>

                    <div className="form-group">
                        <label>Message</label>
                        <textarea className="form-control" name="message" type="text" onChange={this.onChange} value={message} />
                    </div>

                    <div className="form-group">
                        <button type="submit" className="btn btn-primary" >
                            Submit
                        </button>
                    </div>

                </form>
                 
            </div>
        )
    }
}

export default connect(null, {addLeads})(Form)
 