import React, { useState, useEffect } from 'react';
import './App.css';

const RegistrationForm = ({ formData, handleInputChange, handleSubmit, message }) => {
  return (
    <form className="registration-form" onSubmit={handleSubmit}>
      <table>
        <tbody>
          <tr>
            <td><label htmlFor="nombres">Nombres:</label></td>
            <td>
              <input
                type="text"
                id="nombres"
                name="nombres"
                value={formData.nombres}
                onChange={handleInputChange}
                placeholder="Ingresa tus nombres"
              />
            </td>
          </tr>
          <tr>
            <td><label htmlFor="apellidos">Apellidos:</label></td>
            <td>
              <input
                type="text"
                id="apellidos"
                name="apellidos"
                value={formData.apellidos}
                onChange={handleInputChange}
                placeholder="Ingresa tus apellidos"
              />
            </td>
          </tr>
          <tr>
            <td><label htmlFor="tipoDocumento">Tipo de documento:</label></td>
            <td>
              <select
                id="tipoDocumento"
                name="tipoDocumento"
                value={formData.tipoDocumento}
                onChange={handleInputChange}
              >
                <option value="">Selecciona un tipo de documento</option>
                <option value="registro_civil">Registro civil</option>
                <option value="tarjeta_identidad">Tarjeta de identidad</option>
                <option value="cedula_ciudadania">Cédula de ciudadanía</option>
              </select>
            </td>
          </tr>
          <tr>
            <td><label htmlFor="documento">Documento:</label></td>
            <td>
              <input
                type="text"
                id="documento"
                name="documento"
                value={formData.documento}
                onChange={handleInputChange}
                placeholder="Ingresa tu numero de documento"
              />
            </td>
          </tr>
          <tr>
            <td><label htmlFor="lugarNacimiento">Lugar de Nacimiento:</label></td>
            <td>
              <input
                type="text"
                id="lugarNacimiento"
                name="lugarNacimiento"
                value={formData.lugarNacimiento}
                onChange={handleInputChange}
                placeholder="Ingresa tu lugar de nacimiento"
              />
            </td>
          </tr>
          <tr>
            <td><label htmlFor="fechaNacimiento">Fecha de Nacimiento:</label></td>
            <td>
              <input
                type="date"
                id="fechaNacimiento"
                name="fechaNacimiento"
                value={formData.fechaNacimiento}
                onChange={handleInputChange}
                placeholder="Ingresa tu fecha de nacimiento"
              />
            </td>
          </tr>
          <tr>
            <td><label htmlFor="email">Email:</label></td>
            <td>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Ingresa tus email"
                autoComplete="username"
              />
            </td>
          </tr>
          <tr>
            <td><label htmlFor="telefono">Teléfono:</label></td>
            <td>
              <input
                type="tel"
                id="telefono"
                name="telefono"
                value={formData.telefono}
                onChange={handleInputChange}
                placeholder="Ingresa tu telefono"
              />
            </td>
          </tr>
          <tr>
            <td><label htmlFor="usuario">Usuario:</label></td>
            <td>
              <input
                type="text"
                id="usuario"
                name="usuario"
                value={formData.usuario}
                onChange={handleInputChange}
                placeholder="Ingresa tu usuario"
                autoComplete="new-password"
              />
            </td>
          </tr>
          <tr>
            <td><label htmlFor="password">Contraseña:</label></td>
            <td>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                placeholder="Ingresa tu contraseña"
                autoComplete="new-password"
              />
            </td>
          </tr>
          <tr>
            <td><label htmlFor="confirmarPassword">Confirmar Contraseña:</label></td>
            <td>
              <input
                type="password"
                id="confirmarPassword"
                name="confirmarPassword"
                value={formData.confirmarPassword}
                onChange={handleInputChange}
                placeholder="Ingresa de nuevo tu contraseña"
                autoComplete="new-password"
              />
            </td>
          </tr>
          <tr>
            <td><label htmlFor="lugarResidencia">Lugar de Residencia:</label></td>
            <td>
              <input
                type="text"
                id="lugarResidencia"
                name="lugarResidencia"
                value={formData.lugarResidencia}
                onChange={handleInputChange}
                placeholder="Ingresa tu lugar de residencia"
              />
            </td>
          </tr>
          </tbody>
      </table>
      <div className="message-container">
        {message && <div className={`message ${message.type}`}>{message.text}</div>}
      </div>
      <button type="submit" disabled={formData.isSubmitting}>
        Registrar
      </button>
    </form>
  );
};

