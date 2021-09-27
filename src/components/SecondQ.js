import React from "react";

export default class FirstQ extends React.Component {
  render() {
    return (
      <div className="secondQ">
        <h5 className="secondQText">
          ¿Tienes experiencia con plataformas educativas (e-learning)?
        </h5>
        <ul>
          <li onClick={this.props.handleClick}>Sí, con Moodle</li>
          <li onClick={this.props.handleClick}>Sí, pero no con Moodle</li>
          <li onClick={this.props.handleClick}>No</li>
        </ul>
      </div>
    );
  }
}
