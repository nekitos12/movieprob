import React, {Component} from 'react';

import './film-wrapper.css'
import {Alert, Pagination, Spin} from "antd";
import FilmList from "../film-list";


import { LoadingOutlined } from '@ant-design/icons';
import {debounce} from "lodash";

const antIcon = (
    <LoadingOutlined
        style={{
            fontSize: 24,
        }}
        spin
    />
);

export default class FilmWrapper extends Component {
    state={
        currentPage:1,
        alert: null,
        filmData: {
            results: [],
            total_pages: 1
        }
    }
    debounceFunc = debounce(this.getFilmArray,500)
    componentDidMount() {

    }

    componentWillUnmount() {
    }
    componentDidUpdate(prevProps, prevState, snapshot) {

        if (prevProps.searchInput!== this.props.searchInput ||prevState.currentPage!==this.state.currentPage) {
            this.debounceFunc()
        }

    }

    onPageChange=(num, size)=>{
        this.setState(()=>{
            return {
                currentPage: num
            }
        })
    }

    async getKeywordData (){
        try {
            if (this.props.searchInput===''){
                return {}
            }
            const url = `https://api.themoviedb.org/3/search/keyword?api_key=${this.props.apiKey}&query=${this.props.searchInput}`
            const keywordData = await fetch(url)
            return await keywordData.json()
        }
        catch (e){
            console.log('ошибка в получении keyword')
        }


    }

    async getFilmArray (){

        try {
            console.log(this.state.currentPage)
            const res = await this.getKeywordData()
            const url = `https://api.themoviedb.org/3/keyword/${res.results[0].id}/movies?api_key=${this.props.apiKey}&page=${this.state.currentPage}`
            const filmArray = await fetch(url)
            const res2 = await filmArray.json()
            this.props.setLoading()
            this.setState(() => {
                return {
                    filmData: res2,
                    alert: null,
                    currentPage: 1
                }
            })
        }
        catch (e){
            this.props.setLoading()
            this.setState(()=>{
                return {
                    filmData: {
                        results:[]
                    },
                    alert:( <Alert
                        message={e.name=="TypeError"? "По вашему ключевому слову ничего не найдено":"Введите поисковой запрос"}
                        type="warning"
                    />)
                }
            })
        }
    }


    // https://api.themoviedb.org/3/search/multi?api_key=<<api_key>>&language=en-US&page=1&include_adult=false

    render () {
        console.log(this.state.filmData)
        return (
            <div className="films-wrapper">
                {this.props.loading
                    ? <div className="films__spinner" >
                        <Spin indicator={antIcon}/>
                    </div>
                    :
                    <FilmList
                        filmData={this.state.filmData.results}
                        alert={this.state.alert}
                        searchInput={this.props.searchInput}
                        onPageChange={this.onPageChange}
                        totalPages={this.state.filmData.total_pages}
                    />
                }
            </div>

        )
    }
}
