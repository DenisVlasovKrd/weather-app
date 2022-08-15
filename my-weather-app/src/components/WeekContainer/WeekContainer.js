import React from 'react';
import Card from '../Card/Card';

const weatherAlert = prompt('Введите название города на латиннице', "");

const weatherURL = `https://api.openweathermap.org/data/2.5/forecast?q=${weatherAlert}&lang=ru&units=metric&APPID=dbd1565a90dcc47322d40d28225c606d`;

class WeekContainer extends React.Component {
  state = {
    days: []
  }

  componentDidMount = () => {
    fetch(weatherURL)
    .then(res => res.json())
    .then(data => {
      const dailyData = data.list.filter(reading => reading.dt_txt.includes("12:00:00"))
      this.setState({days: dailyData})
    })
  }

  formatCards = () => {
    return this.state.days.map((day, index) => <Card day={day} key={index}/>)
  }

  render() {
    return (
      <div className="">
      <h1 className="display-4 jumbotron">Прогноз погоды на 5 дней</h1>
      <h5 className="display-4 text-muted">{ weatherAlert }</h5>
        <div className="row justify-content-center">

          {this.formatCards()}

        </div>
      </div>
    )
  }
}

export default WeekContainer
