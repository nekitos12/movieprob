import React, {Component} from 'react';
import FilmCard from '../film-card'

import './film-list.css'
import {Pagination} from "antd";

export default class FilmList extends Component {


    // https://api.themoviedb.org/3/search/multi?api_key=<<api_key>>&language=en-US&page=1&include_adult=false

    render (){
        const {filmData,alert,searchInput, onPageChange, totalPages, currentPage, startPage} = this.props
        const elements = filmData.length? filmData.map(film => {
            return (
                <li key={film.id} className="films__list-item">
                    <FilmCard
                        postFilmRate={this.props.postFilmRate}
                        film={film}
                        searchInput={searchInput}
                        apiKey={this.props.apiKey}
                        guest_session_id={this.props.guest_session_id}
                    />
                </li>
            )
        }) :null
        return (
            <>
                {searchInput===''? null:alert}
                <ul className="films__list">
                    {elements}
                </ul>
                {elements?<Pagination onChange={onPageChange} defaultPageSize ={20} defaultCurrent={startPage || currentPage} total={totalPages*20}/>:null}
            </>

        )
    }
}
