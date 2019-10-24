import React, { Component } from 'react';
import { getMovies } from './movieService';
import { getGenres } from './movieGenreService'
import ListGroup from './common/listGroup';
import Pagination from './common/pagination';
import { paginate } from './../utils/paginate';
import MovieTable from './movieTable';
 
class Movie extends Component {
    state = { 
        count : 9,
        movie : [],
        genres :  [],
        currentPage : 1,
        pageSize : 3
    };
        
        componentDidMount() {
            const genres = [{ name: 'All Genres' }, ...getGenres()];
            this.setState({ movie : getMovies(), genres })
        }
        
        handleDelete = (data) => {
            this.setState({ count : this.state.count - 1 })
            this.setState({ movie : this.state.movie.filter( val => val !== data)})
        }

        handleLike = data => {
            const movie = [...this.state.movie];
            const index = movie.indexOf(data);
            movie[index] = {...movie[index]};
            movie[index].liked = !movie[index].liked;
            this.setState({ movie });
        }

        handlePageChange = page => {
            this.setState({ currentPage : page });
        }

        handleGenreSelect = genre => {
            this.setState({ selectedGenre : genre, currentPage : 1 })
        }

        render() { 
            const { movie: allMovie , currentPage, pageSize, selectedGenre } = this.state;

            const filtered = selectedGenre && selectedGenre.id 
                ? allMovie.filter(movie => movie.genre.id === selectedGenre.id)
                : allMovie ;

            const movie = paginate(filtered, currentPage, pageSize );

            if(this.state.movie.length === 0) return <div className= "container"> <br/>
            <h5>There are no Movies in the database</h5></div>

            return ( 
            <div className="container bg-light"> <br/> 
            <div className="text-center"> <h3><u>MoviesApp</u></h3></div><br/>
                <div className = "row" >

                <div className="col-2"> 
                    <ListGroup 
                        items={this.state.genres}
                        selectedItem={this.state.selectedGenre} 
                        onItemSelect={this.handleGenreSelect}
                    />
                </div>

                <div className="col">
                        <div> <h5>Showing {filtered.length} movies in the database</h5></div><br/>

                        <MovieTable 
                            movie={movie}
                            onLike={this.handleLike}
                            onDelete={this.handleDelete}
                        />          

                        <div className="container">
                            <Pagination  
                            itemsCount={filtered.length}
                            currentPage={currentPage}
                            pageSize={pageSize}
                            onPageChange={this.handlePageChange} 
                            />
                        </div>
                </div>
        
                </div>
                </div>
            ) 
    }
    
}
 
export default Movie;




  

















                   