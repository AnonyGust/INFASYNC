import React, { useState, useRef, useEffect } from 'react';
import { FaUser, FaEye, FaEyeSlash } from 'react-icons/fa';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import './ProfileMenu.css';
import { resetPassword } from './resetPasswordApi';

const ProfileMenu = () => {
  const [name, setName] = useState('');
  const [ra, setRA] = useState('');
  const [email, setEmail] = useState('');
  const [infoEmail, setInfoEmail] = useState('')
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [expanded, setExpanded] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const formRef = useRef(null);

  useEffect(() => {
    const sessionEmail = sessionStorage.getItem('email');
    if (sessionEmail) {
      setEmail(sessionEmail);
    }
  }, []);
  

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    if (name === 'email') {
      setEmail(value);
    } else if (name === 'password') {
      setPassword(value);
    } else if (name === 'confirmPassword') {
      setConfirmPassword(value);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      // Senhas não coincidem, exibir mensagem de erro
      alert('As senhas não coincidem. Por favor, tente novamente.');
      return;
    }
    // Lógica para enviar os dados do perfil
    resetPassword(email, password);
  };

  const toggleMenu = () => {
    setExpanded(!expanded);
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const toggleShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
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
              </div>
              <form className='profile-form' onSubmit={handleSubmit}>
                <h3 className='perfil'><FaUser /> Redefinir senha</h3>
                <div className="form-field">
                  <label htmlFor="email">Email:</label>
                  <input type="email" id="email" name="email"/>
                </div>
               <hr />
                <div className="form-field">
              <label htmlFor="password">Digite a nova senha:</label>
              <div className="password-field">
                <input type={showPassword ? 'text' : 'password'} id="password" name="password" value={password} onChange={handleInputChange} />
                <span className={`password-toggle ${showPassword ? 'active' : ''}`} onClick={toggleShowPassword}>
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </span>
              </div>
            </div>
           
            <hr />
            <div className="form-field">
              <label htmlFor="confirmPassword">Confirme a senha:</label>
              <div className="password-field">
                <input type={showConfirmPassword ? 'text' : 'password'} id="confirmPassword" name="confirmPassword" value={confirmPassword} onChange={handleInputChange} />
                <span className={`password-toggle ${showConfirmPassword ? 'active' : ''}`} onClick={toggleShowConfirmPassword}>
                  {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                </span>
              </div>
            </div>
            <hr />
            <button className='send-perfil' type="submit" onClick={(event) => {
              const shouldSubmit = window.confirm('Tem certeza de que deseja realizar a troca da senha?');
              if (!shouldSubmit) {
                event.preventDefault();
              }
            }}>Enviar</button>

              </form>
            </div>
          </CSSTransition>
        )}
      </TransitionGroup>
    </div>
  );
  
}
export default ProfileMenu;