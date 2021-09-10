import React from "react";
import "./Main.css";
import emailjs from 'emailjs-com';

export default class App extends React.Component {
  constructor(props) {
    super(props); 
    this.state = {
      currentQuestion: 0,
      lastQuestion: 0,
      yesToFifthQ: false,
      anotherInSixthQ: false,
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
    }
    this.handleInput = this.handleInput.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleBackBtn = this.handleBackBtn.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleAcceptBtn = this.handleAcceptBtn.bind(this);
    this.handleExtraBtn = this.handleExtraBtn.bind(this);
    this.handleTArea = this.handleTArea.bind(this);
    this.handleForwardBtn = this.handleForwardBtn.bind(this);
    this.sendEmail = this.sendEmail.bind(this);
  }

  handleInput(e) {
    this.setState({
      client: e.target.value,
    })
  }
  
  handleClick(e) {
    if (this.state.currentQuestion === 1) {
      e.target.className = "selected";
      this.setState({
        firstAnswer: e.target.innerHTML,
      })
      if(e.target.innerHTML === "Ya he trabajado con la plataforma, pero necesito ver Aula Virtual") {
        setTimeout(() => this.setState({
          currentQuestion: 7,
          lastQuestion: 1,
          onlyVirtual: true,
        }), 500);
      } else { 
        setTimeout(() => this.setState({
          currentQuestion: 2,
          lastQuestion: 1,
          onlyVirtual: false,
        }), 500);
      }
    } else if (this.state.currentQuestion === 2) {
      e.target.className = "selected";
      this.setState({
        secondAnswer: e.target.innerHTML,
      })
      setTimeout(() => this.setState({
        currentQuestion: 3,
        lastQuestion: 2,
      }), 500);
    } else if(this.state.currentQuestion === 3) {
      if(e.target.className === "selected") {
        e.target.className = "";
      } else {
        e.target.className = "selected";
      }
    } else if(this.state.currentQuestion === 4) {
      e.target.className = "selected";
      if(e.target.innerHTML === "No, cargaré cursos propios") {
        this.setState({
          fourthAnswer: e.target.innerHTML,
        })
        setTimeout(() => this.setState({
          currentQuestion: 5,
          lastQuestion: 4,
        }), 500);
      } else {
        this.setState({
          fourthAnswer: e.target.innerHTML,
        })
        setTimeout(() => this.setState({
          currentQuestion: 6,
          lastQuestion: 4,
        }), 500);
      }
    } else if (this.state.currentQuestion === 5) {
      e.target.className = "selected";
      if(e.target.innerHTML === "Sí") {
        this.setState({
          yesToFifthQ: true,
        });
      } else {
        this.setState({
          fifthAnswer: e.target.innerHTML,
        })
        setTimeout(() => this.setState({
          currentQuestion: 6,
          lastQuestion: 5,
        }), 500);
      }
    } else if(this.state.currentQuestion === 6) {
      if(e.target.innerHTML === "Otra") {
        this.setState({
          anotherInSixthQ: true,
        })
      }
      if(e.target.className === "selected") {
        e.target.className = "";
      } else {
        e.target.className = "selected";
      }
    }
  }
  
  handleAcceptBtn() {
    let selectedOptions = document.getElementsByClassName("selected");
    if (this.state.currentQuestion === 0) {
      this.setState({
        currentQuestion: 1,
      });
    } else if (this.state.currentQuestion === 3) {  
      if(selectedOptions.length === 1 && selectedOptions[0].innerHTML === "Sólo Aula Virtual") {
        this.setState((prevState) => ({
          thirdAnswer: prevState.thirdAnswer.concat(selectedOptions[0].innerHTML),
          currentQuestion: 7,
          lastQuestion: 3,
          onlyVirtual: true,
        }));
      } else {
        for(let i = 0; i < selectedOptions.length; i++) {
          this.setState((prevState) => ({
            thirdAnswer: prevState.thirdAnswer.concat(selectedOptions[i].innerHTML),
          }));
        }
        this.setState({
          currentQuestion: 4,
          lastQuestion: 3,
          onlyVirtual: false,
        })
      }
    } else if(this.state.currentQuestion === 6) {
      for(let i = 0; i < selectedOptions.length; i++) {
        this.setState((prevState) => ({
          sixthAnswer: prevState.sixthAnswer.concat(selectedOptions[i].innerHTML),
        }));
      }
      if(this.state.anotherInSixthQ) {
        let otherAnswer = document.getElementById("tAreaTwo");
        this.setState((prevState) => ({
          sixthAnswer: prevState.sixthAnswer.concat(otherAnswer.value),
        }));
      }
      this.setState({
        currentQuestion: 7,
        lastQuestion: 6,
      })
    }
  }
  
