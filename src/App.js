import React from 'react';
import './App.css';
import Book from './components/Book'

class App extends React.Component {

  state= {
    books: [
      {id: 1, title: "first book", rading: 1.4},
      {id: 2, title: "second book", rading: 6.4},
      {id: 3, title: "third book", rading: 4.4}
    ]
  };

  render() {
    const book = {
      title:"first book",
      rading: 2.5
    }
    return (
      <div className="App container">
        <button className="btn btn-primary my-4">Add book</button>
        <table class="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Title</th>
              <th scope="col">Rating</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {this.state.books.map((book, ind) => {
              return <Book  book= {book} /> 
            } )}
          </tbody>
        </table>
      </div>
    );
  }
}

export default App;
