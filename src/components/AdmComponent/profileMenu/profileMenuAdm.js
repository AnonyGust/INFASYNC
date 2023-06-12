import React, { useState, useRef, useEffect } from 'react';
import { FaUser, FaEye, FaEyeSlash, FaSignOutAlt } from 'react-icons/fa';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import './ProfileMenu.css';
import { resetPassword } from '../../requisições/resetPasswordAPI';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { validatePassword } from '../../requisições/validationPassword';
import { sendEmail } from '../../requisições/sendEmailApi';


const ProfileMenu = () => {
  const [email, setEmail] = useState('');
  const [emailSession, setEmailSession] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordResetSuccessful, setPasswordResetSuccessful] = useState(false);

  const [code, setCode] = useState("")
  const [step, setStep] = useState(0);
  const formRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const sessionEmail = sessionStorage.getItem('email');
    if (sessionEmail) {
      setEmailSession(sessionEmail);
    }
  }, []);

  
  const handleProfileButtonClick = () => {
    // Se step for 1, fecha o perfil definindo step como 0
    // Caso contrário, abre o perfil definindo step como 1
    setStep(step === 1 ? 0 : 1);
  };
  
  const handleSubmitEmail = async (event) => {
    event.preventDefault();
    if (email.endsWith('@fatec.sp.gov.br')) {
      try {
        // Enviar o email
        await sendEmail(email);
        
        setStep(2);
      } catch (error) {
        // Lidar com o erro de envio do email
        console.log('Erro ao enviar o email:', error);
      }
    } else {
      toast.error('Digite um e-mail válido @fatec.sp.gov.br');
    }
  };
  


  const handleSubmitResetPassword = async (event) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      toast.error('As senhas não coincidem');
      return;
    }

    if (!validatePassword(password)) {
      return;
    }

    resetPassword(email, password, code);
    setPasswordResetSuccessful(true);
    setStep(0); // Resetar o estado para 0 para fechar ambos os forms
    // Limpar os campos
    setEmail('');
    setPassword('');
    setConfirmPassword('');
    console.log(resetPassword);

  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const toggleShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleLogout = (event) => {
    const shouldLogout = window.confirm('Tem certeza de que deseja sair?');
    if (!shouldLogout) {
      event.preventDefault();
    }
    // Remova o token de sessionStorage
    sessionStorage.removeItem('bearer');
    sessionStorage.removeItem('type');
    sessionStorage.removeItem('email');
    localStorage.removeItem('selectedCourseId');
    // Redirecione para a página de login
    navigate('/');
  };

  return (
    <div className="profile-menu">
      <button className="profile-button" onClick={handleProfileButtonClick}>
        <FaUser /> Perfil
      </button>
      <button className="exit-button" onClick={handleLogout}>
        <FaSignOutAlt className="exit" /> Sair
      </button>
      <TransitionGroup>
        {step === 1 && (
          <CSSTransition classNames="menu" unmountOnExit nodeRef={formRef}>
            <div ref={formRef}>
              <div className="profile-info">
                <h4>Informações de Perfil</h4>
                <span>
                  <strong>Email:</strong> {emailSession}
                </span>
              </div>
              <form className="profile-form" onSubmit={handleSubmitEmail}>
                <h3 className="perfil">
                  <FaUser /> Redefinir senha
                </h3>
                <div className="form-field">
                  <label htmlFor="email">Email:</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <hr />
                <button className="send-perfil" type="submit">
                  Enviar código
                </button>
              </form>
            </div>
          </CSSTransition>
        )}

        {step === 2 && !passwordResetSuccessful && (
          <CSSTransition classNames="menu" unmountOnExit nodeRef={formRef}>
            <div ref={formRef}>
              <div className="profile_form_password">
              <form className="profile-form" onSubmit={handleSubmitResetPassword}>
               <div className="new_password">

                <h3 className="perfil">
                  <FaUser /> Redefinir senha
                </h3>
                
                <div className="form-field">
                  <label htmlFor="code">Código recebido:</label>
                  <input type="text" id="code" name="code" onChange={(e) => setCode(e.target.value)} />
                </div>
                <hr />
                <div className="form-field">
                  <label htmlFor="password">Digite a nova senha:</label>
                  <div className="password-field">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      id="password"
                      name="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <span
                      className={`password-toggle ${showPassword ? 'active' : ''}`}
                      onClick={toggleShowPassword}
                    >
                      {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </span>
                  </div>
                </div>
                <hr />
                <div className="form-field">
                  <label htmlFor="confirmPassword">Confirme a senha:</label>
                  <div className="password-field">
                    <input
                      type={showConfirmPassword ? 'text' : 'password'}
                      id="confirmPassword"
                      name="confirmPassword"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                    <span
                      className={`password-toggle ${showConfirmPassword ? 'active' : ''}`}
                      onClick={toggleShowConfirmPassword}
                    >
                      {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                    </span>
                  </div>
                </div>
                </div>
                <hr />
                <button
                  className="send-perfil"
                  type="submit"
                  onClick={(event) => {
                    const shouldSubmit = window.confirm('Tem certeza de que deseja realizar a troca da senha?');
                    if (!shouldSubmit) {
                      event.preventDefault();
                    }
                  }}
                >
                  Enviar
                </button>
              </form>
              </div>
            </div>
          </CSSTransition>
        )}
      </TransitionGroup>
    </div>
  );
};

export default ProfileMenu;
