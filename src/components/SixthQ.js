import React from "react";

export default class FirstQ extends React.Component {
  render() {
    return (
      <div className="sixthQ">
        <h5 className="sixthQText">¿Qué quieres aprender en esta formación?</h5>
        <ul>
          <li onClick={this.props.handleClick}>Aprender a crear un curso</li>
          <li onClick={this.props.handleClick}>
            Aprender a crear y matricular usuarios
          </li>
          <li onClick={this.props.handleClick}>
            Conocer las herramientas de un curso y trabajar con ellas
          </li>
          <li onClick={this.props.handleClick}>
            Saber cómo realizar el seguimiento a los alumnos
          </li>
          <li onClick={this.props.handleClick}>Otra</li>
          {this.props.anotherInSixthQ && (
            <textarea
              id="tAreaTwo"
              onChange={this.props.handleTArea}
              cols={60}
              value={this.props.textAreaTwoValue}
            ></textarea>
          )}
        </ul>
        <button className="acceptBtn" onClick={this.props.handleAcceptBtn}>
          Aceptar
        </button>
      </div>
    );
  }
}
