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
        <input
          className="emailInput none"
          type="email"
          onChange={this.props.handleSecondEmail}
          value={this.props.secondEmail}
        />
        <input
          className="emailInput none"
          type="email"
          onChange={this.props.handleThirdEmail}
          value={this.props.thirdEmail}
        />
        <input
          className="emailInput none"
          type="email"
          onChange={this.props.handleFourthEmail}
          value={this.props.fourthEmail}
        />
        <input
          className="emailInput none"
          type="email"
          onChange={this.props.handleFifthEmail}
          value={this.props.fifthEmail}
        />
        <input
          className="emailInput none"
          type="email"
          onChange={this.props.handleSixthEmail}
          value={this.props.sixthEmail}
        />
        <input
          className="emailInput none"
          type="email"
          onChange={this.props.handleSeventhEmail}
          value={this.props.seventhEmail}
        />
        <input
          className="emailInput none"
          type="email"
          onChange={this.props.handleEighthEmail}
          value={this.props.eighthEmail}
        />
        <input
          className="emailInput none"
          type="email"
          onChange={this.props.handleNinthEmail}
          value={this.props.ninthEmail}
        />
        <button className="addEmail" onClick={addEmail}>
          &#x271A;
        </button>
        <br />
        <button className="acceptBtn" onClick={this.props.handleAcceptBtn}>
          Aceptar
        </button>
      </div>
    );
  }
}

function addEmail(e) {
  let hiddenInputs = document.querySelectorAll(".none");
  if (hiddenInputs[0]) {
    hiddenInputs[0].classList.remove("none");
  } else {
    e.target.classList.add("none");
  }
}
