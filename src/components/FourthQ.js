import React from "react";

export default class FirstQ extends React.Component {
  render() {
    return (
      <div className="fourthQ">
        {this.props.name && (
          <h5 className="fourthQText">
            {this.props.name}, ¿vas a utilizar/consumir/cargar cursos del
            catálogo de IPE?
          </h5>
        )}
        {!this.props.name && (
          <h5 className="fourthQText">
            ¿Vas a utilizar/consumir/cargar cursos del catálogo de IPE?
          </h5>
        )}

        <ul>
          <li onClick={this.props.handleClick}>Sí</li>
          <li onClick={this.props.handleClick}>No, cargaré cursos propios</li>
          <li onClick={this.props.handleClick}>Ambas</li>
        </ul>
      </div>
    );
  }
}
