import React from "react";

export default class FirstQ extends React.Component {
  render() {
    return (
      <div className="firstQ">
        {this.props.name && (
          <h5 className="firstQText">
            ¿Es la primera formación que solicitas, {this.props.name}?
          </h5>
        )}
        {!this.props.name && (
          <h5 className="firstQText">
            ¿Es la primera formación que solicitas?
          </h5>
        )}
        <ul>
          <li onClick={this.props.handleClick}>Sí</li>
          <li onClick={this.props.handleClick}>Necesito un refuerzo</li>
          <li onClick={this.props.handleClick}>
            Ya he trabajado con la plataforma, pero necesito ver Aula Virtual
          </li>
        </ul>
      </div>
    );
  }
}
