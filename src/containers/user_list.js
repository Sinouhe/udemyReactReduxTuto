import React, { Component } from 'react';
import { connect } from 'react-redux';
import { selectUser } from '../actions/index';
import { bindActionCreators } from 'redux';
import UserDetail from '../containers/user_detail';

class UserList extends Component {
    render () {
        return (
            <div>
                <ul className='col-md-4'>
                {
                    this.props.myUsers.map((user) => {
                        return (
                            <li className="list-goup-item" 
                                key={user.id}
                                onClick={ () => this.props.selectUser(user)}>
                                {user.name}
                            </li>
                        )
                    })
                }
                </ul>
                <UserDetail/>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        myUsers : state.users
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({selectUser:selectUser}, dispatch)
}

export default connect(mapStateToProps,mapDispatchToProps)(UserList)