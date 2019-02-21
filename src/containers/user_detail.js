import React, { Component } from 'react';
import {connect} from 'react-redux';

class userDetail extends Component {
    render () {
        const {myActiveUser} = this.props
        if(!myActiveUser) {
            return <div>Selectionner un tulisateur pour démarrer</div>
        }
        return (
            <div>
                <h1>Détail de {myActiveUser.name}</h1>
                <ul>id : {myActiveUser.id}</ul>
                <ul>role : {myActiveUser.role}</ul>
                <ul>actif : {myActiveUser.active}</ul>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        myActiveUser : state.activeUser
    }
}

export default connect(mapStateToProps)(userDetail)