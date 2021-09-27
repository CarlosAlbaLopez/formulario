import React from "react";

export default class FirstQ extends React.Component {
  render() {
    return (
      <div className="thirdQ">
        <h5 className="thirdQText">¿Qué formación vas a impartir?</h5>
        <ul>
          <li onClick={this.props.handleClick}>Bonificada y/o Privada</li>
          <li onClick={this.props.handleClick}>Subvencionada</li>
          <li onClick={this.props.handleClick}>Sólo Aula Virtual</li>
          <li onClick={this.props.handleClick}>
            Certificados de Profesionalidad
          </li>
          <li onClick={this.props.handleClick}>Todas las anteriores</li>
          <li onClick={this.props.handleClick}>No lo tengo claro, aún</li>
        </ul>
        <button className="acceptBtn" onClick={this.props.handleAcceptBtn}>
          Aceptar
        </button>
      </div>
    );
  }
}
