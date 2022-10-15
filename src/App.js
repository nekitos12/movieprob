import React, {Component} from 'react';
import FilmWrapper from './components/film-wrapper'
import './App.css';
import { Offline, Online } from "react-detect-offline";

import { Alert, Menu } from 'antd';









export default class App extends Component{

    state ={
        searchInput:'',
        loading:false,
    }
    apiKey= '3bc3826aac77d61a282436f0813430f4'

    componentDidMount() {
        console.log('я тут')
        const url = `https://api.themoviedb.org/3/authentication/guest_session/new?api_key=${this.apiKey}`
        fetch(url)
            .then(res=>res.json())
            .then(res=> {
                this.setState({
                    guest_session_id: res.guest_session_id
                })
            })
        this.postFilmRate = this.postFilmRate.bind(this)
    }

    async postFilmRate (id, rate){
        console.log(id, rate)
        console.log(this.state)
        const url = `https://api.themoviedb.org/3/movie/${id}/rating?api_key=${this.apiKey}&guest_session_id=${this.state.guest_session_id}`
        console.log(url)

        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify({
                "value": rate,
            })
        })
        const data = await response.json()
        console.log(data)
    }

    onChange =()=>(e)=>{
        this.setState(()=>{
            return {
                searchInput: e.target.value,
                loading:true,
                startPage: 1
            }
        })
    }
    setLoading =()=>{
        this.setState(()=>{
            return{
                loading: false,
                startPage: 0
            }
        })
    }






    render (){
        console.log(this.state)
        return (
            <div className="app">
                <div className="app__wrapper">

                        <Menu mode="horizontal" defaultSelectedKeys={['search']} className="app__menu menu">
                        <Menu.Item key="search">
                            Search
                        </Menu.Item>
                        <Menu.Item key="rated">
                            Rated
                        </Menu.Item>
                    </Menu>


                    <input
                        type="search"
                        placeholder="Type to search..."
                        onChange={this.onChange()}
                        className="app__input input"
                        value={this.state.searchInput}
                    />
                    <Online>

                        <FilmWrapper
                            postFilmRate={this.postFilmRate}
                            searchInput={this.state.searchInput}
                            apiKey={this.apiKey}
                            setLoading={this.setLoading}
                            loading={this.state.loading}
                            startPage={this.state.startPage}
                            guest_session_id ={this.state.guest_session_id}
                        />



                    </Online>
                    <div className="app__offline">
                        <Offline>
                            <Alert  message="Проверьте соединение с интернетом" type="error" />
                        </Offline>
                    </div>
                </div>


            </div>
        )
    }

}


