import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';

class DataTable extends Component {

    constructor(props) {
        super(props)
    }

    render() {

        return (
            <table className='centered highlight'>
                <thead>
                    <tr key='title'>
                        {this.props.columns.map(col =>
                         <th key={col.title}> {col.title}</th>
                        )}
                        {this.props.actions && this.props.actions.length > 0 ? <th key='acoes'> Ações </th> : null}
                    </tr>
                </thead>
                <tbody>
                    {this.props.data && this.props.data.length > 0 ?
                    this.props.data.map(item =>
                            <tr  key={`${item.id}`}>
                                {this.props.columns.filter( col => {return col.field}).map(col =>
                                    <td key={`${item.id}${item[col.field]}`}> {item[col.field]} </td>
                                )}

                                {this.props.actions && this.props.actions.length > 0 ?
                                    this.props.actions.map(act =>
                                        <td key={`${item.id}${act.id}`}>
                                            <div>
                                                <Button
                                                    variant="contained"
                                                    color="primary"
                                                    endIcon={<Icon>{act.icon}</Icon>}
                                                    onClick={e => act.click(item)}>
                                                    {act.title}
                                                </Button>
                                            </div>
                                        </td>
                                    )
                                : null}

                            </tr>)
                     : null}
                </tbody>
            </table>
        );
    }

}
export default DataTable;

