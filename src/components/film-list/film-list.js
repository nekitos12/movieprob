import React, {Component} from 'react';
import FilmCard from '../film-card'
import './film-list.css'

export default class FilmList extends Component {





    // https://api.themoviedb.org/3/search/multi?api_key=<<api_key>>&language=en-US&page=1&include_adult=false

    render (){
        const {filmData, api_key}=this.props
        const filmList = filmData.map(film => {
            return (
                <li key={film.id} className="films__list-item">
                    <FilmCard film={film}/>
                </li>
            )
        })
        return (
            <ul className="films__list">
                {filmList}
            </ul>
        )
    }
}
