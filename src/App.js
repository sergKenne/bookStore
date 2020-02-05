import React from 'react';
import './App.css';
import Book from './components/Book';
import Modal from 'react-modal';
 
const customStyles = {
  content : {
   // width                 : '30%',
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)'
  }
};
 
// Make sure to bind modal to your appElement (http://reactcommunity.org/react-modal/accessibility/)
Modal.setAppElement('#root');

var ind;

class App extends React.Component {

  constructor() {
    super();

    this.state = {
      editTitle: "",
      editRading: "",
      modalIsOpen: false,
      modalIsOpenEdit: false,
      books: [
        // {title: "javaScript", rading: 5.4},
        // {title: "VueJs", rading: 2.4},
        // {title: "HTML&CSS", rading: 4.4}
      ]
    };

    // this.editTitle="";
    // this.editRading="";

    this.openModal = this.openModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);

    this.deleteBook = this.deleteBook.bind(this);
    this.update = this.update.bind(this);

    //Edit Modal
    this.openModalEdit = this.openModalEdit.bind(this);
    this.afterOpenModalEdit = this.afterOpenModalEdit.bind(this);
    this.closeModalEdit = this.closeModalEdit.bind(this);
    
  }

  openModal() {
    this.setState({modalIsOpen: true});
  }

  afterOpenModal() {
    this.subtitle.style.color = '#000';
  }
 
  closeModal() {
    this.setState({modalIsOpen: false});
  }

//Edit
  openModalEdit(e) {
    this.setState({modalIsOpenEdit: true});
    const booksEditeur = this.state.books;
    ind = e.target.dataset.key - 1;
    this.setState({editTitle: booksEditeur[ind].title});
    this.setState({editRading: booksEditeur[ind].rading})
   
  }

  afterOpenModalEdit() {
    this.subtitle.style.color = '#000';
  }
 
  closeModalEdit() {
    this.setState({modalIsOpenEdit: false});
  }

  AddBook = () => {
    const books = this.state.books;
    const title = document.getElementById('title').value;
    const  rading = document.getElementById('rading').value;
    if(title === "" || rading === ""){
      this.closeModal();
      return;
    }else {
      books.push({title, rading});
      localStorage.setItem("books", JSON.stringify(books));

      //this.setState({books});
      
      this.setState({books: JSON.parse(localStorage.getItem("books")) });
      this.closeModal();
    }  
  }

  componentDidMount() {
    const bookState =JSON.parse(localStorage.getItem("books")) || [];
    console.log(bookState);
    this.setState({books: bookState});
  }

  deleteBook = (e) => {
    const indBook = e.target.dataset.key -1;
    const restOfBooks = this.state.books;
    restOfBooks.splice(indBook,1);
    this.setState({books: restOfBooks});
    console.log(restOfBooks);
    localStorage.setItem("books", JSON.stringify(restOfBooks));
  }

  update = () => {
    const updateBooks = this.state.books;
    updateBooks[ind].title = this.state.editTitle;
    updateBooks[ind].rading = this.state.editRading;
    this.setState({ books: updateBooks});
    localStorage.setItem("books", JSON.stringify(updateBooks));
    this.closeModalEdit();
  }
    
  render() {

    const listItems = this.state.books.length? this.state.books.map((book, ind) => {
      return <Book id={ind+1} book= {book} key={ind} delete={this.deleteBook} edit={this.openModalEdit}/> 
    } ) : (<tr className="bg-info ">
      <td className="text-center text-white h5" colSpan="4">your books app is empty</td>
    </tr>);

    return (
      <div className="App container">
        <h1 className="mt-3">Books App</h1>
        <button className="btn btn-primary my-4" onClick={this.openModal}>Add book</button>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Title</th>
              <th scope="col">Rating</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {/* {this.state.books.map((book, ind) => {
              return <Book id={ind+1} book= {book} key={ind} delete={this.deleteBook} edit={this.openModalEdit}/> 
            } )} */}

            {listItems}
          </tbody>
        </table>
        
         <Modal  
          isOpen={this.state.modalIsOpen}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}
          style={customStyles}
          contentLabel="Example Modal"
        >
          <div className="modal-header">
            <h5 className="modal-title" ref={subtitle => this.subtitle = subtitle}>Add a new book</h5>
            <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={this.closeModal}>
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
              <div className="modal-body">
                <form>
                  <div className="form-group">
                    <label htmlFor="title">Title</label>
                    <input type="text" className="form-control" id="title" placeholder="Enter  title" />
                  </div>
                  <div className="form-group">
                    <label htmlFor="rading">Rading</label>
                    <input type="text" className="form-control" id="rading" placeholder="Rading" />
                  </div>
                  <div className="modal-footer">
                    <button type="button" className="btn btn-primary" onClick={this.AddBook}>Add book</button>
                    <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={this.closeModal}>Cancel</button>
                  </div>
                </form>
              </div>
        </Modal>

        <Modal  
          isOpen={this.state.modalIsOpenEdit}
          onAfterOpen={this.afterOpenModalEdit}
          onRequestClose={this.closeModalEdit}
          style={customStyles}
          contentLabel="Example Modal"
        >
          <div className="modal-header">
            <h5 className="modal-title" ref={subtitle => this.subtitle = subtitle}>Edit Book</h5>
            <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={this.closeModalEdit}>
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
              <div className="modal-body">
                <form>
                  <div className="form-group">
                    <label htmlFor="editTitle">Title</label>
                    <input type="text" className="form-control" id="editTitle" value={this.state.editTitle} 
                    onChange={(e) => {
                      this.setState({editTitle: e.target.value});
                    }}/>
                  </div>
                  <div className="form-group">
                    <label htmlFor="editRading">Rading</label>
                    <input type="text" className="form-control" id="editRading" value={this.state.editRading} 
                    onChange={(e) => {
                      this.setState({ editRading: e.target.value });
                    }}/>
                  </div>
                  <div className="modal-footer">
                    <button type="button" className="btn btn-primary" onClick={this.update}>Save</button>
                    <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={() => this.closeModalEdit()}>Cancel</button>
                  </div>
                </form>
              </div>
        </Modal>
      </div>
    );
  }
}

export default App;
