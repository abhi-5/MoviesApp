import React from 'react';
import Like from './common/like';

const MovieTable = (props) => {
    const { movie, onDelete, onLike } = props;

    return ( 
        <div class="table-responsive-md">
                        <table class="table">
                                <thead>
                                    <tr>
                                    <th scope="col">Title</th>
                                    <th scope="col">Genre</th> 
                                    <th scope="col">Stock</th>
                                    <th scope="col">Rate</th>
                                    <th scope="col"></th>
                                    <th scope="col"></th>
                                    </tr>
                                </thead>
                            <tbody>
                                {movie.map((data, i) => {
                                    return(
                                    <tr key={i}>
                                        <td> {data.title} </td>
                                        <td> {data.genre.name}  </td>
                                        <td> {data.numberInStock} </td>
                                        <td> {data.dailyRentalRate} </td>
                                        <td> <Like  liked={data.liked} onClick={ () => onLike(data)}/> </td>
                                        <td> <button onClick={ () => onDelete(data) }  
                                            className="btn btn-danger btn-sm">Delete</button></td>
                                    </tr>
                                    );
                                })  } 
                            </tbody>   
                        </table> 
        </div>   
     );
}
 
export default MovieTable;

