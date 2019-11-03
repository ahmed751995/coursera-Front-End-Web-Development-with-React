import React, {Component} from 'react';
import {Media} from 'reactstrap';
import { Card, CardImg, CardImgOverlay, CardText, CardBody,
	 CardTitle } from 'reactstrap';
import {ListGroupItem, ListGroup} from 'reactstrap';

class DishDetail extends Component {
    constructor(props) {
	super(props);
    }

    renderDish(dish) {
	return(
	    <div className="col-12 col-md-5 m-1">
	      <Card>
		<CardImg top src={dish.image} alt={dish.name} />
		<CardBody>
		  <CardTitle>{dish.name}</CardTitle>
		  <CardText>{dish.description}</CardText>
		</CardBody>
	      </Card>
            </div>
	);
    }

    renderComments(comments) {
	if(comments != null) {
	    let commentsList = comments.map((comment)=> {
		return(
		    // <ListGroup>
		    //   <ListGroupItem>
		    // 	{comment.comment}
		    //   </ListGroupItem>
		    //   <ListGroupItem>
		    // 	-- {comment.author}, {comment.date}
		    //   </ListGroupItem>
		    // </ListGroup>
		    <div>
		      <p>{comment.comment}</p>
		      <p>-- {comment.author}, {comment.date}</p>
		    </div>
		);
	    });
	    
	    return (
		<div className="col-12 col-md-5 m-1">
		  <h4>Comments</h4>
		  {commentsList}
		</div>
	    );
	} else {
	    return(<div></div>);
	}

    }

    render() {
	if(this.props.dish != null) {
	    return(
		<div className="row">
		  {this.renderDish(this.props.dish)}
		  {this.renderComments(this.props.dish.comments)}
		</div>
	    );
	    
	} else {
	    return (<div></div>);
	}
    }
}

export default DishDetail;
