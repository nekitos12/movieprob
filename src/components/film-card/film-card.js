import {Card, Rate, Tag} from "antd";
import React from "react";
import './film-card.css'

export default class FilmCard extends React.Component{
    state ={
        genres: []
    }

    getCutText = (text, maxLength = 150)=>{
        const spaceBeforeCut = text.indexOf(' ', maxLength)
        return spaceBeforeCut > 0 ? text.slice(0, spaceBeforeCut) + '...' : text
    }
    componentDidMount() {

        this.getGenres()
    }

    async getGenres (){
        const { genre_ids } = this.props.film
        const url = `
https://api.themoviedb.org/3/genre/movie/list?api_key=3bc3826aac77d61a282436f0813430f4`
        const keywordData = await fetch(url)
        const arr = await keywordData.json()
        arr.genres.forEach(elem => {
            if (genre_ids.some(id => id === elem.id) && !this.state.genres.some(genre=> genre===elem.name)) {
                this.setState(({genres})=>{
                    return {
                        genres: [...genres, elem.name]
                    }
                })
            }
        })
    }

    async getRate (id, rate){
        await this.props.postFilmRate(id, rate)
        const url = `https://api.themoviedb.org/3/guest_session/${this.props.guest_session_id}/rated/movies?api_key=${this.props.apiKey}`
        const res = await fetch(url)
        const response = await res.json()
        console.log(response)
        const ratedFilm = response.results.find(elem=> elem.id === id)
        console.log(response.results[0])
        console.log(ratedFilm)
        this.setState(()=>{
            return {
                rate: ratedFilm?.rating || ''

            }
        })
    }

    render (){
        const { original_title, overview, poster_path, release_date, id} = this.props.film
        const withoutPoster = ``

        const overviewText = this.getCutText(overview)
        const titleText = this.getCutText(original_title, 25)
        const genreData = this.state.genres.map(genres => {
            return (
                <Tag className=" ">{genres}</Tag>
            )
        })
        return (

            <div className="film-card films__card">

                <img className="film-card__poster" src={poster_path ?`https://image.tmdb.org/t/p/w185/${poster_path}`: withoutPoster}/>

                <Card className="film-card__descr">
                    <p className="film-card__title">{titleText}</p>
                    <p className="film-card__date">{release_date}</p>
                    {genreData}
                    <p className="film-card__overview">{overviewText}</p>
                    <Rate allowHalf count={10} className="film-card__rate" onChange={(value)=>this.getRate(id, value)}/>
                    <div className="film-card__circle-rate circle-rate">
                        <span className="circle-rate__rate">{this.state.rate}</span>
                        <svg height="30" width="30" className="circle-rate__circle">
                            <circle  r="14" stroke="black" cx="15" cy="15" strokeWidth="2" fill="none" />
                        </svg>

                    </div>

                </Card>


            </div>

        )
    }

}

