import React from 'react';

const Book = (props) => {
    
    return (
        <tr>
            <th scope="row">{props.id}</th>
            <td>{props.book.title}</td>
            <td>{props.book.rading}</td>
            <td><button className="btn btn-success mr-2" data-key={props.id} onClick={props.edit}>Edit</button>
            <button className="btn btn-danger" data-key={props.id} onClick={props.delete}>Delete</button></td>
        </tr>
    );
}

export default Book;