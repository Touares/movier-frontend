import React, { Component } from 'react';
import {movies} from '../services/fakeMovieService'
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { faHeart as emptyHeart} from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import TableHeader from './common/tableHeader';
import TableBody from './common/tableBody';
import {Link} from 'react-router-dom';
import auth from '../services/authService'
import { useState, useEffect, useCallback } from "react";


class Table extends Component {
  state = {
  };


    async componentDidMount() {
      const user = await auth.getCurrentuser();
      this.setState({user})
      if (user && user.is_superuser) {
                this.columns.push(this.deleteColumn());
      }
        // if (user && user.is_superuser) {
        //   console.log(user);
        //   this.columns.push(this.deleteColumn);
        //   console.log(this.columns)
    // }
  }

    liked (m) {
        return m.liked ? <FontAwesomeIcon icon={faHeart} /> : <FontAwesomeIcon icon={emptyHeart} />;
      };
      
      columns = [
        {path:'title', label:'Title', content: m => <Link style={{textDecoration:'none'}} to={`/movies/${m.id}`}>{m.title}</Link>},
        {path:'genre.name', label:'Genre'},
        {path:'numberInStock', label:'Stock'},
        {path:'dailyRentalRate', label:'Rate'},
        {key:'like', content: m => <a style={{cursor: "pointer"}} onClick={()=>this.props.onLike(m)}>{this.liked(m)}</a>}
   ]
    
    
    deleteColumn() {
      return  (
        {key:'delete', content: m => <button onClick={() => this.props.onDelete(m.id)} className='btn btn-danger btn-sm'>Delete</button>}
        )
      }
      
  //     constructor(props) {
  //       super(props)
  //       const user = this.props.user;
  //       console.log(user);
  //       if (user && user.is_superuser) {
  //         console.log(user);
  //         this.columns.push(this.deleteColumn);
  //         console.log(this.columns)
  //     }
  // }

  render() { 

      const { genres, onSort, sortColumn, pageMovies} = this.props
      return (
      <React.Fragment>
        <div className="row">
            <div className="col">
                <table className="table table-hover">
                <TableHeader onSort = {onSort} sortColumn = {sortColumn} columns = {this.columns} />
                  <TableBody genres={genres} data={pageMovies} columns={this.columns} liked = {this.liked} />
                </table>
            </div>
        </div>
        <div className="row">
          <div className="col">
              
            </div>
        </div>

      </React.Fragment>
      );
  }
  

}
 
export default Table;
