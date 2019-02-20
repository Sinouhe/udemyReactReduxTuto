import React from 'react';

const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500/';

const VideoListItem = (props) => {
// const VideoListItem = ({movie}) => {
    // return  <li>{props.movie.title}</li>
    // const movie = props.movie;
    const {movie} = props;

    return (
        <li className='list-group-item' onClick={handleOnClick}>
            <div className='media'>
                <div className='media-left'>
                    <img className='madia-object img-rounded' height='100px' width='100px' src={`${IMAGE_BASE_URL}${movie.poster_path}`}/> 
                </div>
                <div className='media-body'>
                    <h4 className='title_list_item'>{movie.title}</h4>
                </div>
            </div>
        </li>
    )
    
    function handleOnClick() {
        props.callback(movie);
    }
    
}

export default VideoListItem