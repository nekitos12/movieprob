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
    basePhrase = <Alert message="Введите ключевое слово" type="info" />
    state={
        currentPage:1,
        alert: null,
        filmData: {
            results: [],
            total_pages: 1
        },
        basePhrase: this.basePhrase,
    }

    startPage = 1

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
            const res = await this.getKeywordData()
            const url = `https://api.themoviedb.org/3/keyword/${res.results[0].id}/movies?api_key=${this.props.apiKey}&page=${this.props.startPage || this.state.currentPage}`
            this.startPage = this.props.startPage ? 1 : 0
            const filmArray = await fetch(url)
            const res2 = await filmArray.json()
            this.props.setLoading()
            this.setState(() => {
                return {
                    filmData: res2,
                    alert: null,
                    basePhrase: null,
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
                        message="По вашему запросу ничего не найдено"
                        type="warning"
                    />),
                    basePhrase: null,
                }
            })
            if (this.props.searchInput==='') {
                this.setState(() => {
                    return {
                        basePhrase: this.basePhrase
                    }
                })
            }
        }
    }

    render () {
        return (
            <div className="films-wrapper">
                {this.state.basePhrase}
                {this.props.loading
                    ?
                    <div className="films__spinner" >
                        <Spin indicator={antIcon}/>
                    </div>
                    :
                    <FilmList
                        postFilmRate={this.props.postFilmRate}
                        filmData={this.state.filmData.results}
                        alert={this.state.alert}
                        apiKey={this.props.apiKey}
                        guest_session_id={this.props.guest_session_id}
                        searchInput={this.props.searchInput}
                        onPageChange={this.onPageChange}
                        totalPages={this.state.filmData.total_pages}
                        currentPage={this.state.currentPage}
                        startPage={this.startPage}
                    />
                }
            </div>

        )
    }
}
