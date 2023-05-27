import React, { useState } from 'react';
import { FaUser } from 'react-icons/fa';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import './ProfileMenu.css';

const ProfileMenu = () => {
  const [name, setName] = useState('');
  const [ra, setRA] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [expanded, setExpanded] = useState(false);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    if (name === 'name') {
      setName(value);
    } else if (name === 'ra') {
      setRA(value);
    } else if (name === 'email') {
      setEmail(value);
    } else if (name === 'password') {
      setPassword(value);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Logic to send profile data
    console.log('Profile sent:', { name, ra, email, password });
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
          <CSSTransition classNames="menu" timeout={300} unmountOnExit>
            <div>
              <div className="profile-info">
                <h4>informações de Perfil</h4>
                <p><strong>Name:</strong> {name}</p>
                <p><strong>RA:</strong> {ra}</p>
                <p><strong>Email:</strong> {email}</p>
                <p><strong>Password:</strong> {password}</p>
              </div>
              <form className='profile-form' onSubmit={handleSubmit}>
                <h3 className='perfil'><FaUser /> Editar Perfil</h3>
                <div className="form-field">
                  <label htmlFor="name">Name:</label>
                  <input type="text" id="name" name="name" value={name} onChange={handleInputChange} />
                </div>
                <div className="form-field">
                  <label htmlFor="ra">RA:</label>
                  <input type="text" id="ra" name="ra" value={ra} onChange={handleInputChange} />
                </div>
                <div className="form-field">
                  <label htmlFor="email">Email:</label>
                  <input type="email" id="email" name="email" value={email} onChange={handleInputChange} />
                </div>
                <div className="form-field">
                  <label htmlFor="password">Senha:</label>
                  <input type="password" id="password" name="password" value={password} onChange={handleInputChange} />
                </div>
                <button className='send-perfil' type="submit">Send</button>
              </form>
            </div>
          </CSSTransition>
        )}
      </TransitionGroup>
    </div>
  );
};

export default ProfileMenu;
