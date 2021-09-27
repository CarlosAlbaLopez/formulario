import React from "react";

const calendarInt = [
  [35, "03 de Septiembre"],
  [37, "17 de Septiembre"],
  [39, "01 de Octubre"],
  [41, "15 de Octubre"],
  [43, "29 de Octubre"],
  [45, "12 de Noviembre"],
  [47, "26 de Noviembre"],
  [49, "10 de Diciembre"],
  [51, "23 de Diciembre"],
];
const calendarVir = [
  [36, "10 de Septiembre"],
  [38, "24 de Septiembre"],
  [40, "08 de Octubre"],
  [42, "22 de Octubre"],
  [44, "05 de Noviembre"],
  [46, "19 de Noviembre"],
  [48, "03 de Diciembre"],
  [50, "17 de Diciembre"],
  [52, "30 de Diciembre"],
];

function getWeekNumber(d) {
  d = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
  d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay() || 7));
  let yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
  let weekNo = Math.ceil(((d - yearStart) / 86400000 + 1) / 7);
  return [d.getUTCFullYear(), weekNo];
}

let currentWeek = getWeekNumber(new Date());

export default class FirstQ extends React.Component {
  render() {
    return (
      <div>
        {this.props.onlyVirtual && (
          <div className="calendarQ">
            <h5 className="calendarQText">
              ¿Qué día quieres programar la reunión para Aula Virtual?
            </h5>
            <ul className="ListOfFridays">
              {calendarVir
                .filter((day) => day[0] >= currentWeek[1])
                .slice(0, 4)
                .map((day) => (
                  <li key={day[0]} onClick={this.props.handleClick}>
                    {day[1]}
                  </li>
                ))}
            </ul>
            <h6>Horario aproximado de 10:00 a 11:00.</h6>
          </div>
        )}
        {!this.props.onlyVirtual && (
          <div className="calendarQ">
            <h5 className="calendarQText">
              ¿Qué día quieres programar la reunión para Formación Integral?
            </h5>
            <ul className="ListOfFridays">
              {calendarInt
                .filter((day) => day[0] >= currentWeek[1])
                .slice(0, 4)
                .map((day) => (
                  <li key={day[0]} onClick={this.props.handleClick}>
                    {day[1]}
                  </li>
                ))}
            </ul>
            <h6>Horario aproximado de 10:00 a 13:00.</h6>
          </div>
        )}
      </div>
    );
  }
}
