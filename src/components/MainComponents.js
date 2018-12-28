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
import { postComment, fetchDishes, fetchComments, fetchPromos, fetchLeaders, postFeedback } from '../redux/ActionCreators';
import { actions } from 'react-redux-form';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

const mapStateToProps = state => {
    return {
        dishes: state.dishes,
        comments: state.comments,
        promotions: state.promotions,
        leaders: state.leaders
    }
}
const mapDispatchToProps = dispatch => ({
    postComment: (dishId, rating, author, comment) => dispatch(postComment(dishId, rating, author, comment)),
    fetchDishes: () => { dispatch(fetchDishes()) },
    resetFeedbackForm: () => { dispatch(actions.reset('feedback')) },
    fetchComments: () => dispatch(fetchComments()),
    fetchPromos: () => dispatch(fetchPromos()),
    fetchLeaders: () => dispatch(fetchLeaders()),
    postFeedback: (fname, lname, tel, email, agree, conttype, feedback) => dispatch(postFeedback(fname, lname, tel, email, agree, conttype, feedback)),
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
        this.props.fetchComments();
        this.props.fetchPromos();
        this.props.fetchLeaders();
    }
    onDishSelect(dishes) {
        this.setState({
            selectDish: dishes
        });
    }
    render() {
        const HomePage = () => {
            const feature = this.props.dishes.dishes.filter((dish) => dish.featured);
            const leaders = this.props.leaders.leaders.filter((lider) => lider.featured);
            const promo = this.props.promotions.promotions.filter((prmotion) => prmotion.featured);
            return (<Home dishes={feature[0]} dishesLoading={this.props.dishes.isLoading}
                dishesErrMess={this.props.dishes.errMess} leaders={leaders[0]} prmotion={promo[0]} promoLoading={this.props.promotions.isLoading}
                promoErrMess={this.props.promotions.errMess} leaderLoading={this.props.leaders.isLoading}
                leaderErrMess={this.props.leaders.errMess} />);
        }
        const DishWithId = ({ match }) => {
            return (<Dishdetail dish={this.props.dishes.dishes.filter((dis) => dis.id === parseInt(match.params.dishId, 10))[0]} isLoading={this.props.dishes.isLoading}
                errMess={this.props.dishes.errMess} comment={this.props.comments.comments.filter((commnts) => commnts.dishId === parseInt(match.params.dishId, 10))} addComment={this.props.addComment} commentsErrMess={this.props.comments.errMess}
                postComment={this.props.postComment} />);
        }
        return (
            <div>
                <Header />
                <TransitionGroup>
                    <CSSTransition key={this.props.location.key} classNames="page" timeout={300}>
                        <Switch location={this.props.location} >
                            <Route path='/home' component={HomePage} />
                            <Route path='/aboutus' component={() => <About leaders={this.props.leaders.leaders} leaderLoading={this.props.leaders.isLoading}
                                leaderErrMess={this.props.leaders.errMess} />} />
                            <Route exact path='/contactus' component={() => <Contact resetFeedbackForm={this.props.resetFeedbackForm} postFeedback={this.props.postFeedback}  />} />
                            <Route exact path='/menu' component={() => <Menu dises={this.props.dishes} />} />
                            <Route path='/menu/:dishId' component={DishWithId} />
                            <Redirect to='/home' />
                        </Switch>
                    </CSSTransition>
                </TransitionGroup>
                <Footer />
            </div>
        );
    }
}
//<div className="container" >
//<Dishdetail dishes={DISHES.filter((dish) => dish.id === this.state.selectDish)[0]} />
//                </div >
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));

