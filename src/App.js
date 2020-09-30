import React from 'react';
import logo from './logo.svg';
import './App.css';
import {
    BrowserRouter as Router,
    Route
} from "react-router-dom";
import Header from "./components/Header/Header";
import LetMeIn from "./components/LetMeIn/LetMeIn";
import Jogs from "./components/Jogs/Jogs";
import Info from "./components/Info/Info";
import Contact from "./components/Contact/Contact";

class App extends React.Component {
    state = {
        filter: false,
        open: false,
    }

    updateData = (value) => {
        this.setState({ filter: value })
    }

    updateOpen = (value) => {
        this.setState({open: value})
    }

    render() {
        console.log(this.state.open)
        return (
            <React.Fragment>
                <Router basename={process.env.PUBLIC_URL}>
                    <Route path='/' render={() => <Header updateData={this.updateData} updateOpen={this.updateOpen} open={this.state.open} />}/>
                    <Route exact path='/' render={() => <LetMeIn open={this.state.open} updateOpen={this.updateOpen} />}/>
                    <Route exact path='/jogs' render={() => <Jogs filter={this.state.filter} open={this.state.open} updateOpen={this.updateOpen} />}/>
                    <Route exact path='/info' render={() => <Info open={this.state.open} updateOpen={this.updateOpen}/>}/>
                    <Route exact path='/contact' render={() => <Contact open={this.state.open} updateOpen={this.updateOpen}/>}/>
                </Router>
            </React.Fragment>
        )
    }
}
export default App;
