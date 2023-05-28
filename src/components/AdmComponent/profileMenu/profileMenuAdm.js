import React, { useState, useRef } from 'react';
import { FaUser } from 'react-icons/fa';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import './ProfileMenu.css';
import { resetPassword } from './resetPasswordApi';

const ProfileMenu = () => {
  const [name, setName] = useState('');
  const [ra, setRA] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [expanded, setExpanded] = useState(false);
  const formRef = useRef(null);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    if (name === 'email') {
      setEmail(value);
    } else if (name === 'password') {
      setPassword(value);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    // Logic to send profile data
    resetPassword(email, password);

  };

  const toggleMenu = () => {
    setExpanded(!expanded);
  };

  return (
    <div className="profile-menu">
      <button className="profile-button" onClick={toggleMenu}>
        <FaUser /> Perfil
      </button>
      <TransitionGroup>
        {expanded && (
          <CSSTransition classNames="menu" timeout={300} unmountOnExit nodeRef={formRef}>
            <div ref={formRef}>
              <div className="profile-info">
                <h4>Informações de Perfil</h4>
                <p><strong>Email:</strong> {email}</p>
                <p><strong>Password:</strong> {password}</p>
              </div>
              <form className='profile-form' onSubmit={handleSubmit}>
                <h3 className='perfil'><FaUser /> Editar Perfil</h3>
                <div className="form-field">
                  <label htmlFor="email">Email:</label>
                  <input type="email" id="email" name="email" value={email} onChange={handleInputChange} />
                </div>
                <div className="form-field">
                  <label htmlFor="password">Senha:</label>
                  <input type="password" id="password" name="password" value={password} onChange={handleInputChange} />
                </div>
                <button className='send-perfil' type="submit">Enviar</button>
              </form>
            </div>
          </CSSTransition>
        )}
      </TransitionGroup>
    </div>
  );
};

export default ProfileMenu;
