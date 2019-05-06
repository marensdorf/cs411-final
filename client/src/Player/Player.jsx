import React, { Component } from 'react'
import { Button } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import NavigationBar from '../NavigationBar/NavigationBar.jsx'

// 'Player' is already defined as the class name, so provide an alias
// 'Player-header' from the SCSS file gets transformed to 'PlayerHeader'
//    because '-' is not allowed in JS variable names
import { Player as PlayerCss, PlayerHeader } from './Player.module.scss'

class Player extends Component {

  componentDidMount() {
    this.url = "/api/players/" + this.props.match.params.value
    axios.get(this.url).then((response) => {
      this.setState({
        Player_id: this.props.match.params.value,
        Player: response.data.data
      })
      // console.log(this.state.items);
      this.render();
    }).catch((error) => {
      console.log(error);
    })
  }

  deletePage() {
    axios.delete(this.url).then((response) => {
      this.setState({
        Player: []
      })
      this.render();
    }).catch((error) => {
      console.log(error);
    })
  }

  constructor() {
    super();

    this.state = {
      Player_id: 0,
      Player: []
    };

    this.componentDidMount = this.componentDidMount.bind(this);
    this.deletePage = this.deletePage.bind(this);
  }

  render() {
    var rows = [];
    this.state.Player.forEach((item, index) => {
        rows.push(
            <tr key={index} >
              <td><Link to={"/matches/" + item.match_id}>{item.match_id}</Link></td>
              <td>{item.localized_name}</td>
              <td>{item.kills}</td>
              <td>{item.deaths}</td>
              <td>{item.assists}</td>
              <td>{item.gold_per_min}</td>
              <td>{item.xp_per_min}</td>
            </tr>
          );
    });
    return (
      <div>
        <NavigationBar />
        <div className={PlayerCss}>
          <div className={PlayerHeader}>
            <Link to="/players/"> <Button> Return </Button> </Link>
            <Button align="right" onClick={this.deletePage}> Delete </Button>
          </div>

          <table className="table table-bordered table-responsive">
            <thead>
              <tr>
                <th>Match ID</th>
                <th>Hero</th>
                <th>K</th>
                <th>D</th>
                <th>A</th>
                <th>GPM</th>
                <th>XPM</th>
              </tr>
            </thead>
            <tbody>
              {rows}
            </tbody>
          </table>
        </div>
      </div>
    )
  }

}

export default Player
