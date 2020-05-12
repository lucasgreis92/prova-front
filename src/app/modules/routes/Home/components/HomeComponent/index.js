import React, { Component, Fragment } from 'react';
import Header from '../../../../components/Header';
import './css/Home.css';
import 'materialize-css/dist/css/materialize.min.css';

class HomeComponent extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Fragment>
                <Header />
                <div className="container mb-10">
                    <h1>Home</h1>

                </div>
            </Fragment>
        );
    }
}
export default HomeComponent;
