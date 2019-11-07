import React, { Component } from 'react'
import EventList from './EventList.jsx';

export default class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      searchTerm: '',
      events: [
        {name: 'AngularConnect'},
        {name: 'DevFest'},
        {name: 'JSConf'},
        {name: 'VueConf'},
        {name: 'ReactConf'}
      ],
      filteredEvents: []
    }

    this.search = this.search.bind(this);
    this.updateSearch = this.updateSearch.bind(this);
  }

  updateSearch(e) {
    this.setState({
      searchTerm: e.target.value
    });
  }

  search() {
    const filteredEvents = this.state.events.filter((event) => {
      return event.name.includes(this.state.searchTerm);
    });

    if (filteredEvents.length === 0) {
      filteredEvents.push({ name: 'No matches!'});
    }

    this.setState({ filteredEvents });
  }


  render() {
    return (
      <div>
        <h1>EventStack</h1>
        <EventList events={this.state.events}></EventList>
        <input type="text" onChange={this.updateSearch} value={this.searchTerm}></input>
        <button onClick={this.search}>Search</button>

        <div>Matches and Partial Matches</div>
        <EventList events={this.state.filteredEvents}></EventList>
      </div>
    )
  }
}
