import React, { Component } from 'react'
import {Icon} from "semantic-ui-react";
import './Abandoned.scss'

export default class Abandoned extends Component {
    render() {
        const link = "/module-search?q="+this.props.package;
        return (
            <div className="Abandoned">
                <Icon name='exclamation circle' color='primary' size='large'/>
                This package is abandoned, please use <a href={link}>{this.props.package}</a> instead
            </div>
        )
    }
}
