import React, { Component } from 'react';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { actions } from 'react-redux-form';
import { addComment, fetchDishes, fetchComments, fetchPromos } from '../redux/ActionCreators';

import Menu from './MenuComponent';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import Home from './HomeComponent';
import Contact from './ContactComponent';
import DishDetail from './DishdetailComponent';
import About from './AboutComponent';

const mapStateToProps = state => {
    return {
      dishes: state.dishes,
      comments: state.comments,
      promotions: state.promotions,
      leaders: state.leaders
    }
};

const mapDispatchToProps = dispatch => ({
    addComment: (dishId, rating, author, comment) => dispatch(addComment(dishId, rating, author, comment)),
    fetchDishes: () => dispatch(fetchDishes()),
    resetFeedbackForm: () => dispatch(actions.reset('feedback')),
    fetchComments: () => dispatch(fetchComments()),
    fetchPromos: () => dispatch(fetchPromos())
});

class Main extends Component {
    componentDidMount() {
        this.props.fetchDishes();
        this.props.fetchComments();
        this.props.fetchPromos();
    }

    render() {
        const HomePage = () => {
            return (
                <Home dish={this.props.dishes.dishes.filter((dish) => dish.featured)[0]}
                    dishesLoading={this.props.dishes.isLoading}
                    dishesErrorMessage={this.props.dishes.errorMessage}
                    promotion={this.props.promotions.promotions.filter((promo) => promo.featured)[0]}
                    promoLoading={this.props.promotions.isLoading}
                    promoErrorMessage={this.props.promotions.errorMessage}
                    leader={this.props.leaders.filter((leader) => leader.featured)[0]}/>
            );
        };

        const MenuPage = () => {
            return (
                <Menu dishes={this.props.dishes}/>
            );
        };

        const DishWithId = ({ match }) => {
            return (
                <DishDetail dish={this.props.dishes.dishes.filter((dish) => dish.id === parseInt(match.params.dishId, 10))[0]}
                    isLoading={this.props.dishes.isLoading}
                    errorMessage={this.props.dishes.errorMessage}
                    comments={this.props.comments.comments.filter((comment) => comment.dishId === parseInt(match.params.dishId, 10))}
                    commentsErrorMessage={this.props.comments.errorMessage}
                    addComment={this.props.addComment}/>
            );
        };

        const AboutPage = () => {
            return (
                <About leaders={this.props.leaders}/>
            );
        };

        const ContactPage = () => {
            return (
                <Contact resetFeedbackForm={this.props.resetFeedbackForm}/>
            );
        };

        return (
            <div>
                <Header/>
                <Switch>
                    <Route path='/home' component={HomePage}/>
                    <Route exact path='/menu' component={MenuPage}/>
                    <Route path='/menu/:dishId' component={DishWithId}/>
                    <Route exact path='/contactus' component={ContactPage}/>
                    <Route exact path='/aboutus' component={AboutPage}/>
                    <Redirect to="/home" />
                </Switch>
                <Footer/>
            </div>
        );
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));
