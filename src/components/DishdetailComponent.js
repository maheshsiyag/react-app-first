import React, { Component } from 'react';
import { Card, CardBody, CardImg, CardText, CardTitle } from 'reactstrap';
import moment from 'moment';

class Dishdetail extends Component {
    //constructor(props) {
    //    super(props);
    //}
    renderDish(dish) {
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
    renderComments(comment) {
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
                </div>
            );
        else
            return (
                <div></div>
            );
    }
    render() {
        if (this.props.dishes == null) {
            return (
                <div></div>
            );
        }
        else {
            const cooms = this.props.dishes.comments.map((coment) => {
                return (
                    <div key={coment.id} >
                        <p>{coment.comment}</p>
                        <p>-- {coment.author}, {moment(coment.date).format('MMM DD, YYYY')}</p>
                    </div>
                    );
            });
            return (
                <div className="row">
                    <div className="col-12 col-md-5 m-1">
                    <Card>
                            <CardImg src={this.props.dishes.image} alt={this.props.dishes.name} width="100%" />
                            {this.renderDish(this.props.dishes)}
                        </Card>
                    </div>
                    <div className="col-12 col-md-5 m-1">
                        {this.renderComments(this.props.dishes.comments)}
                    </div>
                </div>
            );
        }
    }
}
export default Dishdetail;