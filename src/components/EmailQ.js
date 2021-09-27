import React from "react";

export default class FirstQ extends React.Component {
  render() {
    return (
      <div className="emailQ">
        <h5 className="emailQText">
          Ya casi hemos terminado, por favor, indícanos un email para enviarte
          la convocatoria.
        </h5>
        <input
          className="emailInput"
          type="email"
          onChange={this.props.handleEmail}
          value={this.props.clientEmail}
        />
        <button className="acceptBtn" onClick={this.props.handleAcceptBtn}>
          Aceptar
        </button>
      </div>
    );
  }
}
