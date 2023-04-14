import React, { Component } from 'react';
import _ from 'lodash';
import {Link} from 'react-router-dom'

class TableBody extends Component {
    renderCell (item, column) {
        if (column.content) {return column.content(item)};
        return _.get(item, column.path);
    }
    render() { 
        const {data, columns} = this.props;
        return (
            <tbody>
                {data.map(item => 
                    <tr key={item.id}>
                        {columns.map(c => 
                            <td key={c.path}>{this.renderCell(item, c)}</td>
                            )}
                        </tr>
                    )}
            </tbody>
        );
    }
}
 
export default TableBody;