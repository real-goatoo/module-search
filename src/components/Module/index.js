import React, { Component } from 'react'
import classNames from 'classnames'
import './Module.scss'
import axios from 'axios';
import semver from 'semver';
import {Button, Card, Container, Grid, Icon, Message, Segment} from "semantic-ui-react";

export default class Module extends Component {
    constructor(props) {
        super(props);

        this.state = {
            lastVersion: null
        }
    }

    getAdditionalData() {
        axios.get('https://repo.packagist.org/p/'+this.props.name+".json")
            .then(response => {
                const packageVersions = response.data.packages[this.props.name];
                const lastVersionNumber = Object.keys(packageVersions)
                    .map(version => semver.valid(version) ? version : version+'.0')
                    .filter(version => semver.valid(version))
                    .sort(semver.rcompare)[0];
                this.setState(
                    {
                        lastVersion: packageVersions[lastVersionNumber]
                    }
                );
            });
    }

    componentDidMount() {
        this.getAdditionalData();
    }

    render() {
        const { lastVersion } = this.state;
        const approvedVendors = ['cqfdev'];
        let vendor = "";
        if (this.props.vendor === "thelia") {
            vendor = 'official';
        }

        if (approvedVendors.indexOf(this.props.vendor) !== -1) {
            vendor = "approved";
        }

        return (
            <Card fluid className="Module" color={"yellow"}>
                <Card.Content>
                    <Card.Header ><h2>{this.props.package}</h2></Card.Header>
                    <Card.Meta>By {this.props.vendor}</Card.Meta>
                    <Card.Description>
                        {this.props.description}
                        <Grid>
                            <Grid.Column floated='left' width={14}>
                                <Message size='small'>composer require {this.props.name} {lastVersion ? "~"+lastVersion.version: null}</Message>
                            </Grid.Column>
                                <Grid.Column floated='right' width={2}>
                                    <Button circular icon='clipboard' />
                                </Grid.Column>
                        </Grid>

                    </Card.Description>
                </Card.Content>
                <Card.Content extra>
                    <div className='ui two buttons'>
                        <a className="fluid ui button" href={this.props.repository}>
                            <Icon name='github'/> Github
                        </a>
                        <a className="fluid ui button" href={this.props.url}>
                            <Icon name='cube'/> Packagist
                        </a>
                    </div>
                </Card.Content>
                {/*<p>by {this.props.vendor}</p>*/}
                {/*<p className={classNames('Module-vendor', 'Module-'+vendor)}>{vendor}</p>*/}
                {/*<p className="Module-description">{this.props.description}</p>*/}
                {/*<p className="Module-composer">composer require {this.props.name} {lastVersion ? "~"+lastVersion.version: null}</p>*/}
                {/*<p className="Module-stats">{this.props.favers} stars - {this.props.downloads} download</p>*/}
                {/*<p className="Module-packagist"><a href={this.props.url}>View it on packagist</a></p>*/}
            </Card>
        )
    }
}