import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Menu from './MenuComponents';
import Dishdetail from './DishdetailComponent';
import { DISHES } from '../shared/dishes';
//import { Navbar, NavbarBrand } from 'reactstrap';
import Header from './HeaderComponent';
import Footer from './FooterComponent';

class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedDish: null
        };
    }
    onDishSelect(dishes) {
        this.setState({
            selectDish: dishes
        });
    }
    /*componentDidMount() {
        console.log("component did mount main");
    }
    componentDidUpdate() {
        console.log("componentDidUpdate main");
    }
    componentWillMount() {
        console.log("componentWillMount");
    }
    componentWillUpdate() {
        console.log("componentWillUpdate");
    }
    componentWillUnmount() {
        console.log("componentWillUnmount");
    }*/
    render() {
        //console.log("rander");
        return (
            <div>
                <Header/>
                    <div className="container" >
                    <Menu dises={DISHES} onClick={(dish) => { this.onDishSelect(dish) }} />
                    <Dishdetail dishes={DISHES.filter((dish) => dish.id === this.state.selectDish)[0]} />
                </div>
                <Footer />
            </div>
        );
    }
}
export default Main;