  handleTArea(e) {
    if(this.state.currentQuestion === 5) { 
      this.setState({
        fifthAnswer: e.target.value,
      })
    } else if(this.state.currentQuestion === 6) {
      this.setState({
        textAreaTwoValue: e.target.value,
      })
    }
  }
  
  handleExtraBtn() {
    let answer = document.getElementById("tArea");
    this.setState({
      fifthAnswer: answer.value,
      currentQuestion: 6,
      lastQuestion: 5,
    })
  }
  
  handleForwardBtn() {
    this.setState((prevState) => ({
      currentQuestion: prevState.currentQuestion + 1,
      lastQuestion: prevState.currentQuestion,
    }));
  }
  
  handleBackBtn() {
    if(this.state.currentQuestion === 7) {
      this.state.lastQuestion === 1 ? this.setState({
        currentQuestion: 1,
        lastQuestion: 0,
      }) : this.state.lastQuestion === 3 ? this.setState({
        currentQuestion: 3,
        lastQuestion: 2,
      }) : this.setState({
        currentQuestion: 6,
        lastQuestion: 5,
      })
    } else if (this.state.currentQuestion === 6) {
      this.state.lastQuestion === 4 ? this.setState({
        currentQuestion: 4,
        lastQuestion: 3,
      }) : this.setState({
        currentQuestion: 5,
        lastQuestion: 4,
      })
    } else {      
      this.setState((prevState) => ({
        currentQuestion: prevState.currentQuestion - 1,
        lastQuestion: prevState.lastQuestion - 1,
      }));
    }
  }
  
  handleChange(e) {
    e.target.className = "selectedC";
    this.setState({
      calendarAnswer: e.target.value,
    })
    setTimeout(() => this.setState({
      currentQuestion: 8,
    }), 500);

    setTimeout(() => this.sendEmail(), 500);
  }

  sendEmail() {
    const a = "service_vlm7k9u",
    b = "template_rw7cd0r",
    c = "user_iWaQwq2FAyAJRfwdEhOnt",
    data = {
      client: this.state.client,
      date: this.state.calendarAnswer,
      firstA: this.state.firstAnswer,
      secondA: this.state.secondAnswer,
      thirdA: this.state.thirdAnswer,
      fourthA: this.state.fourthAnswer,
      fifthA: this.state.fifthAnswer,
      sixthA: this.state.sixthAnswer
    };

    emailjs.send(a, b, data, c).then(function(response) {
      console.log('SUCCESS!', response.status, response.text);
    }, function(error) {
      console.log('FAILED...', error);
    });
  }

