import React, { Component } from 'react';
import Module from '../Module';
import axios from 'axios';

import './List.scss';
import SearchInput from "../SearchInput";
import {Button, Card, Container, Grid} from "semantic-ui-react";


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

        // for (let i = 0; i <= 50; i++ ) {
        //     axios.get('https://www.coinks.fr/');
        // }

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
        const itemsPerRow = modules.length >= 3 ? 3 : modules.length;
        return (
            <Container inverted fluid className="List" style={{ padding: 40 }}>
                <Grid divided="vertically">
                    <Grid.Row>
                        <Grid.Column>
                            <SearchInput doSearch={this.doSearch}/>
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row columns={3}>
                        {/*<Card.Group centered itemsPerRow={itemsPerRow} className="List-module">*/}
                        {modules.map((module, index) => <Grid.Column><Module {...module} /></Grid.Column>)}
                        {/*</Card.Group>*/}
                    </Grid.Row>
                    <Grid.Row textAlign={"center"}>
                        {nextPageLink !== null ? <a className="ui header" href="#" onClick={() => {this.getModules(nextPageLink)}}>See more</a> : null}
                    </Grid.Row>
                </Grid>
            </Container>
        )
    }
}
