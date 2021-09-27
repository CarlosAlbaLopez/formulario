import React from "react";

export default class Welcome extends React.Component {
  render() {
    return (
      <div>
        <h4 className="welcome">
          ¡Nos encanta que quieras formarte con nosotros!
        </h4>
        <p>
          En Ideaspropias queremos darte la formación que mejor se adapte a tus
          necesidades. Para ello, agradecemos que dediques unos segundos a
          responder a unas sencillas preguntas y así ofrecerte un mejor
          servicio.
        </p>
        <h5 className="welcome">
          Para empezar, indícanos tu nombre y la razón social de tu empresa.
        </h5>
        <input
          type="text"
          onChange={this.props.handleNameInput}
          placeholder="nombre"
          value={this.props.name}
        />
        <input
          type="text"
          onChange={this.props.handleInput}
          placeholder="razón social"
          value={this.props.client}
        />
        <button className="acceptBtn" onClick={this.props.handleAcceptBtn}>
          Aceptar
        </button>
      </div>
    );
  }
}
