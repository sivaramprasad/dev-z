import React, { useEffect, useState } from 'react';
import { Row, FormGroup, FormControl, ControlLabel, Button } from 'react-bootstrap';
import '../src/components/login/login.sass';
import '../src/main.css';

const Welcome = ({ user, onSignOut }) => {
	// This is a dumb "stateless" component


	return (
		<div style={{
			textAlign: "center",
			fontSize: "21px"
		}}> 
		
		Welcome <strong>{user.username}</strong>!
			<a href="javascript:void(0);" onClick={onSignOut} style={{
				marginLeft: "10px"
			}}>Sign out</a>
		</div>
	)
}



class LoginForm extends React.Component {

	// Using a class based component here because we're accessing DOM refs

	handleSignIn(e) {
		e.preventDefault()
		let username = this.refs.username.value
		let password = this.refs.password.value
		this.props.onSignIn(username, password)
	}

	render() {

		return (

			<div>

				<div className="Login">
					<Row>
						<form onSubmit={this.handleSignIn.bind(this)}>
							<FormGroup controlId="email">
								<ControlLabel>Email</ControlLabel>
								<input type="text" ref="username" placeholder="Enter your username" className="form-control" />

							</FormGroup>
							<FormGroup controlId="password">
								<ControlLabel>Password</ControlLabel>
								<FormControl type="password" ref="password" name="password" placeholder="Enter your password" onChange={this.handleInputChange} />

							</FormGroup>
							<Button type="submit" bsStyle="primary">Sign-In</Button>
						</form>
					</Row>
				</div>

			</div>
		)
	}

}


class App extends React.Component {




	constructor(props) {
		super(props)
		// the initial application state
		this.state = {
			user: null,
			items: [],
			isLoaded: false
		}
	}

	componentDidMount() {
		//API URL
		fetch('https://jsonplaceholder.typicode.com/users')
			.then(res => res.json())
			.then(json => {
				this.setState({
					items: json,
					isLoaded: true,
				})
			}).catch((err) => {
				console.log(err);
			});

	}



	// App "actions" (functions that modify state)
	signIn(username, password) {
		// This is where you would call Firebase, an API etc...
		// calling setState will re-render the entire app (efficiently!)
		this.setState({
			user: {
				username,
				password,
			}
		})
	}

	signOut() {
		// clear out user from state
		this.setState({ user: null })
	}

	render() {
		// Main Page Starts
		const { isLoaded, items } = this.state;

		if (!isLoaded)
			return <div>Loading...</div>;

		return (
			<div>


				<h1 style={{
					textAlign: "center"
				}}><img alt="Fissionlabs Logo" src="https://www.fissionlabs.com/wp-content/themes/fissionlabs_v1/assets/images/Logo.png" /></h1>
				{
					(this.state.user) ?
						<div>
							<Welcome
								user={this.state.user}
								onSignOut={this.signOut.bind(this)}
							/>
							<div className="App">
								<table>
									<tr>
										<th>Name</th>
										<th>Email</th>
									</tr>
									{items.map(item => (


										<tr>
											<td key={item.id}>
												{item.name}
											</td>
											<td key={item.id}>
												{item.email}
											</td>
										</tr>

									))}
								</table>
							</div>
						</div>

						:
						<LoginForm
							onSignIn={this.signIn.bind(this)}
						/>
				}
			</div>
		)

	}
}

export default App;
