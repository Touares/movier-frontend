import React from 'react';
import {getGenres} from '../../services/fakeGenreService'

const Filter = (props) => {
    const {genres} = props;
    
    return ( 
        <ul className="list-group">
            <li style={{cursor: "pointer"}}
             onClick={() => props.onFilter('all')} 
             className={props.filter === 'all' ? "list-group-item active":  "list-group-item"}>All genres</li>
            {genres && genres.map(g => 
            <li style={{cursor: "pointer"}} 
            onClick={() => props.onFilter(g.name)}
             key={g.id} 
             className={g.name === props.filter ? "list-group-item active":  "list-group-item"}>{g.name}</li>
                )}
            
        </ul>
     );
}
 
export default Filter;