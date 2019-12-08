import React, {Component} from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle, Breadcrumb, BreadcrumbItem,
	 Button, Modal, ModalHeader, ModalBody, Row, Col, Label} from 'reactstrap';
import { Link } from 'react-router-dom';
import { LocalForm, Control, Errors } from 'react-redux-form';
import { Loading } from './LoadingComponent';


class CommentForm extends Component {
    constructor(propes) {
	super(propes);
	this.toggleModal = this.toggleModal.bind(this);
	this.handleSubmit = this.handleSubmit.bind(this);
	
	this.state = {
	    isModalOpen: false
	};
    }

    toggleModal() {
	this.setState({
	    isModalOpen: !this.state.isModalOpen
	});
    }

    handleSubmit(values) {
	this.toggleModal();
	console.log();
	this.props.addComment(this.props.dishId, values.rating, values.author, values.comment);
    }
    
    render() {
	const required = (val) => val && val.length;
	const minLength = (len) => (val) => !(val) || (val.length >= len);
	const maxLength = (len) => (val) => !(val) || (val.length <= len);
	
	return(
	    <React.Fragment>
	      <Button outline color="secondary" onClick={this.toggleModal}>
		<i className="fa fa-pencil"></i> Submit Comment
	      </Button>
	      <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
		<ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
		<ModalBody>
		  <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
		    <Row className="form-group">
		      <Col>
			<Label>Rating</Label>
			<Control.select model=".rating" name="rating" className="form-control"
					defaultValue="1">
			  <option>1</option>
			  <option>2</option>
			  <option>2</option>
			  <option>3</option>
			  <option>4</option>
			  <option>5</option>
			</Control.select>
		      </Col>
		    </Row>
		    <Row className="formgroup">
		      <Col>
			<Label htmlFor="author">Your Name</Label>
			<Control.text model=".author"
				      id="author" className="form-control" placeholder="Your Name"
				      validators={{
					  required, minLength: minLength(3), maxLength: maxLength(15)
				      }}
				      />
			<Errors
			  className="text-danger"
			  model=".name"
			  show="touched"
			  messages={{
			      required: 'Required',
			      minLength: 'Must be greater than 2 characters',
			      maxLength: 'Must be 15 characters or less'
			  }}
			  />
		      </Col>
		    </Row>
		    <Row className="formgroup mt-3">
		      <Col>
			<Label htmlFor="comment">Comment</Label>
			<Control.textarea model=".comment"
					  id="comment" className="form-control"
					  rows={6}/>
		      </Col>
		    </Row>
		    <Button type="submit" color="primary" className="mt-3">Submit</Button>
		  </LocalForm>
		</ModalBody>
	      </Modal>
	    </React.Fragment>
	);
    }
}


function RenderDish({dish}) {
    return(
	<Card>
	  <CardImg top src={dish.image} alt={dish.name} />
	  <CardBody>
	    <CardTitle>{dish.name}</CardTitle>
	    <CardText>{dish.description}</CardText>
	  </CardBody>
	</Card>
    );
}

function RenderComments({comments, addComment, dishId}) {
    let commentsList;
    if(comments != null) {
	commentsList = comments.map((comment)=> {
	    return(
		<div key={comment.id} className="mb-3">
		  <li>{comment.comment}</li>
		  <li>-- {comment.author}, {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(comment.date)))}</li>
		</div>
	    );
	});
    } else {
	commentsList = <div></div>;
    }
     
    return (
	<React.Fragment>
	  <h4>Comments</h4>
	  <ul className="list-unstyled">
	    {commentsList}
	  </ul>
	  <CommentForm dishId={dishId} addComment={addComment}/>
	</React.Fragment>
    );
}

const DishDetail = (props) => {
    if (props.isLoading) {
        return(
            <div className="container">
              <div className="row">            
                <Loading />
              </div>
            </div>
        );
    }
    else if (props.errMess) {
        return(
            <div className="container">
              <div className="row">            
                <h4>{props.errMess}</h4>
              </div>
            </div>
        );
    }
    else if(props.dish != null) {
	return(
            <div className="container">
              <div className="row">
                <Breadcrumb>
                  <BreadcrumbItem><Link to="/menu">Menu</Link></BreadcrumbItem>
                  <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
                </Breadcrumb>
                <div className="col-12">
                  <h3>{props.dish.name}</h3>
                  <hr />
                </div>                
              </div>
              <div className="row">
                <div className="col-12 col-md-5 m-1">
                  <RenderDish dish={props.dish} />
                </div>
                <div className="col-12 col-md-5 m-1">
                  <RenderComments comments={props.comments}
				  addComment={props.addComment}
				  dishId={props.dish.id}/>
                </div>
              </div>
            </div>
        );
	
    } else {
	return (<div></div>);
    }
};

export default DishDetail;
