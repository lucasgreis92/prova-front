import React, { Component, Fragment, createRef } from 'react';
import Header from '../../../../components/Header';
import CaseService from '../../../../services/CaseService';
import PopUp from '../../../../components/PopUp';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import {  Button, Card, Row, Col, RadioGroup, FormControlLabel, Radio } from 'react-materialize';
import { Box } from '@material-ui/core'
class CaseComponent extends Component {


    constructor(props) {
        super(props);
        this.state = {
                    case: {
                        id: props.location.state && props.location.state.id !== 'new' ? props.location.state.id : 'new',
                        folder: '',
                        client: '',
                        title: '',
                        responsible: '',
                        tags: '',
                        description: '',
                        comments: ''
                    }
                 };

        this.onChangeDefault = this.onChangeDefault.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.tratarResp = this.tratarResp.bind(this);
    }

    componentDidMount() {
        if (this.state.case.id && this.state.case.id !== 'new') {
            CaseService.findById(this.state.case.id)
            .then( res => {
                this.tratarResp(res);
                this.setState({case: res});
            })
            .catch(err => {
                PopUp.exibeMensagem('error', 'Communication error, try again later.')
            });
        }

    }


    onChangeDefault(e){
        var value;
        if(e.currentTarget.type === 'checkbox'){
            value = e.currentTarget.checked
        } else {
            value = e.currentTarget.value;
        }

        var state = this.state.case;
        state[e.currentTarget.id] = value;
        this.setState({case: state});
    }
    tratarResp(res) {
        let tags = '';
        if (res.tags) {
            for (const tag of res.tags) {
                tags += tag;
            }
            res.tags = tags;
        }
    }
    handleSubmit = e => {
        e.preventDefault();
        let body = this.state.case;
        console.log(body.tags);
        if (body.tags) {
            body.tags = body.tags.split(',');
        } else {
            body.tags = [];
        }
        if (this.state.case.id === 'new') {
            body.id = undefined;
            body.access = 'PUBLIC';
            body = JSON.stringify(body);
            console.log(body);
            CaseService.post(body)
            .then( res => {
                this.tratarResp(res);
                this.setState({case: res});
                 PopUp.exibeMensagem('success', 'New case successfully submited.')
            })
            .catch(err => {
                PopUp.exibeMensagem('error', 'Communication error, try again later.')
            });
        } else {
            console.log(JSON.stringify(body));
            CaseService.put(body.id, JSON.stringify(body))
            .then( res => {
                this.tratarResp(res);
                this.setState({case: res});
                PopUp.exibeMensagem('success', 'Case successfully submited.')
            })
            .catch(err => {
                PopUp.exibeMensagem('error', 'Communication error, try again later.')
            });
        }
    }

    render() {
        return (
            <Fragment >
                <Header />
                   <div className="container mb-10 center">
                        <h1>Case {this.state.case.id} </h1>
                   </div>
                <div className="container mb-10 center">
                <Card >

                 <ValidatorForm noValidate
                      ref="form"
                      onSubmit={this.handleSubmit}
                      onError={errors => console.log(errors)}>

                            <Row >
                            <Col className="s8">
                            <TextValidator
                                  fullWidth
                                  type="input"
                                  ref="folder"
                                  label="Folder"
                                  onChange={this.onChangeDefault}
                                  name="folder"
                                  id="folder"
                                  value={this.state.case.folder}
                                  maxLength="40"
                              />
                            </Col>
                            </Row>

                            <Row>
                             <Col className="s8">
                              <TextValidator
                                  fullWidth
                                  type="input"
                                  ref="client"
                                  label="Client"
                                  onChange={this.onChangeDefault}
                                  name="client"
                                  id="client"
                                  value={this.state.case.client}
                                  validators={['required']}
                                  maxLength="250"
                                  errorMessages={['Client is required']}
                              />
                              </Col>
                            </Row>
                            <Row>
                             <Col className="s8">
                              <TextValidator
                                  fullWidth
                                  type="input"
                                  ref="title"
                                  label="Title"
                                  id="title"
                                  onChange={this.onChangeDefault}
                                  name="title"
                                  value={this.state.case.title}
                                  validators={['required']}
                                  errorMessages={['Title is required']}
                              />
                              </Col>
                            </Row>
                            <Row>
                             <Col className="s6">
                              <TextValidator
                                 fullWidth
                                 type="input"
                                  ref="responsible"
                                  label="Responsible"
                                  id="responsible"
                                  onChange={this.onChangeDefault}
                                  name="responsible"
                                  value={this.state.case.responsible}
                                  validators={['required']}
                                  errorMessages={['Responsible is required']}
                              />
                              </Col>
                            </Row>
                            <Row>
                             <Col className="s6">
                              <TextValidator
                                  fullWidth
                                  type="input"
                                  ref="tags"
                                  id="tags"
                                  label="Tags"
                                  onChange={this.onChangeDefault}
                                  name="tags"
                                  value={this.state.case.tags}
                              />
                              </Col>
                            </Row>
                            <Row>
                             <Col className="s6">
                              <TextValidator
                                  fullWidth
                                  type="input"
                                  id="description"
                                  ref="description"
                                  label="Description"
                                  onChange={this.onChangeDefault}
                                  name="description"
                                  value={this.state.case.description}
                              />
                              </Col>
                            </Row>
                            <Row>
                             <Col className="s12">
                              <TextValidator
                                 fullWidth
                                  type="input"
                                  ref="comments"
                                  id="comments"
                                  label="Comments"
                                  onChange={this.onChangeDefault}
                                  name="comments"
                                  value={this.state.case.comments}
                              />
                              </Col>
                            </Row>
                             <Row>
                              { this.state.case.id && this.state.case.id !== 'new' ?
                                  <Button type="submit">Update</Button> :
                                  <Button type="submit">Create</Button>
                              }
                              </Row>
                          </ValidatorForm>
                </Card>
            </div>

            </Fragment>
        );
    }
}
export default CaseComponent;
