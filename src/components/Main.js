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
      secondEmail: "",
      thirdEmail: "",
      fourthEmail: "",
      fifthEmail: "",
      sixthEmail: "",
      seventhEmail: "",
      eighthEmail: "",
      ninthEmail: "",
      isPastMonday: 0,
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
    this.handleSecondEmail = this.handleSecondEmail.bind(this);
    this.handleThirdEmail = this.handleThirdEmail.bind(this);
    this.handleFourthEmail = this.handleFourthEmail.bind(this);
    this.handleFifthEmail = this.handleFifthEmail.bind(this);
    this.handleSixthEmail = this.handleSixthEmail.bind(this);
    this.handleSeventhEmail = this.handleSeventhEmail.bind(this);
    this.handleEighthEmail = this.handleEighthEmail.bind(this);
    this.handleNinthEmail = this.handleNinthEmail.bind(this);
    this.sendEmail = this.sendEmail.bind(this);
    this.sendClientEmail = this.sendClientEmail.bind(this);
    this.handleIsPastMonday = this.handleIsPastMonday.bind(this);
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
        "Ya he trabajado con la plataforma, pero necesito ver Aula Virtual."
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
      if (e.target.innerHTML === "No, cargaré cursos propios.") {
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
      if (
        e.target.innerHTML ===
        "Sí. (Deben llevar alguna documentación específica, el sistema de evaluación tiene que ser de un modo determinado, etc.)."
      ) {
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
      if (e.target.innerHTML === "Otra:") {
        if (e.target.className === "selected") {
          this.setState({
            anotherInSixthQ: false,
          });
        } else {
          this.setState({
            anotherInSixthQ: true,
          });
        }
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
        selectedOptions[0].innerHTML === "Sólo Aula Virtual."
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
      if (document.getElementById("tAreaTwo")) {
        let answer = document.getElementById("tAreaTwo");
        if (!answer.value) {
          window.alert(
            "Por favor, cubre el cuadro de texto o desmarca la opción 'Otra' para continuar."
          );
        } else {
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
        }
      } else {
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
      }
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
        } else if (this.state.calendarAnswer === "") {
          window.alert(
            "Por favor, responde la pregunta: ¿Qué día quieres programar la reunión?"
          );
          setTimeout(
            () =>
              this.setState({
                currentQuestion: 7,
                lastQuestion: 6,
              }),
            500
          );
        } else {
          this.setState({
            currentQuestion: 9,
            lastQuestion: 8,
          });

          setTimeout(() => this.sendEmail(), 500);
          setTimeout(() => this.sendClientEmail(), 1000);
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

  handleIsPastMonday(currentWeek) {
    let today = new Date();

    if (today.getDay() > 1)
      this.setState({
        isPastMonday: 1,
      });
  }

  handleExtraBtn() {
    let answer = document.getElementById("tArea");
    if (!answer.value) {
      window.alert("Por favor, especifica al menos una particularidad.");
    } else {
      this.setState({
        fifthAnswer: answer.value,
        currentQuestion: 6,
        lastQuestion: 5,
      });
    }
  }

  handleEmail(e) {
    this.setState({
      clientEmail: e.target.value,
    });
  }
  handleSecondEmail(e) {
    this.setState({
      secondEmail: e.target.value,
    });
  }
  handleThirdEmail(e) {
    this.setState({
      thirdEmail: e.target.value,
    });
  }
  handleFourthEmail(e) {
    this.setState({
      fourthEmail: e.target.value,
    });
  }
  handleFifthEmail(e) {
    this.setState({
      fifthEmail: e.target.value,
    });
  }
  handleSixthEmail(e) {
    this.setState({
      sixthEmail: e.target.value,
    });
  }
  handleSeventhEmail(e) {
    this.setState({
      seventhEmail: e.target.value,
    });
  }
  handleEighthEmail(e) {
    this.setState({
      eighthEmail: e.target.value,
    });
  }
  handleNinthEmail(e) {
    this.setState({
      ninthEmail: e.target.value,
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
    const a = process.env.REACT_APP_SERVICE,
      b = process.env.REACT_APP_TEMPLATE,
      c = process.env.REACT_APP_USER,
      reservation = this.state.onlyVirtual ? "AULA VIRTUAL" : "INTEGRAL",
      data = {
        name: this.state.name,
        client: this.state.client,
        date: this.state.calendarAnswer,
        type: reservation,
        firstA: this.state.firstAnswer,
        secondA: this.state.secondAnswer,
        thirdA: this.state.thirdAnswer,
        fourthA: this.state.fourthAnswer,
        fifthA: this.state.fifthAnswer,
        sixthA: this.state.sixthAnswer,
        email: this.state.clientEmail,
        mail2: this.state.secondEmail,
        mail3: this.state.thirdEmail,
        mail4: this.state.fourthEmail,
        mail5: this.state.fifthEmail,
        mail6: this.state.sixthEmail,
        mail7: this.state.seventhEmail,
        mail8: this.state.eighthEmail,
        mail9: this.state.ninthEmail,
      };
    emailjs.send(a, b, data, c).then(
      function (response) {},
      function (error) {}
    );
  }

  sendClientEmail() {
    const a = process.env.REACT_APP_SERVICE,
      b = process.env.REACT_APP_CLIENT_TEMPLATE,
      c = process.env.REACT_APP_USER,
      title = "¡Tu formación se ha agendado correctamente!",
      date = "Fecha de la formación: " + this.state.calendarAnswer,
      reservation = this.state.onlyVirtual
        ? "Tipo de formación: Aula Virtual. Recuerda que todas nuestras formaciones se realizan los viernes y tienen una duración aproximada de una hora."
        : "Tipo de formación: Formación Integral. Recuerda que todas nuestras formaciones se realizan los viernes y tienen una duración aproximada de tres horas.",
      body =
        "La sesión formativa se impartirá online y, previa autorización, se grabará y posteriormente se enviará a todos los asistentes. En caso de no poder asistir, agradecemos canceles la solicitud generando un nuevo ticket con la tipología 'Cancelación de formación' con 24/48h de antelación, podrás generar una nueva solicitud cuando lo necesites.",
      body2 =
        "Desde Soporte técnico te ofrecemos el apoyo y la formación en el uso de nuestra plataforma Moodle y sus herramientas asociadas, así mismo, la ayuda en el ámbito pedagógico o de trámites con las administrataciones en materia de formación, está fuera del alcance de nuestro servicio.",
      type = this.state.onlyVirtual ? "AULA VIRTUAL" : "INTEGRAL",
      data = {
        title: title,
        day: this.props.calendarAnswer,
        date: date,
        reservation: reservation,
        body: body,
        body2: body2,
        type: type,
        mail: this.state.clientEmail,
        mail2: this.state.secondEmail,
        mail3: this.state.thirdEmail,
        mail4: this.state.fourthEmail,
        mail5: this.state.fifthEmail,
        mail6: this.state.sixthEmail,
        mail7: this.state.seventhEmail,
        mail8: this.state.eighthEmail,
        mail9: this.state.ninthEmail,
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
            <FirstQ handleClick={this.handleClick} name={this.state.name} />
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
            <FourthQ handleClick={this.handleClick} name={this.state.name} />
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
              anotherInSixthQ={this.state.anotherInSixthQ}
            />
          )}
          {this.state.currentQuestion === 7 && (
            <CalendarQ
              onlyVirtual={this.state.onlyVirtual}
              handleClick={this.handleClick}
              isPastMonday={this.state.isPastMonday}
              handleIsPastMonday={this.handleIsPastMonday}
            />
          )}
          {this.state.currentQuestion === 8 && (
            <EmailQ
              clientEmail={this.state.clientEmail}
              secondEmail={this.state.secondEmail}
              thirdEmail={this.state.thirdEmail}
              fourthEmail={this.state.fourthEmail}
              fifthEmail={this.state.fifthEmail}
              sixthEmail={this.state.sixthEmail}
              seventhEmail={this.state.seventhEmail}
              eighthEmail={this.state.eighthEmail}
              ninthEmail={this.state.ninthEmail}
              handleEmail={this.handleEmail}
              handleSecondEmail={this.handleSecondEmail}
              handleThirdEmail={this.handleThirdEmail}
              handleFourthEmail={this.handleFourthEmail}
              handleFifthEmail={this.handleFifthEmail}
              handleSixthEmail={this.handleSixthEmail}
              handleSeventhEmail={this.handleSeventhEmail}
              handleEighthEmail={this.handleEighthEmail}
              handleNinthEmail={this.handleNinthEmail}
              handleAcceptBtn={this.handleAcceptBtn}
            />
          )}
          {this.state.currentQuestion === 9 && (
            <End
              calendarAnswer={this.state.calendarAnswer}
              onlyVirtual={this.state.onlyVirtual}
              name={this.state.name}
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
