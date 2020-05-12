import React from 'react';
import CaseListComponent from './components/CaseListComponent';

const CaseList = {
    routeProps: {
        path: '/caselist',
        component: CaseListComponent,
        exact: true
    },
    name: 'CaseList'
}


export default CaseList;
