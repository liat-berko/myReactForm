
import React, { Component } from 'react'
import PropTypes from 'prop-types';
import './multiselect.css';
import Tooltip from '../tooltip/tooltip';

export class Multiselect extends Component {
    constructor(props) {
        super(props);
          this.checked = [];
          this.searchPlaceholder = `Search for ${props.label}`;
          this.state ={
            checked: [],
            dropDownValue: []
          }
          this.checkBox = this.checkBox.bind(this);
    }

    componentWillMount() {
        this.setState({
            dropDownValue: this.props.data
        });
        if (this.props.options?.defaults && this.props.options.defaults.length > 0) {
            let checkedValue = this.state.checked;
            this.setState({
                checked: [...checkedValue, ...this.props.options.defaults]
            });
        }
    }
    removeChip(value) {
        this.checkBox(value, false);
    }
    checkBox(value, condition) {
        let checkedValue = this.state.checked;
        if(condition) {
            checkedValue.push(value);
        } else {
            let index = checkedValue.indexOf(value);
            checkedValue.splice(index, 1);
        }
        this.value = checkedValue;
        this.setState({
            checked: checkedValue
        }, () => {
            this.props.onSelectOptions(this); 
        });
    }
    searchFun(e) {
        if(e.target.value.length !== 0) {
            let enteredValue = e.target.value.toLowerCase();
            let presentValue = this.props.data.filter(function(data) {
                return data.name.indexOf(enteredValue) > -1;
            })
            this.setState({dropDownValue: presentValue})
        } else {
            this.setState({dropDownValue: this.props.data})
        }
    }
    returnChip() {
        const chip = this.state.checked ? this.state.checked.map((data, index) =>
            <div className="chip-body" key={index}>
                <p className="chip-text">{data}</p>
                <button className="chip-close" onClick={e => this.removeChip(data)}>&times;</button>
            </div>
        ) : []
        return chip;
    }
    returnList() {
        const list = this.state.dropDownValue ? this.state.dropDownValue.map((data, index) =>
        <label className="container" key={index}>{data.name}
        <input type="checkbox" value={data.value} onChange={e => this.checkBox(e.target.value, e.target.checked)} checked = {this.state.checked.includes(data.value) ? true : false} />
        <span className="checkmark"></span>
    </label>
        ) : null;
        return list;
    }
    render() {
        return (
            <div className="inputContainer">
                <div>
                    <label>{this.props.label} </label>
                    <Tooltip errorMessage={this.props.errorMessage} isValid={this.props.isValid}></Tooltip>
                </div>                
                <div className="multiSelect">
                    <div className="chip">
                        {this.returnChip()}                    
                    </div>
                    <input type="text" name="Search" placeholder={this.searchPlaceholder} className="input-box" onChange={e => this.searchFun(e)}/>
                    <div className="search-result">
                        <div className="list-result">
                            {this.returnList()}
                        </div>
                    </div>
                </div>
            </div>
            
        )
    }
}

Multiselect.defaultProps = {
    data: []
}

Multiselect.prototypes = {
    data: PropTypes.array.isRequired,
    onSelectOptions: PropTypes.func
}

export default Multiselect;