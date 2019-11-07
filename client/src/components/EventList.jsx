import React from 'react';
import Event from './Event.jsx';

const EventList = ({ events }) => {
  const myEvents = events.map((event, i) => {
    return <Event key={i} event={event}></Event>
  });

  return (
    <div>{myEvents}</div>
  );
}

export default EventList;