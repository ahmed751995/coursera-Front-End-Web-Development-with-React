import React, {Component} from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle } from 'reactstrap';

class DishDetail extends Component {

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
		    <div key={comment.id} className="mb-3">
		      <li>{comment.comment}</li>
		      <li>-- {comment.author}, {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(comment.date)))}</li>
		    </div>
		);
	    });
	    
	    return (
		<div className="col-12 col-md-5 m-1">
		  <h4>Comments</h4>
		  <ul className="list-unstyled">
		  {commentsList}
		  </ul>
		</div>
	    );
	} else {
	    return(<div></div>);
	}

    }

    render() {
	if(this.props.dish != null) {
	    return(
		<div className="container">
		  <div className="row">
		    {this.renderDish(this.props.dish)}
		    {this.renderComments(this.props.dish.comments)}
		  </div>
		</div>
	    );
	    
	} else {
	    return (<div></div>);
	}
    }
}

export default DishDetail;
