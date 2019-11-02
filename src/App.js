import React from 'react';
// import logo, { ReactComponent } from './logo.svg'
import { Navbar, NavbarBrand } from 'reactstrap';
import {Component} from 'react';
import Menu from './components/MenuComponent';
import './App.css';
import { DISHES } from './shared/dishes';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App



class App extends Component {
    constructor(props) {
	super(props);
	this.state = {
	    dishes: DISHES
	};	
    }
    render() {
	return (
	    <div className="App">
              <Navbar dark color="primary">
		<div className="container">
		  <NavbarBrand href="/">
		    Ristorate Con Fusion
		  </NavbarBrand>
		</div>
              </Navbar>
	      <Menu dishes={this.state.dishes}/>
	    </div>
	);
    }
}



export default App;

