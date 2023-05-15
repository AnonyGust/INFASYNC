import "./login.css"
import "./animationSquare.css"
import "./media.css"
import logo from './assets/logo.png';
import infatec from './assets/infatec.png'
import React, { useState } from 'react';
import { createUser } from "./cadastroApi";
import { loginUser } from "./loginApi";
import { useNavigate } from "react-router-dom";

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



const FirstComponent = () => {
  //funções para transições de forms para forms
  const [loginOpen, setLoginOpen] = useState(false);
  const [registerOpen, setRegisterOpen] = useState(false);
  const [forgotPasswordOpen, setForgotPasswordOpen] = useState(false);
  const [cursoSelecionado, setCursoSelecionado] = useState('');
  const [selectedOption, setSelectedOption] = useState(null);

  //limpa os campos de LOGIN quando muda pra outro formulário
  const toggleLogin = () => {
    setRa("");
    setPassword("");
    setLoginOpen(!loginOpen);
    setRegisterOpen(false);
    setForgotPasswordOpen(false);
  };
  //limpa os campos de REGISTRO quando muda pra outro formulário
  const toggleRegister = () => {
    setName("")
    setRa("");
    setEmail("");
    setPassword("");
    setCpassword("")
    setLoginOpen(false);
    setRegisterOpen(!registerOpen);
    setForgotPasswordOpen(false);
  };
  //limpa os campos de ESQUECEU SENHA quando muda pra outro formulário
  const toggleForgotPassword = () => {
    setEmail("");
    setLoginOpen(false);
    setRegisterOpen(false);
    setForgotPasswordOpen(!forgotPasswordOpen);
  };

  //estado inicial de LOGIN como true e executa somente uma vez
  React.useEffect(() => {
    setLoginOpen(true);
  }, []);


  //constantes para guardar e setar valores nas constantes
  const [name, setName] = useState("");
  const [ra, setRa] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cPassword, setCpassword] = useState("");

  //atualizará o valor da constante com o valor inserido pelo usuário
  const handleNameChange = (event) => setName(event.target.value);
  const handleEmailChange = (event) => setEmail(event.target.value);
  const handlePasswordChange = (event) => setPassword(event.target.value);
  const handlecPasswordChange = (event) => setCpassword(event.target.value);


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
    if (!input.validity.valid && e.relatedTarget === null) {
      input.focus();
      toast.error("Digite um e-mail válido");
      return;
    }

    if (!emailValue.endsWith("@fatec.sp.gov.br")) {
      input.focus();
      toast.error("Digite um e-mail válido com o domínio @fatec.sp.gov.br");
    }
  };


  //evento para não deixar clicar em outro input caso a senha esteja incorreta
  const handlePasswordBlur = (event) => {
    const inputValue = event.target.value;
    const pattern = event.target.getAttribute("pattern");
    const isValid = new RegExp(pattern).test(inputValue);
    if (!isValid) {
      toast.error("A senha deve ter pelo menos 8 caracteres, com pelo menos uma letra maiúscula, uma letra minúscula, um número e um caractere especial");
      event.target.focus();
    }
  };


  //OPÇÕES EM SELECTBOX
  const options = [
    { value: '1', label: 'Chocolate' },
    { value: '1', label: 'Strawberry' },
    { value: '1', label: 'Vanilla' }
  ];

 
  //GUARDA O CURSO SELECIONADO  
  const handleChange = (selectedOption) => {
    setSelectedOption(selectedOption);
  };

 //utiliza o navigate para navegar entre as páginas caso haja token
 const navigate = useNavigate();

 //limpa o sessionStorage caso volta para página de login
 sessionStorage.removeItem('bearer');
 
  const handleSubmitLogin = async (event) => {
    event.preventDefault();
    

   //METODO DE LOGIN
   await loginUser(ra, password, navigate);
  }
  
  //GERA ERRO QUANDO CLICADO EM REGISTRO SE ALGO NÃO ESTIVER PREENCHIDO (SENHA COINCIDIREM E CURSO)
 const handleSubmitRegister = async (event) => {
    event.preventDefault();

    //METODO DE CADASTRO
    await createUser(ra, name, email, password);



    if (password !== cPassword) {
      toast.error('As senhas não coincidem!');
      return;
    }
    // Verifica se o curso foi selecionado
    if (selectedOption !== null) {
      setCursoSelecionado(selectedOption);
    } else {
      toast.error("Selecione um curso");
      return;
    }
  };


  return (
    <>

      <header>

        <nav className="navigation">
          <div className="logo">
            <img className="imgone" src={logo} alt="logo" />
            <img className="imgtwo" src={infatec} alt="infatec" />
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

        <div className={`wrapper ${loginOpen || registerOpen || forgotPasswordOpen ? 'active' : 'inactive'}`}>
          {/**/}
          <div className={`form-box login ${loginOpen ? 'active' : 'inactive'} form-login`}>
            {/*Formulário de LOGIN*/}
            <form id="login_form" onSubmit={handleSubmitLogin}>

              <h2 className="textLogin">Login</h2>

              {/* RA LOGIN */}
              <div className="input-box">
                <span className="icon">
                  <IoIosSchool />
                </span>
                <input type="text"
                 required id="login_ra"
                 maxLength="13"
                 pattern="[0-9]+"
                 onBlur={handleRaBlur}
                 value={ra}
                 onChange={handleRaChange} />
                <label>Ra</label>
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
              <p>Ainda não tem uma conta? <a className="go-register" href="#" onClick={() => { toggleLogin(); toggleRegister() }}>Crie agora</a></p>
            </div>

          </div>

          <div className={`form-box register ${registerOpen ? 'active' : 'inactive'} form-register`}>
            {/*Formulário de REGISTRO*/}
            <form id="register_form" onSubmit={handleSubmitRegister}>

              <h2 className="textRegistro" >Registro</h2>

              {/* SELECT BOX */}
              <div className="select-container">
                <h4>Selecione o curso</h4>
                <Select
                  isMulti
                  value={selectedOption}
                  onChange={handleChange}
                  options={options}
                  placeholder="Selecione o curso"
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
                  onBlur={handlePasswordBlur}
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

              <p>Já possuí uma conta? <a className="back-to-login" href="#"
                onClick={() => { toggleRegister(); toggleLogin() }}> Login</a> </p>

            </form>
          </div>

          <ToastContainer position="bottom-left" />

          <div className={`form-box forgot-password ${forgotPasswordOpen ? 'active' : 'inactive'} form-forgotPassword`}>
            {/*Formulário de RECUPERAÇÃO DE SENHA*/}
            <form id="forgot_password_form">

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

              <p><a className="back-to-login" href="#"
                onClick={() => { toggleLogin() }}>Voltar para Login</a> </p>

            </form>
          </div>
        </div>

      </div>
    </>
  )
}

export default FirstComponent;