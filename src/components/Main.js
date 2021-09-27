import React from "react";
import "./Main.css";
import emailjs from "emailjs-com";
import logo from "../images/logo.png";
import Welcome from "./Welcome";
import FirstQ from "./FirstQ";
import SecondQ from "./SecondQ";
import ThirdQ from "./ThirdQ";
import FourthQ from "./FourthQ";
import FifthQ from "./FifthQ";
import SixthQ from "./SixthQ";
import CalendarQ from "./CalendarQ";
import EmailQ from "./EmailQ";
import End from "./End";

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentQuestion: 0,
      lastQuestion: 0,
      yesToFifthQ: false,
      anotherInSixthQ: false,
      name: "",
      client: "",
      textAreaTwoValue: "",
      firstAnswer: "",
      secondAnswer: "",
      thirdAnswer: [],
      fourthAnswer: "",
      fifthAnswer: "",
      sixthAnswer: [],
      calendarAnswer: "",
      onlyVirtual: false,
      clientEmail: "",
    };
    this.handleNameInput = this.handleNameInput.bind(this);
    this.handleInput = this.handleInput.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleBackBtn = this.handleBackBtn.bind(this);
    this.handleAcceptBtn = this.handleAcceptBtn.bind(this);
    this.handleExtraBtn = this.handleExtraBtn.bind(this);
    this.handleTArea = this.handleTArea.bind(this);
    this.handleForwardBtn = this.handleForwardBtn.bind(this);
    this.handleEmail = this.handleEmail.bind(this);
    this.sendEmail = this.sendEmail.bind(this);
  }

  handleInput(e) {
    this.setState({
      client: e.target.value,
    });
  }

  handleNameInput(e) {
    this.setState({
      name: e.target.value,
    });
  }

  handleClick(e) {
    if (this.state.currentQuestion === 1) {
      e.target.className = "selected";
      this.setState({
        firstAnswer: e.target.innerHTML,
      });
      if (
        e.target.innerHTML ===
        "Ya he trabajado con la plataforma, pero necesito ver Aula Virtual"
      ) {
        setTimeout(
          () =>
            this.setState({
              currentQuestion: 7,
              lastQuestion: 1,
              onlyVirtual: true,
            }),
          500
        );
      } else {
        setTimeout(
          () =>
            this.setState({
              currentQuestion: 2,
              lastQuestion: 1,
              onlyVirtual: false,
            }),
          500
        );
      }
    } else if (this.state.currentQuestion === 2) {
      e.target.className = "selected";
      this.setState({
        secondAnswer: e.target.innerHTML,
      });
      setTimeout(
        () =>
          this.setState({
            currentQuestion: 3,
            lastQuestion: 2,
          }),
        500
      );
    } else if (this.state.currentQuestion === 3) {
      if (e.target.className === "selected") {
        e.target.className = "";
      } else {
        e.target.className = "selected";
      }
    } else if (this.state.currentQuestion === 4) {
      e.target.className = "selected";
      if (e.target.innerHTML === "No, cargaré cursos propios") {
        this.setState({
          fourthAnswer: e.target.innerHTML,
        });
        setTimeout(
          () =>
            this.setState({
              currentQuestion: 5,
              lastQuestion: 4,
            }),
          500
        );
      } else {
        this.setState({
          fourthAnswer: e.target.innerHTML,
        });
        setTimeout(
          () =>
            this.setState({
              currentQuestion: 6,
              lastQuestion: 4,
            }),
          500
        );
      }
    } else if (this.state.currentQuestion === 5) {
      e.target.className = "selected";
      if (e.target.innerHTML === "Sí") {
        this.setState({
          yesToFifthQ: true,
        });
      } else {
        this.setState({
          fifthAnswer: e.target.innerHTML,
        });
        setTimeout(
          () =>
            this.setState({
              currentQuestion: 6,
              lastQuestion: 5,
            }),
          500
        );
      }
    } else if (this.state.currentQuestion === 6) {
      if (e.target.innerHTML === "Otra") {
        this.setState({
          anotherInSixthQ: true,
        });
      }
      if (e.target.className === "selected") {
        e.target.className = "";
      } else {
        e.target.className = "selected";
      }
    } else if (this.state.currentQuestion === 7) {
      e.target.className = "selected";
      this.setState({
        calendarAnswer: e.target.innerHTML,
      });
      setTimeout(
        () =>
          this.setState({
            currentQuestion: 8,
          }),
        500
      );
    }
  }

  handleAcceptBtn() {
    let selectedOptions = document.getElementsByClassName("selected");
    if (this.state.currentQuestion === 0) {
      if (this.state.client.length > 0) {
        this.setState({
          currentQuestion: 1,
        });
      } else {
        window.alert(
          "Debe indicar el nombre de su compañía antes de proceder."
        );
      }
    } else if (this.state.currentQuestion === 3) {
      if (
        selectedOptions.length === 1 &&
        selectedOptions[0].innerHTML === "Sólo Aula Virtual"
      ) {
        this.setState((prevState) => ({
          thirdAnswer: prevState.thirdAnswer.concat(
            selectedOptions[0].innerHTML
          ),
          currentQuestion: 7,
          lastQuestion: 3,
          onlyVirtual: true,
        }));
      } else {
        for (let i = 0; i < selectedOptions.length; i++) {
          this.setState((prevState) => ({
            thirdAnswer: prevState.thirdAnswer.concat(
              selectedOptions[i].innerHTML
            ),
          }));
        }
        this.setState({
          currentQuestion: 4,
          lastQuestion: 3,
          onlyVirtual: false,
        });
      }
    } else if (this.state.currentQuestion === 6) {
      for (let i = 0; i < selectedOptions.length; i++) {
        this.setState((prevState) => ({
          sixthAnswer: prevState.sixthAnswer.concat(
            selectedOptions[i].innerHTML
          ),
        }));
      }
      if (this.state.anotherInSixthQ) {
        let otherAnswer = document.getElementById("tAreaTwo");
        this.setState((prevState) => ({
          sixthAnswer: prevState.sixthAnswer.concat(otherAnswer.value),
        }));
      }
      this.setState({
        currentQuestion: 7,
        lastQuestion: 6,
      });
    } else if (this.state.currentQuestion === 8) {
      if (this.state.clientEmail.includes("@")) {
        if (this.state.client === "") {
          window.alert(
            "Por favor, responde la pregunta: Para empezar, indícanos tu nombre y la razón social de tu empresa."
          );
          setTimeout(
            () =>
              this.setState({
                currentQuestion: 0,
                lastQuestion: 0,
              }),
            500
          );
        } else if (this.state.firstAnswer === "") {
          window.alert(
            "Por favor, responde la pregunta: ¿Es la primera formación que solicitas?"
          );
          setTimeout(
            () =>
              this.setState({
                currentQuestion: 1,
                lastQuestion: 0,
              }),
            500
          );
        } else if (!this.state.onlyVirtual && this.state.secondAnswer === "") {
          window.alert(
            "Por favor, responde la pregunta: ¿Tienes experiencia con plataformas educativas (e-learning)?"
          );
          setTimeout(
            () =>
              this.setState({
                currentQuestion: 2,
                lastQuestion: 1,
              }),
            500
          );
        } else if (
          !this.state.onlyVirtual &&
          this.state.thirdAnswer.length === 0
        ) {
          window.alert(
            "Por favor, responde la pregunta: ¿Qué formación vas a impartir?"
          );
          setTimeout(
            () =>
              this.setState({
                currentQuestion: 3,
                lastQuestion: 2,
              }),
            500
          );
        } else {
          this.setState({
            currentQuestion: 9,
            lastQuestion: 8,
          });

          setTimeout(() => this.sendEmail(), 500);
        }
      } else {
        window.alert("Por favor, introduzca una dirección de email válida.");
      }
    }
  }

  handleTArea(e) {
    if (this.state.currentQuestion === 5) {
      this.setState({
        fifthAnswer: e.target.value,
      });
    } else if (this.state.currentQuestion === 6) {
      this.setState({
        textAreaTwoValue: e.target.value,
      });
    }
  }

  handleExtraBtn() {
    let answer = document.getElementById("tArea");
    this.setState({
      fifthAnswer: answer.value,
      currentQuestion: 6,
      lastQuestion: 5,
    });
  }

  handleEmail(e) {
    this.setState({
      clientEmail: e.target.value,
    });
  }

  handleForwardBtn() {
    this.setState((prevState) => ({
      currentQuestion: prevState.currentQuestion + 1,
      lastQuestion: prevState.currentQuestion,
    }));
  }

  handleBackBtn() {
    if (this.state.currentQuestion === 7) {
      this.state.lastQuestion === 1
        ? this.setState({
            currentQuestion: 1,
            lastQuestion: 0,
          })
        : this.state.lastQuestion === 3
        ? this.setState({
            currentQuestion: 3,
            lastQuestion: 2,
          })
        : this.setState({
            currentQuestion: 6,
            lastQuestion: 5,
          });
    } else if (this.state.currentQuestion === 6) {
      this.state.lastQuestion === 4
        ? this.setState({
            currentQuestion: 4,
            lastQuestion: 3,
          })
        : this.setState({
            currentQuestion: 5,
            lastQuestion: 4,
          });
    } else {
      this.setState((prevState) => ({
        currentQuestion: prevState.currentQuestion - 1,
        lastQuestion: prevState.lastQuestion - 1,
      }));
    }
  }

  sendEmail() {
    const a = "service_vlm7k9u",
      b = "template_rw7cd0r",
      c = "user_iWaQwq2FAyAJRfwdEhOnt",
      reservation = this.state.onlyVirtual ? "AULA VIRTUAL" : "INTEGRAL",
      data = {
        name: this.state.name.toUpperCase(),
        client: this.state.client.toUpperCase(),
        date: this.state.calendarAnswer,
        type: reservation,
        firstA: this.state.firstAnswer,
        secondA: this.state.secondAnswer,
        thirdA: this.state.thirdAnswer,
        fourthA: this.state.fourthAnswer,
        fifthA: this.state.fifthAnswer,
        sixthA: this.state.sixthAnswer,
        email: this.state.clientEmail,
      };
    emailjs.send(a, b, data, c).then(
      function (response) {},
      function (error) {}
    );
  }

  render() {
    return (
      <div className="full">
        <img src={logo} alt="logo IPEditorial" max-width="50px" />
        <div className="container">
          {this.state.currentQuestion === 0 && (
            <Welcome
              name={this.state.name}
              client={this.state.client}
              handleInput={this.handleInput}
              handleNameInput={this.handleNameInput}
              handleAcceptBtn={this.handleAcceptBtn}
            />
          )}
          {this.state.currentQuestion === 1 && (
            <FirstQ handleClick={this.handleClick} />
          )}
          {this.state.currentQuestion === 2 && (
            <SecondQ handleClick={this.handleClick} />
          )}
          {this.state.currentQuestion === 3 && (
            <ThirdQ
              handleClick={this.handleClick}
              handleAcceptBtn={this.handleAcceptBtn}
            />
          )}
          {this.state.currentQuestion === 4 && (
            <FourthQ handleClick={this.handleClick} />
          )}
          {this.state.currentQuestion === 5 && (
            <FifthQ
              handleClick={this.handleClick}
              handleTArea={this.handleTArea}
              handleExtraBtn={this.handleExtraBtn}
              fifthAnswer={this.state.fifthAnswer}
              yesToFifthQ={this.state.yesToFifthQ}
            />
          )}
          {this.state.currentQuestion === 6 && (
            <SixthQ
              handleClick={this.handleClick}
              handleAcceptBtn={this.handleAcceptBtn}
              handleTArea={this.handleTArea}
              textAreaTwoValue={this.textAreaTwoValue}
              yesToFifthQ={this.state.anotherInSixthQ}
            />
          )}
          {this.state.currentQuestion === 7 && (
            <CalendarQ
              onlyVirtual={this.state.onlyVirtual}
              handleClick={this.handleClick}
            />
          )}
          {this.state.currentQuestion === 8 && (
            <EmailQ
              clientEmail={this.state.clientEmail}
              handleEmail={this.handleEmail}
              handleAcceptBtn={this.handleAcceptBtn}
            />
          )}
          {this.state.currentQuestion === 9 && (
            <End
              calendarAnswer={this.state.calendarAnswer}
              onlyVirtual={this.state.onlyVirtual}
            />
          )}
          <div className="rightCol">
            <div className="arrows">
              {this.state.currentQuestion > 0 &&
                this.state.currentQuestion < 9 && (
                  <button id="backBtn" onClick={this.handleBackBtn}>
                    &#x21e6;
                  </button>
                )}
              {this.state.currentQuestion < 8 && (
                <button id="forwardBtn" onClick={this.handleForwardBtn}>
                  &#x21e8;
                </button>
              )}
            </div>
          </div>
        </div>
        <a href="https://www.ideaspropiaseditorial.com" className="copyright">
          Ideaspropias Editorial © 2021
        </a>
      </div>
    );
  }
}
