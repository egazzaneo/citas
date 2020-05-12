import React, { Fragment, useState } from 'react'
import PropTypes from 'prop-types'
import { v4 as uuid } from 'uuid';

const Formulario = ({crearCita}) => {

  //STATES
  const [cita, actualizarCita] = useState({
    mascota: '',
    propietario: '',
    fecha: '',
    hora: '',
    sintomas: ''
  });

  const [error, actualizarError] = useState(false)

  //DESTRUCTURACION DE CITA
  const { mascota, propietario, fecha, hora, sintomas } = cita

  //
  const actualizarState = (e) => {
    actualizarCita({
      ...cita, //Hago una copia de CITA
      [e.target.name]: e.target.value //Saco el valor y lo asigno
    })
  }

  const submitCita = (e) => { //FC OnCLICK
    e.preventDefault()

   /*  if (mascota.trim() === '' ||
      propietario.trim() === '' ||
      fecha.trim() === '' ||
      hora.trim() === '' ||
      sintomas.trim() === '') {
      actualizarError(true)
      return
    } */

    actualizarError(false) //FC STATE
    cita.id = uuid(); //Add UUID

    crearCita(cita) //La FC pase por PROPs desde APP
    
    actualizarCita({ //Limpio el formulario FC STATE
      mascota: '',
      propietario: '',
      fecha: '',
      hora: '',
      sintomas: ''
    })

  }

  return (
    <Fragment>
      <h2>Crear Cita</h2>

      {error
        ? <p className="alerta-error">Todos los campos son obligatorios</p>
        : null
      }

      <form
        onSubmit={submitCita}
      >
        <label>Nombre Mascota</label>
        <input
          type="text"
          name="mascota"
          className="u-full-width"
          placeholder="Nombre mascota"
          onChange={actualizarState}
          value={mascota}
        />
        <label>Nombre Dueño</label>
        <input
          type="text"
          name="propietario"
          className="u-full-width"
          placeholder="Nombre dueño"
          onChange={actualizarState}
          value={propietario}
        />
        <label>Fecha</label>
        <input
          type="date"
          name="fecha"
          className="u-full-width"
          onChange={actualizarState}
          value={fecha}
        />
        <label>Hora</label>
        <input
          type="time"
          name="hora"
          className="u-full-width"
          onChange={actualizarState}
          value={hora}
        />
        <label>Sintomas</label>
        <textarea
          className="u-full-width"
          name="sintomas"
          onChange={actualizarState}
          value={sintomas}
        >
        </textarea>
        <button
          type="submit"
          className="u-full-width button-primary"
        >Agregar Cita
                </button>
      </form>
    </Fragment>
  );
}

Formulario.prototype = {
  crearCita: PropTypes.func.isRequired
}

export default Formulario;