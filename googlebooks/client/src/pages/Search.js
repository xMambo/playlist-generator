import React, { Component } from 'react';
import DeleteBtn from '../components/DeleteBtn';
import Jumbotron from '../components/Jumbotron';
import API from '../utils/API';
import { Link } from 'react-router-dom';
import { Col, Row, Container } from '../components/Grid';
import { List, ListItem } from '../components/List';
import { Input, TextArea, FormBtn } from '../components/Form';
import axios from 'axios';
import SaveBtn from '../components/SaveBtn';

class Books extends Component {
	state = {
		books: [],
		title: '',
		author: '',
		synopsis: ''
	};

	componentDidMount() {
		//this.loadBooks();
	}

	// loadBooks = () => {
	// 	API.getBooks()
	// 		.then((res) => {
	// 			console.log(res);
	// 			debugger
	// 			this.setState({ books: res.data, title: '', author: '', synopsis: '' });
	// 		})
	// 		.catch((err) => console.log(err));
	// };

	deleteBook = (id) => {
		console.log(id);
		API.deleteBook(id).then((res) => this.loadBooks()).catch((err) => console.log(err));
	};

	handleInputChange = (event) => {
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
	saveBook = (bookData) => {
		console.log(bookData);
		API.saveBook(bookData).then((response) => console.log(response)).catch((err) => console.log(err));
	};

	render() {
		return (
			<Container fluid>
				<Row>
					<Col size="md-6">
						<Jumbotron>
							<h1>What Books Should I Read?</h1>
						</Jumbotron>
						<form>
							<Input
								value={this.state.title}
								onChange={this.handleInputChange}
								name="title"
								placeholder="Title (required)"
							/>
							<Input
								value={this.state.author}
								onChange={this.handleInputChange}
								name="author"
								placeholder="Author (required)"
							/>
							<TextArea
								value={this.state.synopsis}
								onChange={this.handleInputChange}
								name="synopsis"
								placeholder="Synopsis (Optional)"
							/>
							<FormBtn
								disabled={!(this.state.author && this.state.title)}
								onClick={this.handleFormSubmit}
							>
								Submit Book
							</FormBtn>
						</form>
					</Col>
					<Col size="md-6 sm-12">
						<Jumbotron>
							<h1>Books On My List</h1>
						</Jumbotron>
						{this.state.books.length ? (
							<List>
								{this.state.books.map((book) => (
									<ListItem key={book.id}>
										<Link to={'/books/' + book.id}>
											<strong>
												{book.volumeInfo.title} by {book.volumeInfo.authors[0]}
											</strong>
										</Link>
										<SaveBtn onClick={() => this.saveBook(book)} />
										<DeleteBtn onClick={() => this.deleteBook(book)} />
									</ListItem>
								))}
							</List>
						) : (
							<h3>No Results to Display</h3>
						)}
					</Col>
				</Row>
			</Container>
		);
	}
}

export default Books;