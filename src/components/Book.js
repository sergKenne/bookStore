import React from 'react';

const Book = (props) => {
    
    return (
        <tr>
            <th scope="row">{props.book.id}</th>
            <td>{props.book.title}</td>
            <td>{props.book.rading}</td>
            <td><button className="btn btn-success mr-2">Edit</button><button className="btn btn-danger">Delete</button></td>
        </tr>
    );
}

export default Book;