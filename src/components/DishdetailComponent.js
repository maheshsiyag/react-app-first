import React from 'react';
import { Card, CardBody, CardImg, CardText, CardTitle, Breadcrumb, BreadcrumbItem} from 'reactstrap';
import moment from 'moment';
import { Link } from 'react-router-dom';

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
    if (props.dish == null) {
        return (
            <div></div>
        );
    }
    else {
        
        return (
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
                    <Card>
                        <CardImg src={props.dish.image} alt={props.dish.name} width="100%" />
                        <RenderDish dish={props.dish} />
                    </Card>
                </div>
                <div className="col-12 col-md-5 m-1">
                    <RenderComments comment={props.comment} />
                </div>
                </div>
            </div>
        );
    }
}
//new Intl.DateTimeFormat('en-us', { year: 'numeric', month: 'sort', day: '2-digit' }).format(new Date(Date.parse('2012-10-16T17:57:28.556094Z')));
export default Dishdetail;