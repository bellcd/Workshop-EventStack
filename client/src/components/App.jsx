import React, { Component } from 'react'
import EventList from './EventList.jsx';
import $ from 'jquery';

export default class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      title: '',
      description: '',
      summary: '',
      startDate: '',
      endDate: '',
      cost: '',
      searchTerm: '',
      possibleEvents: [],
      events: [],
      filteredEvents: []
    }

    this.search = this.search.bind(this);
    this.updateSearch = this.updateSearch.bind(this);
    this.addEvent = this.addEvent.bind(this);
    this.getEvents = this.getEvents.bind(this);
    this.addEvent = this.addEvent.bind(this);

    this.updateTitle = this.updateTitle.bind(this);
    this.updateDescription = this.updateDescription.bind(this);
    this.updateSummary = this.updateSummary.bind(this);
    this.updateStartDate = this.updateStartDate.bind(this);
    this.updateEndDate = this.updateEndDate.bind(this);
    this.updateCost = this.updateCost.bind(this);
  }

  componentDidMount() {
    this.getEvents();
    this.getPossibleEvents();
  }

  getPossibleEvents() {
    $.ajax({
      url: `http://localhost:3007/possible-events`,
      method: 'GET',
      dataType: 'json',
      success: (possibleEvents) => {
        this.setState({ possibleEvents });
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  getEvents() {
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

  addEvent() {
    const event = {
      title: this.state.title,
      description: this.state.description,
      summary: this.state.summary,
      startDate: this.state.startDate,
      endDate: this.state.endDate,
      cost: this.state.cost
    };

    $.ajax({
      url: `http://localhost:3007/event`,
      method: 'POST',
      contentType: 'application/json',
      data: JSON.stringify(event),
      success: (data) => {
        console.log('event saved to database!')
        this.getEvents();
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  updateTitle(e) {
    this.setState({ title: e.target.value })
  }

  updateDescription(e) {
    this.setState({ description: e.target.value })
  }

  updateSummary(e) {
    this.setState({ summary: e.target.value })
  }

  updateStartDate(e) {
    this.setState({ startDate: e.target.value })
  }

  updateEndDate(e) {
    this.setState({ endDate: e.target.value })
  }

  updateCost(e) {
    this.setState({ cost: e.target.value })
  }

  updateSearch(e) {
    this.setState({
      searchTerm: e.target.value
    });
  }

  search() {
    const s = this.state.searchTerm;
    const filteredEvents = this.state.events.filter((event) => {
      return (event.title.includes(s) || event.summary.includes(s) || event.description.includes(s));
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
        <h2>Add Your Event:</h2>
        <div>
          Title
          <label htmlFor="title"></label>
          <input id="title" type="text" value={this.state.title} onChange={this.updateTitle}></input>
        </div>
        <div>
          Description
          <label htmlFor="description"></label>
          <input id="description" type="text" value={this.state.description} onChange={this.updateDescription}></input>
        </div>
        <div>
          Summary
          <label htmlFor="summary"></label>
          <input id="summary" type="text" value={this.state.summary} onChange={this.updateSummary}></input>
        </div>
        <div>
          Start Date
          <label htmlFor="start-date"></label>
          <input id="start-date" type="text" value={this.state.startDate} onChange={this.updateStartDate}></input>
        </div>
        <div>
          End Date
          <label htmlFor="end-date"></label>
          <input id="end-date" type="text" value={this.state.endDate} onChange={this.updateEndDate}></input>
        </div>
        <div>
          Cost
          <label htmlFor="cost"></label>
          <input id="cost" type="text" value={this.state.cost} onChange={this.updateCost}></input>
        </div>
        <button onClick={this.addEvent}>Add</button>
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
