import React from "react";

export default class FirstQ extends React.Component {
  render() {
    return (
      <div className="fifthQ">
        <h5 className="fifthQText">
          ¿Tus cursos deben tener alguna particularidad especial?
        </h5>
        <ul>
          <li onClick={this.props.handleClick}>No.</li>
          <li onClick={this.props.handleClick}>
            Sí. (Deben llevar alguna documentación específica, el sistema de
            evaluación tiene que ser de un modo determinado, etc.).
          </li>
          {this.props.yesToFifthQ && (
            <div className="fifthQExtraItems">
              <textarea
                id="tArea"
                onChange={this.props.handleTArea}
                cols={60}
                placeholder="Por favor, especifica cuáles serían..."
                value={this.props.fifthAnswer}
              ></textarea>{" "}
              <div>
                <button
                  className="extraBtn"
                  onClick={this.props.handleExtraBtn}
                >
                  Aceptar
                </button>
              </div>
            </div>
          )}
        </ul>
      </div>
    );
  }
}
