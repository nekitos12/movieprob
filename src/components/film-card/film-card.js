import {Card, Image, Tag} from "antd";
import React from "react";
import './film-card.css'

function FilmCard (props){
    const {id, original_title, overview, poster_path, release_date} = props.film
    const getCutText = (text, maxLength = 150)=>{
        const spaceBeforeCut = text.indexOf(' ', maxLength)
        return text.slice(0, spaceBeforeCut) + '...'
    }
    const withoutPoster = `https://www.google.com/search?q=react&rlz=1C1GGRV_enRU1011RU1012&sxsrf=ALiCzsaN71Jqo61EymPrK-LMvqGeZNTWKQ:1665576636945&tbm=isch&source=iu&ictx=1&vet=1&fir=HD3eXsrstv-_cM%252CuDQPDMqXXQYhqM%252C%252Fm%252F012l1vxv%253BviJ6CsTiT3pOsM%252C0-u43g85FJxxkM%252C_%253Ba0Y2JqcINbfO3M%252Cmr-PmlexLH5v6M%252C_%253BHkHPwN1RaGFlsM%252CWCcKjTXzHDB6aM%252C_%253BfcxeMDIYnT6N2M%252CLBjQh0D3VXjoEM%252C_&usg=AI4_-kQvZLBUkfy7KVRjgw34iS5gdsQQZg&sa=X&ved=2ahUKEwje6Km-1Nr6AhVyx4sKHeSDA8AQ_B16BAhZEAE#imgrc=HD3eXsrstv-_cM`

    const overviewText = getCutText(overview)

    return (
        <div className="film-card films__card">

            <img className="film-card__poster" src={poster_path ?`https://image.tmdb.org/t/p/w185/${poster_path}`: withoutPoster}/>

            <Card className="film-card__descr">
                <p className="film-card__title">{original_title}</p>
                <p className="film-card__date">{release_date}</p>

                <p className="film-card__overview">{overviewText}</p>
            </Card>
        </div>

    )
}

export default FilmCard