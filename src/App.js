import React, {Component} from 'react';
import FilmWrapper from './components/film-wrapper'
import './App.css';
import { Offline, Online } from "react-detect-offline";

import { Spin, Alert} from 'antd';


import {debounce} from 'lodash'








export default class App extends Component{

    state ={
        searchInput:'',
        loading:false
    }
    apiKey= '3bc3826aac77d61a282436f0813430f4'


    onChange =()=>(e)=>{
        this.setState(()=>{
            return {
                searchInput: e.target.value,
                loading:true
            }
        })
    }
    setLoading =()=>{
        this.setState(()=>{
            return{
                loading: false
            }
        })
    }




    render (){
        return (
            <div className="site-card-wrapper">
                <Online>
                    <input
                        type="search"
                        placeholder="input search text"
                        onChange={this.onChange()}
                        value={this.state.searchInput}
                    />
                    <FilmWrapper   searchInput={this.state.searchInput} apiKey={this.apiKey} setLoading={this.setLoading} loading={this.state.loading}/>


                </Online>
                <Offline>Only shown offline (surprise!)</Offline>
            </div>
        )
    }

}


