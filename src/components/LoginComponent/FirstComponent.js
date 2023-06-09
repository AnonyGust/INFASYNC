import "./login.css"
import "./animationSquare.css"
import "./media.css"
import logo from './assets/logo.png';
import infasync from './assets/infasync.png'
import React, { useState, useEffect } from 'react';
import { createUser } from "../requisições/loginAPI/cadastroApi";
import { loginUser } from "../requisições/loginAPI/loginApi";
import { useNavigate } from "react-router-dom";
import { getCourses } from "../requisições/loginAPI/selectCursesApi";
//BIBLOTECA DO SELECTBOX
import Select from 'react-select';

//icons
import { IoMdPerson } from "react-icons/io";
import { IoIosLock } from "react-icons/io";
import { IoIosSchool } from "react-icons/io";
import { IoMdMail } from "react-icons/io";


//bibliotecas para erros no registro
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

//validador de senha
import { validatePassword } from "../requisições/validationPassword";
import { sendEmail } from "../requisições/sendEmailApi";
import { resetPassword } from "../requisições/resetPasswordAPI";


const FirstComponent = () => {
  //funções para transições de forms para forms
  const [loginOpen, setLoginOpen] = useState(false);
  const [registerOpen, setRegisterOpen] = useState(false);
  const [forgotPasswordOpen, setForgotPasswordOpen] = useState(false);
  const [newPasswordOpen, setNewPasswordOpen] = useState(false);
  //validar se o email é valido para redirecionar em recuperar senha
  const [validEmail, setValidEmail] = useState(true);
  
  const [courseOptions, setCourseOptions] = useState([]);

  const [selectedCourseId, setSelectedCourseId] = useState('');

   //constantes para guardar e setar valores nas constantes
   const [name, setName] = useState("");
   const [ra, setRa] = useState("");
   const [email, setEmail] = useState("");
   const [password, setPassword] = useState("");
   const [cPassword, setCpassword] = useState("");
   const [code, setCode] = useState("")
 
   //atualizará o valor da constante com o valor inserido pelo usuário
   const handleNameChange = (event) => setName(event.target.value);
   const handleEmailChange = (event) => setEmail(event.target.value)
   const handlePasswordChange = (event) => setPassword(event.target.value)
   const handlecPasswordChange = (event) => setCpassword(event.target.value);


    //limpa os campos de LOGIN quando muda pra outro formulário
    const toggleLogin = () => {
    setRa("");
    setPassword("");
    setLoginOpen(!loginOpen);
    setRegisterOpen(false);
    setForgotPasswordOpen(false);
    setNewPasswordOpen(false)
  };
  //limpa os campos de REGISTRO quando muda pra outro formulário
  const toggleRegister = () => {
    setName("")
    setRa("");
    setEmail("");
    setPassword("");
    setCpassword("")
    setLoginOpen(false);
    setNewPasswordOpen(false)
    setForgotPasswordOpen(false);
    setRegisterOpen(!registerOpen);
  };
  //limpa os campos de ESQUECEU SENHA quando muda pra outro formulário
  const toggleForgotPassword = () => {
    setEmail("");
    setLoginOpen(false);
    setRegisterOpen(false);
    setNewPasswordOpen(false)
    setForgotPasswordOpen(!forgotPasswordOpen);
  };


  //invoca e faz filtro em cursos para SELECT
  useEffect(() => {
    const fetchData = async () => {
      try {
        const options = await getCourses();
        setCourseOptions(options);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  //Constante para guardar os valores filtrados de cursos
  const options = courseOptions.map((courseOptions, index) => ({
    value: courseOptions.Id,
    label: courseOptions.Curso,
  }));

  //estado inicial de LOGIN como true e executa somente uma vez
  React.useEffect(() => {
    setLoginOpen(true);
  }, []);
 

  //NÃO PERMITE QUE SEJA DIGITADO LETRAS NA PARTE DO RA
  const handleRaChange = (event) => {
    const inputValue = event.target.value;
    const inputIsNumeric = /^\d*$/.test(inputValue);

    if (inputIsNumeric) {
      setRa(inputValue);
    }
  };
  
  //Verifica se tem 13 números digitados e se não tiver retorna erro 
  const handleRaBlur = (event) => {
    const inputValue = event.target.value;
    const inputLength = inputValue.length;
    if (inputLength > 0 && inputLength < 13) {
      toast.error("o Ra deve conter 13 digitos númericos");
      event.target.focus();
    }
  };

  //evento para checar email e verificar se tem dominio @fatec.sp.gov.br

  const handleEmailBlur = (e) => {
    const input = e.target;
    const emailValue = input.value.trim();

    if (!emailValue.endsWith('@fatec.sp.gov.br')) {
      input.focus();
      toast.error('Digite um e-mail válido @fatec.sp.gov.br')
      setValidEmail(false)
    }else{
      setValidEmail(true)
    }
  }

  const handleSubmitForgotPassword = async (event) => {
    event.preventDefault();
    if (validEmail) {
      try {
        // Enviar o email
        await sendEmail(email);
        // Se o envio do email for bem-sucedido, redirecionar para o formulário de nova senha
        setNewPasswordOpen(true);
      } catch (error) {
        // Lidar com o erro de envio do email
        console.log('Erro ao enviar o email:', error);
      }
    }
  }

  const handleNewPassword = async (event) => {
    event.preventDefault();
    
    validatePassword(password)
    if (password !== cPassword) {
      toast.error('As senhas não coincidem!');
      return;
    }
    try {
      await resetPassword(email, password, code);
      setLoginOpen(true);
      setNewPasswordOpen(false);
      setForgotPasswordOpen(false);
      console.log(code);
      // Redirect code here (replace the console.log with the redirection logic)
    } catch (error) {
      // Handle any errors that occurred during password reset
      console.error(error);
    }
    
    console.log(code)
  }

 //utiliza o navigate para navegar entre as páginas caso haja token
 const navigate = useNavigate();

 //retira o selectedcourseId
 localStorage.removeItem('selectedCourseId')
 
  const handleSubmitLogin = async (event) => {
    event.preventDefault();
    
    validatePassword(password)
   //METODO DE LOGIN
   await loginUser( email, password, navigate);
  }

    //função para guardar a opção de curso selecionado
    const handleCourseSelect = (selectedOption) => {
      if (selectedOption) {
        const selectedCourseId = selectedOption.value;
        setSelectedCourseId(selectedCourseId);
        console.log(selectedCourseId);
      }
    };

  
  //GERA ERRO QUANDO CLICADO EM REGISTRO SE ALGO NÃO ESTIVER PREENCHIDO (SENHA COINCIDIREM E CURSO)
 const handleSubmitRegister = async (event) => {
    event.preventDefault();

    if (password !== cPassword) {
      toast.error('As senhas não coincidem!');
      return;
    }
    //valida a senha
    validatePassword(password)

    if (!selectedCourseId) {
      toast.error('Selecione um curso!');
      return;
    }

   //METODO DE CADASTRO
    await createUser(ra, name, email, password, selectedCourseId);
  };


  return (
    <>

      <header className="header-login">

        <nav className="navigation">
          <div className="logo">
            <img className="imgone" src={logo} alt="logo" />
            <img className="imgtwo" src={infasync} alt="infasync" />
          </div>
          <div className="btns">
            <button className="btnLogin-popup" onClick={toggleLogin}>Login</button>
            <button className="btnRegistro-popup" onClick={toggleRegister}>Registro</button>
          </div>
        </nav>

      </header>
      <div className="section">

        {/*animação de quadrados*/}
        <div className="square" style={{ "--i": 0 }}></div>
        <div className="square" style={{ "--i": 1 }}></div>
        <div className="square" style={{ "--i": 2 }}></div>
        <div className="square" style={{ "--i": 3 }}></div>
        <div className="square" style={{ "--i": 4 }}></div>
        <div className="square" style={{ "--i": 5 }}></div>
        <div className="square" style={{ "--i": 6 }}></div>
        <div className="square" style={{ "--i": 7 }}></div>

        <div className={`wrapper ${loginOpen || registerOpen || forgotPasswordOpen || newPasswordOpen ? 'active' : 'inactive'}`}>
          {/**/}
          <div className={`form-box login ${loginOpen ? 'active' : 'inactive'} form-login`}>
            {/*Formulário de LOGIN*/}
            <form id="login_form" onSubmit={handleSubmitLogin}>

              <h2 className="textLogin">Login</h2>

              {/* RA LOGIN */}
              <div className="input-box">
                <span className="icon">
                  <IoMdMail />
                </span>
                <input type="text"
                  required id="email_login"
                  pattern=".+@.+\..+"
                  onChange={handleEmailChange}
                  onBlur={handleEmailBlur}
                  value={email} />
                <label>Email</label>
              </div>

              {/* SENHA LOGIN */}
              <div className="input-box">
                <span className="icon">
                  <IoIosLock />
                </span>
                <input type="password" required id="login_password" value={password} onChange={handlePasswordChange} />
                <label>Senha</label>
              </div>

              <div className="remember-forgot">
                <label id="relembre">
                  <input type="checkbox" /> Relembre meus dados</label>
                <p className="go-forgot" onClick={toggleForgotPassword}>Esqueceu sua senha?</p>
              </div>

              <button type="submit" className="btn-login">Entrar</button>

            </form>
            <div className="footer-login">
              <p>Ainda não tem uma conta? <span className="go-register" onClick={() => { toggleLogin(); toggleRegister() }}>Crie agora</span></p>
            </div>

          </div>

          <div className={`form-box register ${registerOpen ? 'active' : 'inactive'} form-register`}>
            {/*Formulário de REGISTRO*/}
            <form id="register_form" onSubmit={handleSubmitRegister}>

              <h2 className="textRegistro" >Registro</h2>

              {/* SELECT BOX */}
              <div className="select-container">
                  <h4>Selecione seu Curso</h4>
                  <Select
                  options={options}
                  placeholder="Cursos"
                  isSearchable={false}// Remover a opção de digitar
                  onChange={handleCourseSelect} 
                  />          
                </div>

              {/* NOME REGISTRO */}
              <div className="input-box">
                <span className="icon">
                  <IoMdPerson />
                </span>
                <input type="text"
                  required id="register_name"
                  onChange={handleNameChange}
                  value={name} />
                <label>Nome Completo</label>
              </div>

              {/* RA REGISTRO */}
              <div className="input-box">
                <span className="icon">
                  <IoIosSchool />
                </span>
                <input
                  type="text"
                  required
                  id="login_ra"
                  onBlur={handleRaBlur}
                  maxLength="13"
                  value={ra}
                  onChange={handleRaChange}
                />
                <label>RA</label>
              </div>

              {/* EMAIL REGISTRO */}
              <div className="input-box">
                <span className="icon">
                  <IoMdMail />
                </span>
                <input type="text"
                  required id="register_email"
                  pattern=".+@.+\..+"
                  onChange={handleEmailChange}
                  onBlur={handleEmailBlur}
                  value={email} />
                <label>Email</label>
              </div>

              {/* SENHA REGISTRO */}
              <div className="input-box">
                <span className="icon">
                  <IoIosLock />
                </span>
                <input
                  type="password"
                  required
                  id="register_password"
                  pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W).{8,}"
                  value={password}
                  
                  onChange={handlePasswordChange} />
                <label>Senha</label>
              </div>

              {/* CONFIRMAÇÃO DE SENHA REGISTRO */}
              <div className="input-box">
                <span className="icon">
                  <IoIosLock />
                </span>
                <input type="password"
                  required id="register_confirm_password"
                  onChange={handlecPasswordChange}
                  value={cPassword} />
                <label>Confirme sua Senha</label>
              </div>

              <button className="btn-registrar" type="submit">Registrar</button>

              <p className="backLogin">Já possuí uma conta? <span className="back-to-login"
                onClick={() => { toggleRegister(); toggleLogin() }}> Login</span> </p>

            </form>
          </div>

          
          {!newPasswordOpen && (
          <div className={`form-box forgot-password ${forgotPasswordOpen ? 'active' : 'inactive'} form-forgotPassword`}>
            {/*Formulário de RECUPERAÇÃO DE SENHA*/}
            <form id="forgot_password_form" onSubmit={handleSubmitForgotPassword}>

              <h2 className="textEsqueceu">Esqueceu sua Senha?</h2>

              <p>Informe seu email cadastrado para recuperar a senha.</p>

              {/* EMAIL PARA RECUPERAR SENHA */}
              <div className="input-box">
                <span className="icon">
                  <ion-icon name="mail"></ion-icon>
                </span>
                <input type="text"
                 required id="forgot_password_email"
                 pattern=".+@.+\..+"
                 value={email}
                 onChange={handleEmailChange}
                 onBlur={handleEmailBlur} />
                <label>Email</label>
              </div>

              <button type="submit" className="btn-forgot-password">Recuperar Senha</button>

              <p><span className="back-to-login" 
                onClick={() => { toggleLogin() }}>Voltar para Login</span> </p>

            </form>
          </div>
          )}

          <div className={`form-box new-password ${newPasswordOpen ? 'active' : 'inactive'} form-newPassword`}>
            {/*Formulário de RECUPERAÇÃO DE SENHA*/}
            <form id="new_password_form" onSubmit={handleNewPassword} >

              <h2 className="textEsqueceu">Esqueceu sua Senha?</h2>

              <p>Digite o código e a nova senha.</p>

              {/* CÓDIGO PARA RECUPERAR SENHA */}
              <div className="input-box">
              
                <input type="text"
                 required id="code"
                 onChange={(e) => setCode(e.target.value)}
                  />
                <label>Código</label>
              </div>

              {/* NOVA SENHA */}
              <div className="input-box">
                <span className="icon">
                  <IoIosLock />
                </span>
                <input
                  type="password"
                  required
                  id="new_password"
                  pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W).{8,}"
                  value={password}
                  
                  onChange={handlePasswordChange} />
                <label>Nova senha</label>
              </div>

              {/* CONFIRMAÇÃO DE SENHA */}
              <div className="input-box">
                <span className="icon">
                  <IoIosLock />
                </span>
                <input type="password"
                  required id="confirm_new_password"
                  onChange={handlecPasswordChange}
                  value={cPassword} />
                <label>Confirmar nova senha</label>
              </div>

              <button type="submit" className="btn-forgot-password">Redefinir Senha</button>

              <p><span className="back-to-login" 
                onClick={() => { toggleLogin() }}>Voltar para Login</span></p>

            </form>
          </div>

          <ToastContainer position="bottom-left" />

        </div>

      </div>
    </>
  )
}

export default FirstComponent;