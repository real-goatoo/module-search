import React, { Component } from 'react'
import {Icon, Input, Form} from "semantic-ui-react";

export default class SearchInput extends Component {
    componentDidMount(){
        this.searchInput.focus();
    }

    render () {
        const doSearch = this.props.doSearch;
        return (
            <Form.Field>
                <Input
                    ref={(input) => { this.searchInput = input; }}
                    size="huge"
                    icon={<Icon name='search' inverted circular link />}
                    placeholder='Search your module here'
                    value={this.props.defaulValue}
                    type="text"
                    onChange={(e) => doSearch(e.target.value)}
                />
            </Form.Field>
        );
    }
}