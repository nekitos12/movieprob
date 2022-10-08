import {Card, Image, Tag} from "antd";
import React, {Component} from "react";
import FilmCard from '../film-card'

export default class FilmList extends Component {





    // https://api.themoviedb.org/3/search/multi?api_key=<<api_key>>&language=en-US&page=1&include_adult=false



    render (){
        const {filmData}=this.props
        console.log(filmData)
        const filmList = filmData.map(film => {
            return (
                <li key={film.id}>
                    <FilmCard film={film}/>
                </li>
            )
        })
        return (
            <ul>
                {filmList}
            </ul>
        )
    }
}
