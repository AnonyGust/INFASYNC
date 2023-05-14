import { useState } from 'react';
import "./adm.css";
import logo from './assets/logo.png';
import infatec from './assets/infatec.png';
import { IoIosSchool } from "react-icons/io";
import { IoMdAlert } from "react-icons/io";
import { IoMdCalendar } from "react-icons/io";
import { IoMdClose } from "react-icons/io";
import { IoMdSend } from "react-icons/io";
import infatecFetch from '../../axios/config';




const ThirdComponent = () => {
  const [showEventosForm, setShowEventosForm] = useState(false);
  const [showAvisosForm, setShowAvisosForm] = useState(false);
  const [showCronogramasForm, setShowCronogramasForm] = useState(false);

  const toggleEventosForm = () => {
    setShowEventosForm(!showEventosForm);
  }

  const toggleAvisosForm = () => {
    setShowAvisosForm(!showAvisosForm);
  }

  const toggleCronogramasForm = () => {
    setShowCronogramasForm(!showCronogramasForm);
  }
  //funções para fechar os forms
  const closeFormEventos = () => {
    setShowEventosForm(false)
  }

  const closeFormAvisos = () => {
    setShowAvisosForm(false)
  }

  const closeFormCronogramas = () => {
    setShowCronogramasForm(false)
  }
  const [title, setTitle]= useState();
  const [description, setDescription] = useState();
  const [imageFile, setImageFile] = useState(null);

  const handlerImagem = (e) => {
    setImageFile(e.target.files[0]);
  }

  const createPost = async (e) => {
    e.preventDefault();
  
    const dados = new FormData();
  
    dados.append('title', title);
    dados.append('description', description);
    dados.append('imageFile', imageFile);
    dados.append('image_Uri', '');
  
    try {
      const token = sessionStorage.getItem('bearer');
      await infatecFetch.post('/api/Events/InsertNewEvent', dados, {
        headers: {
          'Content-Type': `multipart/form-data`,
          'Authorization': `Bearer ${token}`,
        },
      });
      console.log(dados)
      
    } catch (error) {
      console.error(error);
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
        </nav>
      </header>
      <main>
        <div className="center">
          <IoIosSchool className='eventos-icon' />
          <button id="eventos" onClick={toggleEventosForm}>Eventos</button>
          <IoMdAlert className="avisos-icon" />
          <button id="avisos" onClick={toggleAvisosForm}>Avisos</button>
          <IoMdCalendar className="cronogramas-icon" />
          <button id="cronogramas" onClick={toggleCronogramasForm}>Cronogramas</button>
        </div>
        {showEventosForm &&

<form id="eventos-form" onSubmit={(e) => createPost(e)}>
<span className="icon-close" onClick={closeFormEventos}>
  <IoMdClose />
</span>
<h2>Enviar Evento</h2>
<label htmlFor="titulo">Título do Evento:</label>
<input
  type="text"
  id="titulo"
  name="title"
  value={title}
  onChange={(e) => setTitle(e.target.value)}
/>
<label htmlFor="descricaoEventos">Descrição do Evento:</label>
<textarea
  id="descricaoEventos"
  name="description"
  value={description}
  onChange={(e) => setDescription(e.target.value)}
></textarea>
<label htmlFor="imagemEventos2">Anexar Imagem:</label>
<input
  type="file"
  id="imagemEventos2"
  name="imagemEventos2"
  onChange={handlerImagem}
/>
<button id="btnEventos" type="submit">
  <IoMdSend /> Enviar
</button>
</form>
        }

        {showAvisosForm &&
          <form id="avisos-form">
            <span className="icon-close" onClick={closeFormAvisos}>
              <IoMdClose />
            </span>
            <h2>Enviar Aviso</h2>
            <label htmlFor="aviso">Descrição do Aviso:</label>
            <textarea id="aviso" name="aviso"></textarea>
            <label htmlFor="imagemEvento">Anexar Imagem:</label>
            <input type="file" id="imagem" name="imagem" />
            <button id="btnAvisos" type="submit">
              <IoMdSend /> Enviar
            </button>
            <hr />
            <label htmlFor="aviso2">Descrição do segundo Aviso:</label>
            <textarea id="aviso2" name="aviso2"></textarea>
            <label htmlFor="imagemAviso2">Anexar Imagem:</label>
            <input type="file" id="imagemAviso2" name="imagemAviso2" />
            <button id="btnAvisos" type="submit">
              <IoMdSend /> Enviar
            </button>
          </form>
        }
        {showCronogramasForm &&
          <form id="cronogramas-form">
          <span className="icon-close" onClick={closeFormCronogramas}>
            <IoMdClose />
          </span>
          <h2>Cronogramas</h2>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="curso1">Nome do curso:</label>
              <input type="text" id="curso1" name="curso1" />
            </div>
            <div className="form-group">
              <label htmlFor="andar">Andar:</label>
              <input type="text" id="andar" name="andar" />
            </div>
            <div className="form-group">
              <label htmlFor="materia">Materia:</label>
              <input type="text" id="materia" name="materia" />
            </div>
            <div className="form-group">
              <label htmlFor="periodo1">Período:</label>
              <select id="periodo1" name="periodo1">
                <option value="dia">Dia</option>
                <option value="noite">Noite</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="horarioInicio">horário de início:</label>
              <input type="time" id="horarioInicio" name="horarioInicio" />
            </div>
            <div className="form-group">
              <label htmlFor="horarioFinal">horário final:</label>
              <input type="time" id="horarioFinal" name="horarioFinal" />
            </div>
            <div className="form-group">
              <label htmlFor="foto1">Foto do professor:</label>
              <input type="file" id="foto1" name="foto1" />
            </div>
            <div className="form-group">
              <label htmlFor="nomeProfessor">Nome do professor:</label>
              <input type="text" id="nomeProfessor" name="nomeProfessor" />
            </div>
          </div>
          <button id="btnCronograma">
            <IoMdSend /> Enviar
          </button>
        </form>
        
        }
      </main>
    </>
  );
};

export default ThirdComponent;