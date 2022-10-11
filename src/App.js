import React, {Component} from 'react';
import FilmList from './components/film-list'
import './App.css';
import { Offline, Online } from "react-detect-offline";

import { Card, Col, Row, Image, Tag, Spin, Input } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

const { Search } = Input;





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
        searchInput:'',
        filmData:[],
        loading: false
    }
    _API_KEY = '3bc3826aac77d61a282436f0813430f4'

    async getKeywordData (){
        const url = `https://api.themoviedb.org/3/search/keyword?api_key=${this._API_KEY}&query=${this.state.searchInput}`
        const keywordData = await fetch(url)
        return await keywordData.json()
    }
    async getFilmArray (){
        const res = await this.getKeywordData()
        const url = `https://api.themoviedb.org/3/keyword/${res.results[0].id}/movies?api_key=${this._API_KEY}&`
        const filmArray = await fetch(url)
        const res2 = await filmArray.json()
        this.setState(() => {
            return {
                filmData: res2.results,
                loading:false
            }
        })
    }

    onChange =()=>(e)=>{
        console.log(e.target.value)
        this.setState(()=>{
            return {
                searchInput: e.target.value,
                loading: true
            }
        })
        this.getFilmArray()
        //     .then(res=>{
        //     this.setState(() => {
        //         return {
        //             filmData: res.results,
        //             loading:false
        //         }
        //     })
        // })
    }
    render (){
        return (
            <div className="site-card-wrapper">
                <Online>
                    <input
                        type="search"
                        placeholder="input search text"
                        onChange={this.onChange.call(this)}
                        value={this.state.searchInput}
                    />
                    <div className="films">
                        {this.state.loading
                            ? <div className="films__spinner" >
                                <Spin indicator={antIcon}/>
                            </div>
                            :
                            <FilmList
                                filmData={this.state.filmData}
                                api_key={this._API_KEY}
                            />
                        }
                    </div>

                </Online>
                <Offline>Only shown offline (surprise!)</Offline>
            </div>
        )
    }

}


