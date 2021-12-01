import React from "react";

function getWeekNumber(d) {
  d = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
  d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay() || 7));
  let yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
  let weekNo = Math.ceil(((d - yearStart) / 86400000 + 1) / 7);
  return [d.getUTCFullYear(), weekNo];
}

let currentWeek = getWeekNumber(new Date());

let d = new Date(),
  year = d.getYear(),
  fridays = [];

d.setDate(1);

// Get the first Friday in the month
while (d.getDay() !== 5) {
  d.setDate(d.getDate() + 1);
}

// Get all the other Fridays in the month
while (d.getYear() === year || d.getYear() === year + 1) {
  let pushDate = new Date(d.getTime());
  let weekNo = getWeekNumber(pushDate);
  fridays.push([
    pushDate.getDate() +
      "/" +
      (pushDate.getMonth() + 1) +
      "/" +
      pushDate.getFullYear(),
    weekNo[1],
    weekNo[0],
  ]);
  d.setDate(d.getDate() + 7);
}

// Change 24/12/21 (friday) to 23/12/21 (thursday)
for (let v of fridays) if (v[0] === "24/12/2021") v[0] = "23/12/2021";

export default class CalendarQ extends React.Component {
  constructor(props) {
    super(props);
    this.isPastMonday = this.isPastMonday.bind(this);
  }

  isPastMonday() {
    let value = 0,
      today = new Date();

    if (this.props.onlyVirtual) {
      if (currentWeek[1] % 2 === 0 && today.getDay() > 1) value = 1;
    } else {
      if (currentWeek[1] % 2 !== 0 && today.getDay() > 1) value = 1;
    }

    return value;
  }

  render() {
    return (
      <div>
        {this.props.onlyVirtual && (
          <div className="calendarQ">
            <h5 className="calendarQText">
              ¿Qué día quieres programar la reunión para Aula Virtual?
            </h5>
            <h6>
              Recuerda que todas nuestras formaciones se realizan los viernes y
              tienen una duración aproximada de una hora.
            </h6>
            <ul className="ListOfFridays">
              {fridays
                .filter(
                  (day) =>
                    day[1] >= currentWeek[1] || (day[2] > year && day[1] < 14)
                )
                .filter((day) => day[1] % 2 === 0)
                .filter((day) => day[0].substring(0, 5) !== "31/12")
                .slice(this.isPastMonday(), 4 + this.isPastMonday())
                .map((day) => (
                  <li key={day[2] + day[1]} onClick={this.props.handleClick}>
                    {day[0]}
                  </li>
                ))}
            </ul>
          </div>
        )}
        {!this.props.onlyVirtual && (
          <div className="calendarQ">
            <h5 className="calendarQText">
              ¿Qué día quieres programar la reunión para Formación Integral?
            </h5>
            <h6>
              Recuerda que todas nuestras formaciones se realizan los viernes y
              tienen una duración aproximada de tres horas.
            </h6>
            <ul className="ListOfFridays">
              {fridays
                .filter(
                  (day) =>
                    day[1] >= currentWeek[1] || (day[2] > year && day[1] < 14)
                )
                .filter((day) => day[1] % 2 !== 0)
                .filter((day) => day[0].substring(0, 3) !== "7/1")
                .slice(this.isPastMonday(), 4 + this.isPastMonday())
                .map((day) => (
                  <li key={day[2] + day[1]} onClick={this.props.handleClick}>
                    {day[0]}
                  </li>
                ))}
            </ul>
          </div>
        )}
      </div>
    );
  }
}
