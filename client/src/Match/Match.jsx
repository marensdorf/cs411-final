import React, { Component } from 'react'
import { Button } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import NavigationBar from '../NavigationBar/NavigationBar.jsx'

// 'Match' is already defined as the class name, so provide an alias
// 'Match-header' from the SCSS file gets transformed to 'MatchHeader'
//    because '-' is not allowed in JS variable names
import { Match as MatchCss, MatchHeader } from './Match.module.scss'

class Match extends Component {

  componentDidMount() {
    this.url = "/api/matches/" + this.props.match.params.value
    axios.get(this.url).then((response) => {
      this.setState({
        match_id: this.props.match.params.value,
        match: response.data.data
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
        match: []
      })
      this.render();
    }).catch((error) => {
      console.log(error);
    })
  }

  constructor() {
    super();

    this.state = {
      match_id: 0,
      match: []
    };

    this.componentDidMount = this.componentDidMount.bind(this);
    this.deletePage = this.deletePage.bind(this);
  }

  render() {
    var rows = [];
    this.state.match.forEach((item, index) => {
        if(index === 5) { rows.push(<tr><td> <br/> </td></tr>); }
        rows.push(
            <tr key={index} >
              <td><Link to={"/players/" + item.account_id}>{item.account_id}</Link></td>
              <td>{item.hero_name}</td>
              <td>{item.level}</td>
              <td>{item.total_gold}</td>
              <td>{item.gold_per_min}</td>
              <td>{item.xp_per_min}</td>
              <td>{item.kills}</td>
              <td>{item.deaths}</td>
              <td>{item.assists}</td>
              <td>{item.last_hits}</td>
              <td>{item.denies}</td>
              <td>{item.stuns}</td>
              <td>{item.hero_damage}</td>
              <td>{item.hero_healing}</td>
              <td>{item.tower_damage}</td>
              <td>{item.item_0}</td>
              <td>{item.item_1}</td>
              <td>{item.item_2}</td>
              <td>{item.item_3}</td>
              <td>{item.item_4}</td>
              <td>{item.item_5}</td>
            </tr>
          );
    });
    return (
      <div>
        <NavigationBar />
        <div className={MatchCss}>
          <div className={MatchHeader}>
            <Link to="/matches/"> <Button> Return </Button> </Link>
            <Button align="right" onClick={this.deletePage}> Delete </Button>
          </div>

          <table className="table table-bordered table-responsive">
            <thead>
              <tr>
                <th>Account ID</th>
                <th>Hero</th>
                <th>Level</th>
                <th>Gold</th>
                <th>GPM</th>
                <th>XPM</th>
                <th>K</th>
                <th>D</th>
                <th>A</th>
                <th>LH</th>
                <th>Denies</th>
                <th>Stuns</th>
                <th>Damage</th>
                <th>Healing</th>
                <th>Tower Damage</th>
                <th>Item 0</th>
                <th>Item 1</th>
                <th>Item 2</th>
                <th>Item 3</th>
                <th>Item 4</th>
                <th>Item 5</th>
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

export default Match
