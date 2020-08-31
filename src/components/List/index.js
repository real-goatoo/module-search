import React, { Component } from 'react';
import Module from '../Module';
import axios from 'axios';

import './List.scss';
import SearchInput from "../SearchInput";
import {Button, Form, Container, Grid} from "semantic-ui-react";


export default class List extends Component {
    constructor(props) {
        super(props);

        this.state = {
            modules: [],
            search: ""
        }
    }

    getModules = (nextPageLink = null, reset = false) => {
        const url = nextPageLink !== null ? nextPageLink : "https://packagist.org/search.json?per_page=15&type=thelia-module&q="+this.state.search;

        axios.get(url, {

        })
            .then(response => {
                const responseModules = response.data.results.map(function (module) {
                    const moduleVendorAndPackage = module.name.split('/');
                    return {
                        vendor:moduleVendorAndPackage[0],
                        package:moduleVendorAndPackage[1],
                        ...module
                    };
                });

                let modules = reset ? responseModules : this.state.modules.concat(responseModules);
                // handle success
                this.setState({
                    modules: modules,
                    nextPageLink: response.data.next ?? null
                });
            })
            .catch(error => {
                // handle error
                console.log(error);
            })
    }

    doSearch = (search) => {
        this.setState({
            search: search
        }, () => {
            this.getModules(null, true);
        })
    }

    componentDidMount() {
        this.getModules();
    }

    render() {
        const { modules, nextPageLink } = this.state;

        return (
            <div>
                    <Container>
                        <Form>
                            <SearchInput doSearch={this.doSearch} textAlign='center'/>
                        </Form>
                    </Container>
                    <Container inverted fluid className="List" style={{ padding: 40 }}>
                        <Grid divided="vertically">
                            <Grid.Row columns={3}>
                                {modules.map((module, index) => <Grid.Column><Module {...module} /></Grid.Column>)}
                            </Grid.Row>
                        </Grid>
                    </Container>
                    <Container textAlign='center' style={{marginBottom:"1em"}}>
                        {nextPageLink !== null ? <Button content="See more" onClick={() => {this.getModules(nextPageLink)}}/> : null}
                    </Container>
            </div>
        )
    }
}
