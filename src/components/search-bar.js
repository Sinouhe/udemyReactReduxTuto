import React,{Component} from 'react';

class SearchBar extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
                serachText: '', 
                placeHolder: 'Tapez cotre film...',
                intervalBeforeRequest: 1000,
                lockRequest: false
            }
    }

    render() {
        return (
            <div className='row'>
                <div className='col-md-8 input-group'>
                    <input  className='form-control'
                            onChange={this.handleChange.bind(this)}
                            type='text' 
                            placeholder={this.state.placeHolder}/>
                    <span className='input-group-btn'>
                        <button className='btn btn-primary' onClick={this.search.bind(this)}>GO !</button>
                    </span>
                </div>
            </div>
        )
    }    

    handleOnClick(event) {
        this.search();
    }

    search(){
        this.props.callback(this.state.searchText);
        this.setState({lockRequest: false});
    }

    handleChange(event) {
        this.setState({searchText:event.target.value});
        if(!this.state.lockRequest) {
            this.setState({lockRequest: true});
            setTimeout(() => {
               this.search().bind(this); 
            }, this.state.intervalBeforeRequest);
        }
    }
}

export default SearchBar;