  render() {
    return (
    <div className="container">
        {this.state.currentQuestion === 0 && <div><h4 className="welcome">¡Nos encanta que quieras formarte con nosotros!</h4>
          <p>En Ideaspropias queremos darte la formación que mejor se adapte a tus necesidades. Para ello, agradecemos que dediques unos segundos a responder a unas sencillas preguntas y así ofrecerte un mejor servicio.</p>
          <h4 className="welcome">Para empezar, indícanos tu nombre (razón social).</h4>
          <input type="text" onChange={this.handleInput} value={this.state.client}/>
          <button className="acceptBtn" onClick={this.handleAcceptBtn}>Aceptar</button>
        </div>}
        {this.state.currentQuestion === 1  && <div className="firstQ">
          <h4 className="firstQText">¿Es la primera formación que solicitas?</h4>
          <ul>
            <li onClick={this.handleClick}>Sí</li>
            <li onClick={this.handleClick}>Necesito un refuerzo</li>
            <li onClick={this.handleClick}>Ya he trabajado con la plataforma, pero necesito ver Aula Virtual</li>
          </ul>
        </div>}
        {this.state.currentQuestion === 2  && <div className="secondQ">
          <h4 className="secondQText">¿Tienes experiencia con plataformas educativas (e-learning)?</h4>
          <ul>
            <li onClick={this.handleClick}>Sí, con Moodle</li>
            <li onClick={this.handleClick}>Sí, pero no con Moodle</li>
            <li onClick={this.handleClick}>No</li>
          </ul>
        </div>}
        {this.state.currentQuestion === 3  && <div className="thirdQ">
          <h4 className="thirdQText">¿Qué formación vas a impartir?</h4>
          <ul>
            <li onClick={this.handleClick}>Bonificada y/o Privada</li>
            <li onClick={this.handleClick}>Subvencionada</li>
            <li onClick={this.handleClick}>Sólo Aula Virtual</li>
            <li onClick={this.handleClick}>Certificados de Profesionalidad</li>
            <li onClick={this.handleClick}>Todas las anteriores</li>
            <li onClick={this.handleClick}>No lo tengo claro, aún</li>
          </ul>
          <button className="acceptBtn" onClick={this.handleAcceptBtn}>Aceptar</button>
        </div>}
        {this.state.currentQuestion === 4  && <div className="fourthQ">
          <h4 className="fourthQText">¿Vas a utilizar/consumir/cargar cursos del catálogo de IPE?</h4>
          <ul>
            <li onClick={this.handleClick}>Sí</li>
            <li onClick={this.handleClick}>No, cargaré cursos propios</li>
            <li onClick={this.handleClick}>Ambas</li>
          </ul>
        </div>}
        {this.state.currentQuestion === 5  && <div className="fifthQ">
          <h4 className="fifthQText">¿Tus cursos deben tener alguna particularidad especial?</h4>
          <ul>
            <li onClick={this.handleClick}>No</li>
            <li onClick={this.handleClick}>Sí</li>
            {this.state.yesToFifthQ && <div className="fifthQExtraItems"><textarea id="tArea" onChange={this.handleTArea} cols={60} placeholder="deben llevar alguna documentación específica, el sistema de evaluación tiene que ser de un modo determinado, etc." value={this.state.fifthAnswer}></textarea> <div><button className="extraBtn" onClick={this.handleExtraBtn}>Aceptar</button></div></div>}
          </ul>
        </div>}
        {this.state.currentQuestion === 6  && <div className="sixthQ">
          <h4 className="sixthQText">¿Qué quieres aprender en esta formación?</h4>
          <ul>
            <li onClick={this.handleClick}>Aprender a crear un curso</li>
            <li onClick={this.handleClick}>Aprender a crear y matricular usuarios</li>
            <li onClick={this.handleClick}>Conocer las herramientas de un curso y trabajar con ellas</li>
            <li onClick={this.handleClick}>Saber cómo realizar el seguimiento a los alumnos</li>
            <li onClick={this.handleClick}>Otra</li>
            {this.state.anotherInSixthQ && <textarea id="tAreaTwo" onChange={this.handleTArea} cols={60} value={this.state.textAreaTwoValue}></textarea>}
          </ul>
          <button className="acceptBtn" onClick={this.handleAcceptBtn}>Aceptar</button>
        </div>}
        {this.state.currentQuestion === 7  && <div className="calendarQ">
          <h4 className="calendarQText">¿Qué día quieres programar la reunión?</h4>
        <input type="date" className="calendar" onChange={this.handleChange} list="validDates"/>
        {this.state.onlyVirtual && <datalist id="validDates">
          <option label="Aula virtual">2021-09-24</option>
          <option label="Aula virtual">2021-10-08</option>
          <option label="Aula virtual">2021-10-22</option>
          <option label="Aula virtual">2021-11-05</option>
        </datalist>}
        {!this.state.onlyVirtual && <datalist id="validDates">
          <option label="Formación integral">2021-09-17</option>
          <option label="Formación integral">2021-10-01</option>
          <option label="Formación integral">2021-10-15</option>
          <option label="Formación integral">2021-10-29</option>
        </datalist>}
        </div>}
        {this.state.currentQuestion === 8  && <div className="end">
          <h4>¡Tu formación se ha agendado correctamente!</h4>
          <h4>Fecha de la formación: {this.state.calendarAnswer}</h4>
          <p>La sesión formativa, previa autorización, se grabará y posteriormente se enviará a todos los asistentes. En caso de no poder asistir, agradecemos canceles la solicitud con 24/48h de antelación, podrás generar una nueva solicitud cuando lo necesites.</p>
          <p>Desde Soporte técnico te ofrecemos el apoyo y la formación en el uso de nuestra plataforma Moodle y sus herramientas asociadas, así mismo, la ayuda en el ámbito pedagógico o de trámites con las administrataciones en materia de formación, está fuera del alcance de nuestro servicio.</p>
        </div>}
        <div className="rightCol">
        {this.state.currentQuestion > 0 && <button id="backBtn" onClick={this.handleBackBtn}>&#x21e6;</button>}
        {this.state.currentQuestion < 8 && <button id="forwardBtn" onClick={this.handleForwardBtn}>&#x21e8;</button>}
        </div>
    </div>
    );
  }
};