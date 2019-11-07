import React, { Component } from 'react'
import EventList from './EventList.jsx';

export default class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      events: [
        {name: 'AngularConnect'},
        {name: 'DevFest'},
        {name: 'JSConf'},
        {name: 'VueConf'},
        {name: 'ReactConf'}
      ]
    }
  }

  render() {
    return (
      <div>
        <h1>EventStack</h1>
        <EventList events={this.state.events}></EventList>
      </div>
    )
  }
}
