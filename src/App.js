import { Card, Col, Row, Image, Tag, Spin } from 'antd';
import React, {Component} from 'react';
import { LoadingOutlined } from '@ant-design/icons';
import FilmList from './components/film-list'
import './App.css';

const antIcon = (
    <LoadingOutlined
        style={{
            fontSize: 24,
        }}
        spin
    />
);

export default class App extends Component{

    state ={
        searchInput:'return',
        filmData:[]
    }
    _API_KEY = '3bc3826aac77d61a282436f0813430f4'
    async getKeywordData() {
        const url=`https://api.themoviedb.org/3/search/keyword?api_key=${this._API_KEY}&query=${this.state.searchInput}`
        const res = await fetch(url)
        return await res.json()
    }

    async getFilmArray (){
        const data = await this.getKeywordData()
        const filmArray = await fetch(`https://api.themoviedb.org/3/keyword/${data.results[0].id}/movies?api_key=${this._API_KEY}`)
        const films = await filmArray.json()
        this.setState(() => {
            return {
                filmData: films.results
            }
        })
    }
    // getFilmData =()=> {
    //     const data = this.getFilmArray()
    //     data.then(res=> {
    //         this.setState(() => {
    //             return {
    //                 filmData: res.results
    //             }
    //         })
    //     })
    //
    // }


    render (){
        console.log(this.state.filmData)
        return (
            <div className="site-card-wrapper">
                <Spin indicator={antIcon} onClick={this.getFilmArray.bind(this)}/>
                <Row justify="space-evenly" gutter={[0, 36]}  className="site-card-row">

                    <FilmList filmData={this.state.filmData} />

                </Row>
            </div>
        )
    }

}


