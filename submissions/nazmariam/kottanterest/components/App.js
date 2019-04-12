import React, {Component} from "react";
import {Header} from './Header'
import ImageList from './ImageList';
import {getPhotos} from "../api";

class App extends Component{
    state = {
        list: [],
        fullList:[],
    };
    performSearch = (searchName) => {
        const list = this.state.fullList;
        let result = [];
        if(searchName!=='decrease'&& searchName!=='increase'){
            result = list.filter((item)=>{return item.user.name.includes(searchName)})
        }else if (searchName==='decrease'){
            result = list.sort((a,b)=>{return b.likes-a.likes})
        }else if (searchName==='increase'){
            result = list.sort((a,b)=>{return a.likes-b.likes})}
        this.setState({
            list:result,
        })

}
    // handleScroll = () => {
    //     const nextList = getPhotos(this.state.nextApiUrl);
    //     nextList.then( data => {
    //         this.setState({
    //             list: data.results,
    //             data: data,
    //             nextApiUrl: data.info.next,
    //             prevApiData: data.info.prev
    //         })
    //     })
    // }
    async componentDidMount() {
        const total = 100;
        let list = [];
        if (list.length<total) list = await getPhotos(list.length);

        this.setState({
            list: list,
            fullList:list
        })
    }
    render(){
        const list = this.state.list;
        return (
            <>
                <Header handleSubmit={this.performSearch}/>
                <ImageList images={this.state && list}/>
            </>
        )
    }
}


export default App;
