import React, { Component } from 'react'
import EventList from './EventList.jsx';
import $ from 'jquery';

export default class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      userInputtedEvent: '',
      searchTerm: '',
      events: [],
      filteredEvents: []
    }

    this.search = this.search.bind(this);
    this.updateSearch = this.updateSearch.bind(this);
    this.updateUserInputtedEvent = this.updateUserInputtedEvent.bind(this);
    this.addUserInputtedEvent = this.addUserInputtedEvent.bind(this);
  }

  componentDidMount() {
    $.ajax({
      url: `http://localhost:3007/events`,
      method: 'GET',
      dataType: 'json',
      success: (events) => {
        this.setState({ events });
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  updateUserInputtedEvent(e) {
    this.setState({
      userInputtedEvent: e.target.value
    });
  }

  addUserInputtedEvent() {
    this.setState((state, props) => {
      state.events.push({ name: state.userInputtedEvent });

      return { events: state.events };
    });
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
        <div>
          Add Your Event:
          <label htmlFor="user-inputted-event"></label>
          <input id="user-inputted-event" type="text" value={this.state.userInputtedEvent} onChange={this.updateUserInputtedEvent}></input>
          <button onClick={this.addUserInputtedEvent}>Add</button>
        </div>
        <EventList events={this.state.events}></EventList>
        <div>
          Search for an event
          <label htmlFor="search-term"></label>
          <input id="search-term" type="text" value={this.searchTerm} onChange={this.updateSearch}></input>
          <button onClick={this.search}>Search</button>
        </div>
        <div>Matches and Partial Matches</div>
        <EventList events={this.state.filteredEvents}></EventList>
      </div>
    )
  }
}
