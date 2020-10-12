import React, { Component } from 'react'
import './Module.scss'
import axios from 'axios';
import semver from 'semver';
import {Button, Card, Grid, Icon, Message, Popup} from "semantic-ui-react";

export default class Module extends Component {
    constructor(props) {
        super(props);

        this.state = {
            init: false,
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
                        init:true,
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
        let composerRequireCommand = "composer require "+this.props.name;
        if (lastVersion) {
            composerRequireCommand = composerRequireCommand+" ~"+lastVersion.version;
        }

        return (
            <Card fluid className="Module" color={"pink"}>
                <Card.Content>
                    <Card.Header ><h2>{this.props.package}</h2></Card.Header>
                    <Card.Meta>By {this.props.vendor}</Card.Meta>
                    <Card.Description>
                        <p>{this.props.description}</p>
                        <Grid>
                            <Grid.Column floated='left' width={14}>
                                <Message size='small'>{composerRequireCommand}</Message>
                            </Grid.Column>
                                <Grid.Column floated='right' width={2}>
                                    <Popup
                                        position='top center'
                                        trigger={<Button className={"secondary"} circular icon='clipboard' onClick={() => navigator.clipboard.writeText(composerRequireCommand)} />}
                                        content={'Command copied!'}
                                        on='click'
                                        mouseLeaveDelay={500}
                                    />
                                </Grid.Column>
                        </Grid>
                    </Card.Description>
                </Card.Content>
                <Card.Content extra>
                    <div className='ui two buttons'>
                        <a className="fluid ui button " href={this.props.repository} target="_blank">
                            <Icon name='github'/> Github
                        </a>
                        <a className="fluid ui button " href={this.props.url} target="_blank">
                            <Icon name='cube'/> Packagist
                        </a>
                    </div>
                </Card.Content>
            </Card>
        )
    }
}