import React, { Component } from "react";
import Jumbotron from "./components/Jumbotron";
import Nav from "./components/Nav";
import Input from "./components/Input";
import Button from "./components/Button";
import { BookList, BookListItem } from "./components/BookList";
import { Container, Row, Col } from "./components/Grid";
import axios from "axios";
import DeleteBtn from './components/DeleteBtn';
import SaveBtn from './components/SaveBtn';
import { Link } from 'react-router-dom';

//import API from "./utils/API";


class App extends Component {
      state = {
        books: [],
        query: ""
      };
    

    handleInputChange = event => {
    // Destructure the name and value properties off of event.target
    // Update the appropriate state
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  handleFormSubmit = (event) => {
		console.log('firing');
		event.preventDefault();
		return axios
			.get('https://www.googleapis.com/books/v1/volumes?q=' + this.state.title)
			.then((response) => {
				console.log(response);
				this.setState({ books: response.data.items });
			})
			.catch((err) => console.log(err));
	};

render() {
  return (
    <div>
      <Nav />
      <Jumbotron />
      <Container>
        <Row>
          <Col size="md-12">
            <form>
              <Container>
                <Row>
                  <Col size="xs-9 sm-10">
                    <Input
                      name="title"
                      value={this.state.title}
                      onChange={this.handleInputChange}
                      placeholder="Search For a Book"
                    />
                  </Col>
                  <Col size="xs-3 sm-2">
                    <Button
                      onClick={this.handleFormSubmit}
                      type="success"
                      className="input-lg"
                    >
                      Search
                    </Button>
                  </Col>
                </Row>
              </Container>
            </form>
          </Col>
        </Row>
        <Row>
          <Col size="xs-12">
            {!this.state.books.length ? (
              <h1 className="text-center">No Book to Display</h1>
            ) : (
              <BookList>
								{this.state.books.map(book => (
									<BookListItem key={book.id}>
										<Link to={'/books/' + book.id}>
											<strong>
												{book.volumeInfo.title} by {book.volumeInfo.authors[0]}
											</strong>
										</Link>
										<SaveBtn onClick={() => this.saveBook(book)} />
										<DeleteBtn onClick={() => this.deleteBook(book)} />
									</BookListItem>
								))}
							</BookList>
            )}
          </Col>
        </Row>
      </Container>
    </div>
  );
}
}

export default App;
