import React, { Component, Fragment } from 'react';
import Header from '../../../../components/Header';
import DataTable from '../../../../components/DataTable';
import CaseService from '../../../../services/CaseService';
import PopUp from '../../../../components/PopUp';
import { Redirect } from 'react-router';

class CaseListComponent extends Component {

    constructor(props) {
        super(props);

        this.goToCase = this.goToCase.bind(this)
        this.state = {
            columns: [
                {
                    title: 'Folder',
                    field: 'folder'
                },
                {
                    title: 'Client',
                    field: 'client',
                },
                {
                    title: 'Title',
                    field: 'title'
                }
            ],
            actions:[
                {
                    title: 'Detalhe',
                    icon: 'send',
                    id: 'detalhe',
                    click: this.goToCase
                }
            ],
            data: [],
            fgoToCase: false
        };
    }

    componentDidMount(){
        CaseService.findAll()
        .then( res => {
            this.setState({data: res._embedded.case});
        })
        .catch(err => {
            PopUp.exibeMensagem('error', 'Communication error, try again later.')
        });

    }

    goToCase(val) {
        let id =  val.id || 'new';
        this.setState({fgoToCase: true, selectedCaseId: id});
    }

    render() {
        if (this.state.fgoToCase) {
            return <Redirect push to={{pathname: '/case', state: {id: this.state.selectedCaseId}}}/>;
        }

        return (
            <Fragment>
                <Header />
                <div className="container mb-10">
                    <h1>Cases</h1>
                    <DataTable data={this.state.data} columns={this.state.columns} actions={this.state.actions}/>
                </div>
            </Fragment>
        );
    }
}
export default CaseListComponent;
