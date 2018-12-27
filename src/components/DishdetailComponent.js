import React, { Component } from 'react';
import { Card, CardBody, CardImg, CardText, CardTitle, Breadcrumb, BreadcrumbItem, Button, Modal, ModalHeader, ModalBody, Label, Col, Row } from 'reactstrap';
import moment from 'moment';
import { Link } from 'react-router-dom';
import { Control, LocalForm, Errors } from 'react-redux-form';
import { Loading } from './LoadingComponent';

const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => val && (val.length >= len);

class CommentForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isModalOpen: false
        };
        this.toggleModal = this.toggleModal.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    toggleModal() {
        this.setState({
            isModalOpen: !this.state.isModalOpen
        });
    }
    handleSubmit(value) {
        this.props.addComment(this.props.dishId, value.rating, value.author, value.comment);
        this.toggleModal();
    }
    render() {
        return (
            <div>
                <Button outline onClick={this.toggleModal}><span className="fa fa-pencil fa-lg"></span> Submit Comment</Button>
                <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                    <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
                    <ModalBody>
                        <LocalForm onSubmit={(value) => this.handleSubmit(value)} >
                            <Row className="form-group">
                                <Label htmlFor="rating" md={12} >Rating</Label>
                                <Col md={12}>
                                    <Control.select model=".rating" id="rating" name="rating" className="form-control" >
                                        <option value="1">1</option>
                                        <option value="2">2</option>
                                        <option value="3">3</option>
                                        <option value="4">4</option>
                                        <option value="5">5</option>
                                    </Control.select>
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="author" md={12}>Your Name</Label>
                                <Col md={12}>
                                    <Control.text model=".author" id="author" name="author" placeholder="Your Name" className="form-control"
                                        validators={
                                            { required, maxLength: maxLength(15), minLength: minLength(3) }
                                        } />
                                </Col>
                                <Errors className="text-danger"
                                    md={12}
                                    model=".author"
                                    show="touched"
                                    messages={{
                                        required: 'Required',
                                        minLength: 'Must be greater than 2 characters',
                                        maxLength: 'Must be 15 characters or less'
                                    }} />

                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="comment" md={12}>Comment</Label>
                                <Col md={12}>
                                    <Control.textarea model=".comment" id="comment" name="comment" rows="6" className="form-control"  />
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Col md={12}>
                                    <Button type="submit" value="submit" color="primary">Submit</Button>
                                </Col>
                            </Row>
                        </LocalForm>
                    </ModalBody>
                </Modal>
            </div>    
        );
    }
}




function RenderDish({ dish }) {
    if (dish != null) {
        return (
            <CardBody>
                <CardTitle>{dish.name}</CardTitle>
                <CardText>{dish.description}</CardText>
            </CardBody>
        );
    }
    else {
        return (<div></div>);
    }
}

function RenderComments({ comment, addComment, dishId }) {
    const cooms = comment.map((coment) => {
        return (
            <div key={coment.id} >
                <li>{coment.comment}</li>
                <li>-- {coment.author}, {moment(coment.date).format('MMM DD, YYYY')}</li>
            </div>
        );
    });
    if (comment != null)
        return (
            <div>
                <h4>Comments</h4>
                <ul className="list-unstyled">{cooms}</ul>
                <CommentForm dishId={dishId} addComment={addComment} />
            </div>
        );
    else
        return (
            <div></div>
        );
}

const Dishdetail = (props) => {
    if (props.isLoading) {
        return (
            <div className="container">
                <div className="row">
                    <Loading />
                </div>
            </div>
        );
    }
    else if (props.errMess) {
        return (
            <div className="container">
                <div className="row">
                    <h4>{props.errMess}</h4>
                </div>
            </div>
        );
    }
    else if (props.dish != null) {
        
        return (
            <div className="container">
            <div className="row">
                <Breadcrumb>
                        <BreadcrumbItem><Link to="/home">Home</Link></BreadcrumbItem>
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
                    <Card>
                        <CardImg src={props.dish.image} alt={props.dish.name} width="100%" />
                        <RenderDish dish={props.dish} />
                    </Card>
                </div>
                    <div className="col-12 col-md-5 m-1">
                        <RenderComments comment={props.comment} addComment={props.addComment} dishId={props.dish.id} />
                </div>
                </div>
            </div>
        );
    }
}
//new Intl.DateTimeFormat('en-us', { year: 'numeric', month: 'sort', day: '2-digit' }).format(new Date(Date.parse('2012-10-16T17:57:28.556094Z')));
export default Dishdetail;