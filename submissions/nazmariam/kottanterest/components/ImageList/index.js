import React, {Component} from 'react'
// import Image from '../Image'
import './style.css'

export default  class ImageList extends Component {
    state = {

    };
    popUp=(img)=>{
    };
    render(){
        const imageElements = this.props.images.map((item) => {
            const style = {animation: 'rt '+Math.random()+'s linear'};
            return <div key={item.id} className="card" style={style} onClick={this.popUp(item)}>
                        <img
                            className="card-img-top"
                            src={item.urls.small}
                            alt={item.alt_description}/>
                        <p className='rate'>
                            {item.likes}
                        </p>
                        <a className="user-link" href={item.user.links.html} target={'_blank'}>
                            {item.user.name}
                        </a>
                        <a className={'unsplash-link'} href={'https://unsplash.com/'} target={'_blank'}>on Unsplash</a>
                    </div>
        });
        return (
            <div className={'wrapper'}>
            {imageElements}
            </div>
        )
    }
}
