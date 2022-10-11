import {Card, Image, Tag} from "antd";
import React from "react";
import './film-card.css'

function FilmCard (props){
    const {id, original_title, overview, poster_path, release_date} = props.film
    const getCutText = (text, maxLength = 150)=>{
        const spaceBeforeCut = text.indexOf(' ', maxLength)
        return text.slice(0, spaceBeforeCut) + '...'
    }

    const overviewText = getCutText(overview)

    return (
        <div className="film-card films__card">

            <img className="film-card__poster" src={`https://image.tmdb.org/t/p/w185/${poster_path}`}/>

            <Card className="film-card__descr">
                <p className="film-card__title">{original_title}</p>
                <p className="film-card__date">{release_date}</p>

                <p className="film-card__overview">{overviewText}</p>
            </Card>
        </div>

    )
}

export default FilmCard