const PersonList = ({ people, handleEdit, handleSave, handleDelete }) => {
  return (
    <div>
      <h2>Listado de Personas</h2>
      <table>
        <thead>
          <tr>
            <th>Nombres</th>
            <th>Apellidos</th>
            <th>Tipo de documento</th>
            <th>Documento</th>
            <th>Lugar de Nacimiento</th>
            <th>Fecha de Nacimiento</th>
            <th>Email</th>
            <th>Teléfono</th>
            <th>Usuario</th>
            <th>Contraseña</th>
            <th>Lugar de Residencia</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {people.map((person) => (
            <tr key={person.id}>
              <td>
                {person.isEditing ? (
                  <input
                    type="text"
                    value={person.nombres}
                    onChange={(e) => handleEdit(person.id, 'nombres', e.target.value)}
                  />
                ) : (
                  person.nombres
                )}
              </td>
              <td>
                {person.isEditing ? (
                  <input
                    type="text"
                    value={person.apellidos}
                    onChange={(e) => handleEdit(person.id, 'apellidos', e.target.value)}
                  />
                ) : (
                  person.apellidos
                )}
              </td>
              <td>
                {person.isEditing ? (
                  <select
                    value={person.tipoDocumento}
                    onChange={(e) => handleEdit(person.id, 'tipoDocumento', e.target.value)}
                  >
                    <option value="">Selecciona un tipo de documento</option>
                    <option value="registro_civil">Registro civil</option>
                    <option value="tarjeta_identidad">Tarjeta de identidad</option>
                    <option value="cedula_ciudadania">Cédula de ciudadanía</option>
                  </select>
                ) : (
                  person.tipoDocumento
                )}
              </td>
              <td>
                {person.isEditing ? (
                  <input
                    type="text"
                    value={person.documento}
                    onChange={(e) => handleEdit(person.id, 'documento', e.target.value)}
                  />
                ) : (
                  person.documento
                )}
              </td>
              <td>
                {person.isEditing ? (
                  <input
                    type="text"
                    value={person.lugarNacimiento}
                    onChange={(e) => handleEdit(person.id, 'lugarNacimiento', e.target.value)}
                  />
                ) : (
                  person.lugarNacimiento
                )}
              </td>
              <td>
                {person.isEditing ? (
                  <input
                    type="date"
                    value={person.fechaNacimiento}
                    onChange={(e) => handleEdit(person.id, 'fechaNacimiento', e.target.value)}
                  />
                ) : (
                  person.fechaNacimiento
                )}
              </td>
              <td>
                {person.isEditing ? (
                  <input
                    type="email"
                    value={person.email}
                    onChange={(e) => handleEdit(person.id, 'email', e.target.value)}
                  />
                ) : (
                  person.email
                )}
              </td>
              <td>
                {person.isEditing ? (
                  <input
                    type="tel"
                    value={person.telefono}
                    onChange={(e) => handleEdit(person.id, 'telefono', e.target.value)}
                  />
                ) : (
                  person.telefono
                )}
              </td>
              <td>
                {person.isEditing ? (
                  <input
                    type="text"
                    value={person.usuario}
                    onChange={(e) => handleEdit(person.id, 'usuario', e.target.value)}
                  />
                ) : (
                  person.usuario
                )}
              </td>
              <td>
                {person.isEditing ? (
                  <input
                    type="password"
                    value={person.password}
                    onChange={(e) => handleEdit(person.id, 'password', e.target.value)}
                  />
                ) : (
                  person.password
                )}
              </td>
              <td>
                {person.isEditing ? (
                  <input
                    type="text"
                    value={person.lugarResidencia}
                    onChange={(e) => handleEdit(person.id, 'lugarResidencia', e.target.value)}
                  />
                ) : (
                  person.lugarResidencia
                )}
              </td>
              <td>
                {person.isEditing ? (
                  <>
                    <button onClick={() => handleSave(person)}>Guardar</button>
                    <button onClick={() => handleEdit(person.id, 'isEditing', false)}>Cancelar</button>
                  </>
                ) : (
                  <button onClick={() => handleEdit(person.id, 'isEditing', true)}>Editar</button>
                )}
                <button onClick={() => handleDelete(person)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const App = () => {
  const initialFormData = {
    nombres: '',
    apellidos: '',
    tipoDocumento: '',
    documento: '',
    lugarNacimiento: '',
    fechaNacimiento: '',
    email: '',
    telefono: '',
    usuario: '',
    password: '',
    confirmarPassword: '',
    lugarResidencia: '',
    isSubmitting: false,
  };

  const [formData, setFormData] = useState(initialFormData);
  const [message, setMessage] = useState(null);
  const [people, setPeople] = useState([]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (formData.password !== formData.confirmarPassword) {
      setMessage([{ type: 'error', text: 'Las contraseñas no coinciden.' }]);
      return;
    }

    const requiredFields = ['nombres', 'apellidos', 'tipoDocumento', 'documento', 'fechaNacimiento', 'email', 'telefono', 'usuario', 'password', 'confirmarPassword', 'lugarResidencia'];
    const emptyFields = requiredFields.filter(field => !formData[field].trim());
    if (emptyFields.length > 0) {
      setMessage([{ type: 'error', text: 'Por favor, completa todos los campos.' }]);
      return;
    }

    if (!isStrongPassword(formData.password)) {
      setMessage([{ type: 'error', text: 'La contraseña debe tener al menos 8 caracteres, una letra mayúscula, una letra minúscula, un número y un carácter especial.' }]);
      return;
    }

    try {
      setFormData((prevFormData) => ({ ...prevFormData, isSubmitting: true }));

      const response = await fetch('http://localhost:5000/api/personas', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
    if (response.ok) {
      setMessage({ type: 'success', text: '¡Registro exitoso!' });
      console.log('Respuesta del backend:', data);

      // Reload the page to display the updated list of people
      window.location.reload();
      } else {
        if (data.errors) {
          // Handle validation errors from the backend
          const errorMessages = data.errors.map((error) => ({
            type: 'error',
            text: error.msg,
          }));

          // Handle the specific "Tipo de documento no válido" error
          if (data.invalidField === 'tipoDocumento') {
            const tipoDocumentoError = {
              type: 'error',
              text: 'Tipo de documento no válido',
            };
            errorMessages.push(tipoDocumentoError);
          }

          setMessage(errorMessages);
        } else {
          const errorMessages = [
            {
              type: 'error',
              text: 'Error al enviar el formulario. Por favor, inténtalo nuevamente.',
            },
          ];
          setMessage(errorMessages);
        }
        console.error('Error al enviar el formulario:', data);
      }
    } catch (error) {
      setMessage([
        {
          type: 'error',
          text: 'Error al enviar el formulario. Por favor, inténtalo nuevamente.',
        },
      ]);
      console.error('Error al enviar el formulario:', error);
    } finally {
      setFormData((prevFormData) => ({ ...prevFormData, isSubmitting: false }));
    }
  };

  const isStrongPassword = (password) => {
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])[a-zA-Z\d!@#$%^&*]{8,}$/;
    return passwordRegex.test(password);
  };

  const fetchPeople = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/personas');
      const data = await response.json();
      if (response.ok) {
        setPeople(data);
      } else {
        console.error('Error fetching people:', data);
      }
    } catch (error) {
      console.error('Error fetching people:', error);
    }
  };

  const handleEdit = (id, field, value) => {
    setPeople((prevPeople) =>
      prevPeople.map((person) =>
        person.id === id ? { ...person, [field]: value } : person
      )
    );
  };

  const handleSave = async (person) => {
    try {
      const response = await fetch(`http://localhost:5000/api/personas/${person.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(person),
      });

      if (response.ok) {
        setPeople((prevPeople) =>
          prevPeople.map((p) =>
            p.id === person.id ? { ...person, isEditing: false } : p
          )
        );

        console.log('Persona actualizada:', person);
      } else {
        console.error('Error al editar persona:', response);
      }
    } catch (error) {
      console.error('Error al editar persona:', error);
    }
  };  

const handleDelete = async (person) => {
  try {
    const response = await fetch(`http://localhost:5000/api/personas/${person.id}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      // Eliminar la persona de la lista de personas
      setPeople((prevPeople) => prevPeople.filter((p) => p.id !== person.id));

      console.log('Persona eliminada:', person);
    } else {
      console.error('Error al eliminar persona:', response);
    }
  } catch (error) {
    console.error('Error al eliminar persona:', error);
  }
};

  useEffect(() => {
    fetchPeople();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Registro de Usuario</h1>
        <RegistrationForm
          formData={formData}
          handleInputChange={handleInputChange}
          handleSubmit={handleSubmit}
          message={message}
        />
        <PersonList
          people={people}
          handleEdit={handleEdit}
          handleSave={handleSave}
          handleDelete={handleDelete}
        />
      </header>
    </div>
  );
};

export default App;