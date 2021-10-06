import React from "react";
import familiarize from "../familiarize";

export default class FirstQ extends React.Component {
  render() {
    return (
      <div className="end">
        {this.props.name && (
          <h4>
            ¡Tu formación se ha agendado correctamente,{" "}
            {familiarize(this.props.name)}!
          </h4>
        )}
        {!this.props.name && (
          <h4>¡Tu formación se ha agendado correctamente!</h4>
        )}
        <h5>Fecha de la formación: {this.props.calendarAnswer}</h5>
        {this.props.onlyVirtual && (
          <div>
            <h5>Tipo de formación: Aula Virtual</h5>
            <h6>
              Recuerda que todas nuestras formaciones se realizan los viernes y
              tienen una duración aproximada de una hora.
            </h6>
          </div>
        )}

        {!this.props.onlyVirtual && (
          <div>
            <h5>Tipo de formación: Formación Integral</h5>
            <h6>
              Recuerda que todas nuestras formaciones se realizan los viernes y
              tienen una duración aproximada de tres horas.
            </h6>
          </div>
        )}
        <p>
          La sesión formativa se impartirá online y, previa autorización, se
          grabará y posteriormente se enviará a todos los asistentes. En caso de
          no poder asistir, agradecemos canceles la solicitud generando un nuevo
          ticket con la tipología "Cancelación de formación" con 24/48h de
          antelación, podrás generar una nueva solicitud cuando lo necesites.
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
