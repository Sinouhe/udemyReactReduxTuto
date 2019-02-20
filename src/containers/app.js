import React,{Component} from 'react';
import SearchBar from '../components/search-bar';
import VideoList from './video-list';
import axios from 'axios';
import VideoDetail from '../components/video-detail';
import Video from '../components/video';
import { timingSafeEqual } from 'crypto';

const API_KEY = 'cd7959796911d256e91ff0c9beec18e9';

const API_END_POINT = 'https://api.themoviedb.org/3/';
const POPULAR_MOVIES_URL = 'discover/movie?api_key=[%API_KEY%]&language=fr-FR&sort_by=popularity.desc&include_adult=false&include_video=false&page=1';
const POPULAR_MOVIES_URL_WITH_API_KEY = POPULAR_MOVIES_URL.replace('[%API_KEY%]',API_KEY);
const VIDEO_MOVIE = 'movie/[%movie_id%]/videos?api_key=[%API_KEY%]&language=fr-FR';
const VIDEO_MOVIE_WITH_API_KEY = VIDEO_MOVIE.replace('[%API_KEY%]',API_KEY);
const SEARCH_MOVIE = 'search/movie?api_key=[%API_KEY%]&language=fr-FR&page=1&include_adult=false&query=[%SEARCH_TEXT%]';
const SEARCH_MOVIE_WITH_API_KEY = SEARCH_MOVIE.replace('[%API_KEY%]',API_KEY);
const RECOMMENDATION = 'movie/[%movie_id%]/recommendations?api_key=[%API_KEY%]&language=fr-FR&page=1';
const RECOMMENDATION_WITH_API_KEY = RECOMMENDATION.replace('[%API_KEY%]',API_KEY);

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {movieList: {}, currentMovie: {}};
    }

    componentWillMount() {
        this.initMovies();
                
    }

    initMovies() {
        axios.get(`${API_END_POINT}${POPULAR_MOVIES_URL_WITH_API_KEY}`)
                .then((reponse) => {
                    this.setState({ movieList: reponse.data.results.slice(1,15), 
                                    currentMovie: reponse.data.results[0]},
                                    () => {
                                        this.applyVideoToCurrentMovie();
                                    });
                });
    }

    applyVideoToCurrentMovie(){
        axios.get(`${API_END_POINT}${VIDEO_MOVIE_WITH_API_KEY.replace('[%movie_id%]',this.state.currentMovie.id)}`)
                .then((reponse) => {
                    const youTubeKey = reponse.data.results[0].key;
                    let newCurrentMovieState = this.state.currentMovie
                    newCurrentMovieState.videoId = youTubeKey;
                    this.setState({currentMovie: newCurrentMovieState});
                });
    }

    onClickListItem(movie){
        this.setState({ currentMovie: movie},
                    () => {
                        this.applyVideoToCurrentMovie();
                        this.setRecommendation();
                    });
    }

    onClickSearch(search) {
        if(search) {
            axios.get(`${API_END_POINT}${SEARCH_MOVIE_WITH_API_KEY.replace('[%SEARCH_TEXT%]',search)}`)
                    .then((reponse) => {
                        if(reponse.data && reponse.data.results.length > 0) {
                            if(reponse.data.results[0].id !== this.state.currentMovie.id) {
                                this.setState({currentMovie: reponse.data.results[0]}, () => {
                                    this.applyVideoToCurrentMovie();
                                    this.setRecommendation();
                                })
                            }
                        }
                    });
                }
    }

    setRecommendation(){
        axios.get(`${API_END_POINT}${RECOMMENDATION_WITH_API_KEY.replace('[%movie_id%]',this.state.currentMovie.id)}`)
            .then((reponse) => {
                this.setState({ movieList: reponse.data.results.slice(0,15)});
            });
    }

    render() {
        const renderVideoList = () => {
            if (this.state.movieList.length >= 5){
                return <VideoList movieList={this.state.movieList} callback={this.onClickListItem.bind(this)} />; 
            }
        }
        return (
            <div>
                <div className='search_bar'>
                    <SearchBar callback={this.onClickSearch.bind(this)}/>
                </div>
                <div className='row'>
                    <div className='col-md-8'>
                        <Video videoId = {this.state.currentMovie.videoId} />
                        <VideoDetail    title={this.state.currentMovie.title} 
                                description={this.state.currentMovie.overview} /> 
                    </div>
                    <div className='col-md-4'>
                        {renderVideoList()}
                    </div>
                </div>
            </div>
            );
    }    
}

export default App;