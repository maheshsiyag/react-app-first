import React, { Component } from 'react';
import { Navbar, NavbarBrand, Card, CardImg, CardImgOverlay, CardTitle } from 'reactstrap';
import Dishdetail from './DishdetailComponent'; 

class Menu extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectDish: null
        };
    }
    onDishSelect(dishes) {
        this.setState({
            selectDish: dishes
        });
    }
    render() {
        //each return item add to list menu is least
        const menu = this.props.dises.map((dis) => {
            return (
                <div key={dis.id} className="col-12 col-md-5 m-1">

                    <Card onClick={() => this.onDishSelect(dis)}>
                        <CardImg width="100%" src={dis.image} alt={dis.name} />
                        <CardImgOverlay>
                            <CardTitle>{dis.name}</CardTitle>
                        </CardImgOverlay>
                    </Card>
                </div>
                );
        });
        return (
            <div>
            <Navbar light color="primary">
                <div className="container">
                    <NavbarBrand href="/">
                        Mahesh Siyag
                    </NavbarBrand>
                </div>
            </Navbar>
            <div className="container" >
                <div className="row">
                    
                        {menu}
                        
                  </div>
                    <Dishdetail dishes={this.state.selectDish} />  
                                            
            </div>
            </div>
            
        );
    };
}
export default Menu;