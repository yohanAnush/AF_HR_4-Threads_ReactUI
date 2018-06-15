import React,{Component} from 'react';
import PropTypes from "prop-types";

export default class UpdateEmployee extends  Component{

    static get propTypes() {
        return {
            onTextChange: PropTypes.func,
        }
    }

    constructor(props){
        super(props);
        this.onTextChange = this.props.onTextChange.bind(this);
    }

    render(){
        return(
            <div className="right-search">
                <div className="row">
                    <div id="custom-search-input">
                        <div className="input-group col-md-12">
                            <input type="text" className="search-query form-control" placeholder="Search by name" onChange={this.onTextChange}/>
                            <span className="input-group-btn">
                                <button className="btn btn-primary" type="button">
                                    <span className="fa fa-search"></span>
                                </button>
                            </span>
                        </div>
                        <br/>
                    </div>
                </div>
            </div>
        );
    }
}