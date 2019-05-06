import React, { Component } from 'react'
import { Button, List } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import NavigationBar from '../NavigationBar/NavigationBar.jsx'

// 'Matches' is already defined as the class name, so provide an alias
// 'Matches-header' from the SCSS file gets transformed to 'MatchesHeader'
//    because '-' is not allowed in JS variable names
import { Matches as MatchesCss, MatchesHeader } from './Matches.module.scss'

var conciseDate = function(date) {
  return 'H:M:S Y-m-d'
    .replace('Y', date.getFullYear())
    .replace('m', date.getMonth()+1)
    .replace('d', date.getDate())
    .replace('H', date.getHours())
    .replace('M', date.getMinutes())
    .replace('S', date.getSeconds())
}

class Matches extends Component {
  incrementPage(event) {
    this.setState({ page: this.state.page + 1 }, this.componentDidMount)
  }
  decrementPage(event) {
    this.setState({ page: Math.max(0, this.state.page - 1) }, this.componentDidMount)
  }

  componentDidMount() {
    this.url = "/api/matches?page=" + this.state.page
    axios.get(this.url).then((response) => {
      this.setState({
        items: response.data.data,
      })
      // console.log(this.state.items);
      this.render();
    }).catch((error) => {
      console.log(error);
    })
  }

  constructor() {
    super();

    this.state = {
      page: 0,
      items: []
    };

    this.componentDidMount = this.componentDidMount.bind(this);
    this.incrementPage = this.incrementPage.bind(this);
    this.decrementPage = this.decrementPage.bind(this);
  }

  render() {
    var rows = [];
    this.state.items.forEach((item) => {
        rows.push(
            <List.Item key={item.match_id}>
              <List.Content><Link to={"/matches/" + item.match_id}>{item.match_id}</Link></List.Content>
              <List.Content floated="right">{conciseDate(new Date(item.start_time * 1000))}</List.Content>
              <List.Content floated="right">{item.duration%60 + ":" + Math.trunc(item.duration/60)}</List.Content>
              <List.Content>{item.radiant_win === "True" ? "Radiant" : "Dire"}</List.Content>
              <List.Content>{item.rad_kills} - {item.dire_kills}</List.Content>
            </List.Item>

          );
    });
    return (
      <div className={MatchesCss}>
        <NavigationBar />
        <h1 className={MatchesHeader}>Welcome to the Dota 2 Browser!</h1>

        <List animated celled>
          {rows}
        </List>
        <Button onClick={this.decrementPage}>&#10094;</Button>
        <Button onClick={this.incrementPage}>&#10095;</Button>
      </div>
    )
  }

}

export default Matches
