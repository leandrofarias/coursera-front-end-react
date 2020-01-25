import React, { Component } from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle, Breadcrumb, BreadcrumbItem, Button,
    Modal, ModalHeader, ModalBody, Row, Col, Label } from 'reactstrap';
import { Control, LocalForm, Errors } from 'react-redux-form';
import { Link } from 'react-router-dom';

import { baseUrl } from '../shared/baseUrl';

import { Loading } from './LoadingComponent';

const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => val && (val.length >= len);

class CommentForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isModalOpen: false
        };
        
        this.toggleModal = this.toggleModal.bind(this);
    }

    toggleModal() {
        this.setState({
          isModalOpen: !this.state.isModalOpen
        });
    }

    handleSubmit(values) {
        this.toggleModal();
        this.props.postComment(this.props.dishId, values.rating, values.author, values.comment);
    }
    
    render() {
        return (
            <React.Fragment>
                <Button outline onClick={this.toggleModal}>
                    <span className="fa fa-pencil fa-lg"></span> Submit Comment
                </Button>
                <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                    <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
                    <ModalBody>
                        <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
                            <Col className="form-group">
                                <Row>
                                    <Label htmlFor="rating">Rating</Label>
                                </Row>
                                <Row>
                                    <Control.select model=".rating" id="rating" name="rating"
                                        className="form-control" defaultValue="1">
                                        <option>1</option>
                                        <option>2</option>
                                        <option>3</option>
                                        <option>4</option>
                                        <option>5</option>
                                    </Control.select>
                                </Row>
                            </Col>
                            <Col className="form-group">
                                <Row>
                                    <Label htmlFor="author">Your Name</Label>
                                </Row>
                                <Row>
                                    <Control.text model=".author" id="author" name="author"
                                        placeholder="Your Name"
                                        className="form-control"
                                        validators={{ minLength: minLength(3), maxLength: maxLength(15) }}/>
                                    <Errors className="text-danger" model=".author" show="touched"
                                        messages={{ minLength: 'Must be greater than 2 characters', maxLength: 'Must be 15 characters or less' }}/>
                                </Row>
                            </Col>
                            <Col className="form-group">
                                <Row>
                                    <Label htmlFor="comment">Comment</Label>
                                </Row>
                                <Row>
                                    <Control.textarea model=".comment" id="comment" name="comment"
                                        rows="6" className="form-control"/>
                                </Row>
                            </Col>
                            <Col className="form-group">
                                <Row>
                                    <Button type="submit" color="primary">Submit</Button>
                                </Row>
                            </Col>
                        </LocalForm>
                    </ModalBody>
                </Modal>
            </React.Fragment>
        );
    }
}

const RenderDish = ({ dish }) => {
    if (dish == null) {
        return (
            <div></div>
        );
    }

    return (
        <div className="col-12 col-md-5 m-1">
            <Card>
                <CardImg top src={baseUrl + dish.image} alt={dish.name} />
                <CardBody>
                    <CardTitle>{dish.name}</CardTitle>
                    <CardText>{dish.description}</CardText>
                </CardBody>
            </Card>
        </div>
    );
};

const RenderComments = ({ dishId, comments, postComment }) => {
    if (comments == null) {
        return (
            <div></div>
        );
    }

    return (
        <div className="col-12 col-md-5 m-1">
            <h4>Comments</h4>
            <ul className="list-unstyled">
                {
                    comments.map(comment => {
                        return (
                            <li key={comment.id}>
                                <p>{comment.comment}</p>
                                <p>-- {comment.author}, {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(comment.date)))}</p>
                            </li>
                        );
                    })
                }
            </ul>
            <CommentForm dishId={dishId} postComment={postComment}/>
        </div>
    );
};

const DishDetail = (props) => {
    if (props.isLoading) {
        return (
            <div className="container">
                <div className="row">            
                    <Loading/>
                </div>
            </div>
        );
    }
    else if (props.errorMessage) {
        return (
            <div className="container">
                <div className="row">            
                    <h4>{props.errorMessage}</h4>
                </div>
            </div>
        );
    } else if (props.dish == null) {
        return (
            <div></div>
        );
    }

    return (
        <div className="container">
            <div className="row">
                <Breadcrumb>
                    <BreadcrumbItem>
                        <Link to="/menu">Menu</Link>
                    </BreadcrumbItem>
                    <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
                </Breadcrumb>
                <div className="col-12">
                    <h3>{props.dish.name}</h3>
                    <hr/>
                </div>
            </div>
            <div className="row">
                <RenderDish dish={props.dish}/>
                <RenderComments dishId={props.dish.id} comments={props.comments} postComment={props.postComment}/>
            </div>
        </div>
    );
};

export default DishDetail;