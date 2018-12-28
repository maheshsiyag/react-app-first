import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Menu from './MenuComponents';
import Dishdetail from './DishdetailComponent';
//import { Navbar, NavbarBrand } from 'reactstrap';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import { Switch, Redirect, Route, withRouter } from 'react-router-dom';
import  About  from './AboutComponents';
import  Contact  from './ContactUsComponents';
import Home from './HomeComponents';
import { connect } from 'react-redux';
import { addComment, fetchDishes } from '../redux/ActionCreators';
import { actions } from 'react-redux-form';

const mapStateToProps = state => {
    return {
        dishes: state.dishes,
        comments: state.comments,
        promotions: state.promotions,
        leaders: state.leaders
    }
}
const mapDispatchToProps = dispatch => ({
    addComment: (dishId, rating, author, comment) => dispatch(addComment(dishId, rating, author, comment)),
    fetchDishes: () => { dispatch(fetchDishes()) },
    resetFeedbackForm: () => { dispatch(actions.reset('feedback')) }
   
});

class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedDish: null
        };
    }
    componentDidMount() {
        this.props.fetchDishes();
    }
    onDishSelect(dishes) {
        this.setState({
            selectDish: dishes
        });
    }
    render() {
        const HomePage = () => {
            const feature = this.props.dishes.dishes.filter((dish) => dish.featured);
            const leaders = this.props.leaders.filter((lider) => lider.featured);
            const promo = this.props.promotions.filter((prmotion) => prmotion.featured);
            return (<Home dishes={feature[0]} dishesLoading={this.props.dishes.isLoading}
                dishesErrMess={this.props.dishes.errMess} leaders={leaders[0]} prmotion={promo[0]} />);
        }
        const DishWithId = ({ match }) => {
            return (<Dishdetail dish={this.props.dishes.dishes.filter((dis) => dis.id === parseInt(match.params.dishId, 10))[0]} isLoading={this.props.dishes.isLoading}
                errMess={this.props.dishes.errMess} comment={this.props.comments.filter((commnts) => commnts.dishId === parseInt(match.params.dishId, 10))} addComment={this.props.addComment} />);
        }
        return (
            <div>
                <Header />
                <Switch>
                    <Route path='/home' component={HomePage} />
                    <Route path='/aboutus' component={() => <About leaders={this.props.leaders} />} />
                    <Route exact path='/contactus' component={() => <Contact resetFeedbackForm={this.props.resetFeedbackForm} />} />
                    <Route exact path='/menu' component={() => <Menu dises={this.props.dishes} />} />
                    <Route path='/menu/:dishId' component={DishWithId}  />
                    <Redirect to='/home' />
                </Switch>
                    
                <Footer />
            </div>
        );
    }
}
//<div className="container" >
//<Dishdetail dishes={DISHES.filter((dish) => dish.id === this.state.selectDish)[0]} />
//                </div >
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));

