import React,  { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { getLeads, deleteLeads } from '../../actions/leads'

export class Leads extends Component {
    
    static propTypes = {
        leads: PropTypes.array.isRequired,
        getLeads: PropTypes.func.isRequired,
        deleteLeads: PropTypes.func.isRequired,
    }
    
    componentDidMount(){
        this.props.getLeads()

    }

    render() {
        return (
            <div>
                <Fragment>
                    <h2>Leads List</h2>
                    <table className="table table-striped">
                    <thead>
                        <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Message</th>
                        <th />
                        </tr>
                    </thead>
                    <tbody>
                        {this.props.leads.map((lead) => (
                        <tr key={lead.id}>
                            <td>{lead.id}</td>
                            <td>{lead.name}</td>
                            <td>{lead.email}</td>
                            <td>{lead.message}</td>
                            <td>
                            <button
                                onClick={this.props.deleteLeads.bind(this, lead.id)}
                                className="btn btn-danger btn-sm"
                            >
                                {' '}
                                Delete
                            </button>
                            </td>
                        </tr>
                        ))}
                    </tbody>
                    </table>
                </Fragment> 
            </div>
        )
    }


} 

//convert a state to this component props
const mapStateToProps = (state) => ({
    leads: state.leads.leads
})

//console.log(getLeads)
//const LeadsConnect = connect(mapStateToProps, {getLeads})(Leads)

export default connect(mapStateToProps, { getLeads, deleteLeads })(Leads)
