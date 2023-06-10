import React, { useState, useRef, useEffect } from 'react';
//icones
import { FaUser, FaEye, FaEyeSlash, FaSignOutAlt } from 'react-icons/fa';
//transição do perfil
import { TransitionGroup, CSSTransition } from 'react-transition-group';
//css do profileMenu
import './ProfileMenu.css';
//função de resetar a senha
import { resetPassword } from './resetPasswordApi';
//pop-up de erro e sucesso
import { toast } from 'react-toastify';
//navigate
import { useNavigate } from 'react-router-dom';

//valida a senha
import { validatePassword } from '../../LoginComponent/validationPassword';

const ProfileMenu = () => {
  const [email, setEmail] = useState('');
  const [emailSession, setEmailSession] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [expanded, setExpanded] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const formRef = useRef(null);
 

  useEffect(() => {
    const sessionEmail = sessionStorage.getItem('email');
    if (sessionEmail) {
      setEmailSession(sessionEmail);
    }
  }, []);


  const handleSubmit = async (event) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      // Senhas não coincidem, exibir mensagem de erro
      toast.error("as senhas não coincidem")
      return;
    }

    if (!validatePassword(password)) {
      // Senha não atende aos critérios, a função de validação já exibe o toast de erro
      return;
    }

    if (email !== emailSession) {
      // Email não corresponde ao email da sessão, exibir mensagem de erro
      toast.error("O e-mail fornecido não corresponde ao e-mail da sessão");
      return;
    }

    // Lógica para enviar os dados do perfil
    resetPassword(email, password);
    console.log(resetPassword)
  };
  const navigate = useNavigate()

  //faz logout
  const handleLogout = (event) => {

    const shouldLogout = window.confirm('Tem certeza de que deseja Sair?');
    if (!shouldLogout) {
      event.preventDefault();
    }
    // Remova o token de sessionStorage
    sessionStorage.removeItem('bearer');
    sessionStorage.removeItem('type');
    sessionStorage.removeItem('email');
    // Redirecione para a página de login
    navigate('/');
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
      <button className="exit-button" onClick={handleLogout}>
        <FaSignOutAlt className='exit'/> Sair
      </button>
      <TransitionGroup>
        {expanded && (
          <CSSTransition classNames="menu" timeout={300} unmountOnExit nodeRef={formRef}>
            <div ref={formRef}>
              <div className="profile-info">
                <h4>Informações de Perfil</h4>
                <span><strong>Email:</strong> {emailSession}</span>
              </div>
              <form className='profile-form' onSubmit={handleSubmit}>

                <h3 className='perfil'><FaUser /> Redefinir senha</h3>

                <div className="form-field">
                  <label htmlFor="email">Email:</label>

                  <input type="email" id="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)}/>
                </div>

               <hr />

                <div className="form-field">
              <label htmlFor="password">Digite a nova senha:</label>

              <div className="password-field">
                <input type={showPassword ? 'text' : 'password'} id="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} />

                <span className={`password-toggle ${showPassword ? 'active' : ''}`} onClick={toggleShowPassword}>
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </span>

              </div>

            </div>
           
            <hr />
            <div className="form-field">
              <label htmlFor="confirmPassword">Confirme a senha:</label>

              <div className="password-field">
                <input type={showConfirmPassword ? 'text' : 'password'} id="confirmPassword" name="confirmPassword" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />

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