import React, { Component } from 'react';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { actions } from 'react-redux-form';
import Menu from './MenuComponent';
import Home from './HomeComponent';
import Contact from './ContactComponent';
import DishDetail from './DishdetailComponent';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import About from './AboutComponent';
import { postComment, fetchDishes, fetchPromos, fetchComments, fetchLeaders, postFeedback } from '../redux/ActionCreators';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

const mapStateToProps = state => {
  return {
      dishes: state.dishes,
      comments: state.comments,
      promotions: state.promotions,
      leaders: state.leaders
  };
};

const mapDispatchToProps = dispatch => ({
    postComment: (dishId, rating, author, comment) =>
	dispatch(postComment(dishId, rating, author, comment)),
    postFeedback: (values) => postFeedback(values),
    fetchDishes: () => dispatch(fetchDishes()),
    fetchPromos: () => dispatch(fetchPromos()),
    fetchComments: () => dispatch(fetchComments()),
    fetchLeaders: () => dispatch(fetchLeaders()),
    resetFeedbackForm: () => { dispatch(actions.reset('feedback'));}
    });



class Main extends Component {

    componentDidMount() {
	console.log('mounting now');
	this.props.fetchDishes();
	this.props.fetchPromos();
	this.props.fetchComments();
	this.props.fetchLeaders();
    }
  

    render() {
	const HomePage = () => {
	    return(
		  <Home 
		    dish={this.props.dishes.dishes.filter((dish) => dish.featured)[0]}
		    dishesLoading={this.props.dishes.isLoading}
		    dishesErrMess={this.props.dishes.errMess}
		    promotion={this.props.promotions.promotions.filter((promo) => promo.featured)[0]}
		    promoLoading={this.props.promotions.isLoading}
		    promoErrMess={this.props.promotions.errMess}
		    leader={this.props.leaders.leaders.filter((leader) => leader.featured)[0]}
		    LeaderLoading={this.props.leaders.isLoading}
		    LeaderErrMess={this.props.leaders.errMess}
		    />
	    );
	};

	const DishWithId = ({match}) => {
	    return(
		
		<DishDetail
		  dish={this.props.dishes.dishes.filter((dish) => dish.id === parseInt(match.params.dishId,10))[0]}
		  isLoading={this.props.dishes.isLoading}
		  errMess={this.props.dishes.errMess}
		  comments={this.props.comments.comments.filter((comment) => comment.dishId === parseInt(match.params.dishId,10))}
		  commentsErrMess={this.props.comments.errMess}
		  postComment={this.props.postComment}
		  />
	    );
	};

	
	return (
	    <div>
              <Header />
	      <TransitionGroup>
		<CSSTransition key={this.props.location.key} classNames="page" timeout={300}>
		  <Switch>
		    <Route path="/home" component={HomePage} />
		    <Route exact path="/menu" component={() =><Menu dishes={this.props.dishes} /> } />
		      <Route path='/menu/:dishId' component={DishWithId} />
		      <Route exact path="/contactus" component={() => <Contact resetFeedbackForm={this.props.resetFeedbackForm} postFeedback={this.props.postFeedback}/>} />
			<Route exact path="/aboutus" component={() => <About leaders={this.props.leaders.leaders} />} />
			  <Redirect to="/home"/>
		  </Switch>
		</CSSTransition>
	      </TransitionGroup>
	      <Footer />
	    </div>
	);
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));
