import React, { Component } from 'react'
import { Button } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import NavigationBar from '../NavigationBar/NavigationBar.jsx'

// 'Players' is already defined as the class name, so provide an alias
// 'Players-header' from the SCSS file gets transformed to 'PlayersHeader'
//    because '-' is not allowed in JS variable names
import { Players as PlayersCss } from './Players.module.scss'

class Players extends Component {
  incrementPage(event) {
    this.setState({ page: this.state.page + 1 }, this.componentDidMount)
  }
  decrementPage(event) {
    this.setState({ page: Math.max(0, this.state.page - 1) }, this.componentDidMount)
  }

  signup() {
    this.url = "/api/players/"
    axios.get(this.url + "max").then((response) => {
      var newuser = {
        account_id: parseInt(response.data.data[0].max) + 1,
        total_wins: 0,
        total_matches: 0
      }
      axios.post(this.url, newuser).then((response2) => {
        this.state.items.unshift(newuser);
        this.state.items.pop();
        this.setState({
          items: this.state.items
        })
        this.render();
      }).catch((error) => {
        console.log(error);
      })
    }).catch((error) => {
      console.log(error);
    })
  }

  componentDidMount() {
    this.url = "/api/players?page=" + this.state.page
    axios.get(this.url).then((response) => {
      this.setState({
        items: response.data.data,
      })
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
    this.signup = this.signup.bind(this);
  }

  render() {
    // console.log(this.state.items);
    var rows = [];
    this.state.items.forEach((item) => {
        rows.push(
            <tr key={item.account_id} >
              <td><Link to={"/players/" + item.account_id}>{item.account_id}</Link></td>
              <td>{item.total_wins}</td>
              <td>{item.total_matches}</td>
              <td>{parseFloat(item.trueskill_mu.toFixed(2))}</td>
              <td>{parseFloat(item.trueskill_sigma.toFixed(2))}</td>
            </tr>
          );
    });
    return (
      <div>
        <NavigationBar />
        <div className={PlayersCss}>
          <Button onClick={this.signup}> Sign Up </Button>

          <table className="table table-bordered table-responsive">
            <thead>
              <tr>
                <th>Account ID</th>
                <th>Wins</th>
                <th>Matches</th>
                <th>Skill Rating</th>
                <th>Rating Variance</th>
              </tr>
            </thead>
            <tbody>
              {rows}
            </tbody>
          </table>
          <Button onClick={this.decrementPage}>&#10094;</Button>
          <Button onClick={this.incrementPage}>&#10095;</Button>
        </div>
      </div>
    )
  }

}

export default Players
