import React, {Component} from 'react';
import { Navbar, Nav, NavItem } from 'react-bootstrap'
import { Grid } from 'react-bootstrap';
import './menu.css';

export default class Menu extends Component {
    render(){
        return (
            <div className="custom-nav">
                <Navbar>
                    <Navbar.Header>
                        <Navbar.Brand>
                            <a href="#brand">Calander</a>
                        </Navbar.Brand>
                    </Navbar.Header>
                </Navbar>
            </div>
        )
    }
}