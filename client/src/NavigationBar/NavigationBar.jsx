import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Icon } from 'semantic-ui-react';
import './NavigationBar.css';

class NavigationBar extends Component {
    render() {
        return (
            <div>
                <header className = "navigationbar">
                    <nav className = "navigationbar_body">
                        <div className = "navigationbar_items">
                            <ul>
                                <li>
                                    <Link to='/'>
                                        <p> Home</p>
                                    </Link>
                                </li>
                            </ul>
                        </div>
                        <div className = "navigationbar_spacer"></div>
                        <div className = "navigationbar_items">
                            <ul>
                                <li>
                                    <Link to='/matches'>
                                        <p>Matches </p>
                                    </Link>
                                </li>
                                <li>
                                    <Link to='/players'>
                                        <p>Players </p>
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </nav>
                </header>
            </div>
         );
    }
}

export default NavigationBar;
