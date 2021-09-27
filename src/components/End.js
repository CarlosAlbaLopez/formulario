import React from "react";

export default class FirstQ extends React.Component {
  render() {
    return (
      <div className="end">
        <h4>¡Tu formación se ha agendado correctamente!</h4>
        <h5>Fecha de la formación: {this.props.calendarAnswer}</h5>
        {this.props.onlyVirtual && (
          <div>
            <h5>Horario aproximado de 10:00 a 11:00</h5>
            <h5>Tipo de formación: Aula Virtual</h5>
          </div>
        )}

        {!this.props.onlyVirtual && (
          <div>
            <h5>Horario aproximado de 10:00 a 11:00</h5>
            <h5>Tipo de formación: Formación Integral</h5>
          </div>
        )}
        <p>
          La sesión formativa, previa autorización, se grabará y posteriormente
          se enviará a todos los asistentes. En caso de no poder asistir,
          agradecemos canceles la solicitud generando un nuevo ticket con la
          tipología "Cancelación de formación" con 24/48h de antelación, podrás
          generar una nueva solicitud cuando lo necesites.
        </p>
        <p>
          Desde Soporte técnico te ofrecemos el apoyo y la formación en el uso
          de nuestra plataforma Moodle y sus herramientas asociadas, así mismo,
          la ayuda en el ámbito pedagógico o de trámites con las
          administrataciones en materia de formación, está fuera del alcance de
          nuestro servicio.
        </p>
      </div>
    );
  }
}
