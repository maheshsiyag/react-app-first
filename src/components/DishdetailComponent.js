import React from 'react';
import { Card, CardBody, CardImg, CardText, CardTitle } from 'reactstrap';
import moment from 'moment';
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

function RenderComments({ comment }) {
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

const Dishdetail = (props) => {
    if (props.dishes == null) {
        return (
            <div></div>
        );
    }
    else {
        
        return (
            <div className="row">
                <div className="col-12 col-md-5 m-1">
                    <Card>
                        <CardImg src={props.dishes.image} alt={props.dishes.name} width="100%" />
                        <RenderDish dish={props.dishes} />
                    </Card>
                </div>
                <div className="col-12 col-md-5 m-1">
                    <RenderComments comment={props.dishes.comments} />
                </div>
            </div>
        );
    }
}
//new Intl.DateTimeFormat('en-us', { year: 'numeric', month: 'sort', day: '2-digit' }).format(new Date(Date.parse('2012-10-16T17:57:28.556094Z')));
export default Dishdetail;