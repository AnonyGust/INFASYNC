//navigate para navegar até a página de info
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
// css
import "./adm.css";
// imagens
import logo from './assets/logo.png';
import infatec from './assets/infatec.png';
// icones
import { IoIosSchool } from "react-icons/io";
import { IoMdAlert } from "react-icons/io";
import { IoMdCalendar } from "react-icons/io";
import { IoMdClose } from "react-icons/io";
import { IoMdSend } from "react-icons/io";
// funções para enviar eventos, avisos e cronogramas
import { createEvent } from './submitEventsApi';
import { createWarning } from './submitWarningsApi';
import { createCourse } from './submitExcelApi';
// função para deletar cursos
import { deleteCourses } from './deleteAllCursesApi';
//toastcontainer para sucesso e erro
import { ToastContainer } from 'react-toastify';
//pegando os cursos
import { getCourses } from './getAllCoursesApi';
//react Select
import Select from 'react-select';
//userProfile
import ProfileMenu from './profileMenu/profileMenuAdm';


import infatecFetch from '../../axios/config';



const ThirdComponent = () => {
  const [showEventosForm, setShowEventosForm] = useState(false);
  const [showAvisosForm, setShowAvisosForm] = useState(false);
  const [showCronogramasForm, setShowCronogramasForm] = useState(false);

  const [nomeCurso, setNomeCurso] = useState("");
  const [andar, setAndar] = useState("");
  const [materia, setMateria] = useState("");
  const [periodo, setPeriodo] = useState("");
  const [horarioInicio, setHorarioInicio] = useState("");
  const [horarioFinal, setHorarioFinal] = useState("");
  const [nomeProfessor, setNomeProfessor] = useState("");

  const [title, setTitle]= useState("");
  const [description, setDescription] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [excel, setExcel] = useState(null);

  const [message, setMessage] = useState("")
  const [imageName, setimageName] = useState("")

  const navigate = useNavigate();

  const [cursos, setCursos] = useState([]);

  const [options, setOptions] = useState([]);
  
  useEffect(() => {
    const fetchCourses = async () => {
      const courses = await getCourses();
      setCursos(courses);
  
      // Obter o valor de selectedCourseId do localStorage
      let selectedCourseId = localStorage.getItem('selectedCourseId');
      console.log(selectedCourseId);
  
      // Verificar se o ID da materia selecionado está presente na lista de cursos
      const cursoSelecionado = courses.find(curso => curso.Id === parseInt(selectedCourseId));
      
      // Se o ID da materia não estiver presente, definir o primeiro curso como selecionado
      if (!cursoSelecionado && courses.length > 0) {
        cursoSelecionado = courses[0];
        selectedCourseId = cursoSelecionado.Id.toString();
        localStorage.setItem('selectedCourseId', selectedCourseId);
      }
  
      console.log(cursoSelecionado);
  
      // Criar as opções com base no curso selecionado
      const options = cursoSelecionado ? [{ value: cursoSelecionado.Id, label: cursoSelecionado.Curso }] : [];
  
      // Definir as opções no estado
      setOptions(options);
    };
  
    fetchCourses();
  }, []);


  getCourses()
  
  //abre e fecha eventos modal
  const toggleEventosForm = () => {
    setShowEventosForm(!showEventosForm);
  }
  //abre e fecha avisos
  const toggleAvisosForm = () => {
    setShowAvisosForm(!showAvisosForm);
  }
  //abre e fecha cronogramas
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

  //guarda a imagem selecionada
  const handlerImagem = (e) => {
    setImageFile(e.target.files[0]);
  }
  //guarda o arquivo excel
  const handlerExcel = (e) => {
    setExcel(e.target.files[0]);
  }
  //Envia todos os cursos em Excel
  const sendExcel = (e) => {
    e.preventDefault();
    createCourse(excel);
  };
  //apaga todos os cursos 
  const deleteAllCurses = (e) => {
    e.preventDefault();
    deleteCourses();
  };
  //Envia eventos
  const sendEvents = (e) => {
    e.preventDefault();
    createEvent(title, description, imageFile);
  };
  //Envia Avisos
  const sendWarnings = (e) => {
    e.preventDefault();
    createWarning(imageName, message, imageFile)
  };

  const editarCurso = async () => {
    try {
      const dadosAtualizados = {
        id: '1',
        name: nomeCurso,
        period: 'niggt',
        matter: materia,
        floor: andar,
        start: {
          "ticks": horarioInicio
        },
        end: {
          "ticks": horarioFinal
        },
        coordinator: nomeProfessor,
        excel: "sei la"
      };
      console.log(dadosAtualizados)
      const token = sessionStorage.getItem('bearer');
      
      await infatecFetch.put('/api/Courses/UpdateCourse/2', dadosAtualizados, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
  
      console.log('Curso editado com sucesso!');
    } catch (error) {
      console.error('Erro ao editar o curso:', error);
    }
  };
  

  return (
    <>
 
      <header className='header-adm'>
        <nav className="navigation">
          <div className="logo">
            <img className="imgone" src={logo} alt="logo" />
            <img className="imgtwo" src={infatec} alt="infatec" />
          </div>
        </nav>
      </header>
     
      <main>
      
        <ProfileMenu />
        <div className="center">
          <IoIosSchool className='eventos-icon' />
          <button id="eventos" onClick={toggleEventosForm}>Eventos</button>
          <IoMdAlert className="avisos-icon" />
          <button id="avisos" onClick={toggleAvisosForm}>Avisos</button>
          <IoMdCalendar className="cronogramas-icon" />
          <button id="cronogramas" onClick={toggleCronogramasForm}>Cronogramas</button>
        </div>

        {/* EVENTOS */}
        {showEventosForm &&

        <form id="eventos-form" onSubmit={sendEvents}>
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

        {/* AVISOS */}
        {showAvisosForm &&
          <form id="avisos-form" onSubmit={sendWarnings}>
            <span className="icon-close" onClick={closeFormAvisos}>
              <IoMdClose />
            </span>
            <h2>Enviar Aviso</h2>
            <label htmlFor="titleWarning">Título do Aviso:</label>
              <input
              type="text"
              id="titleWarning"
              name="titleWarning"
              value={imageName}
              onChange={(e) => setimageName(e.target.value)}
                />
            <label htmlFor="aviso" >Descrição do Aviso:</label>
            <textarea id="aviso" value={message} onChange={(e) => setMessage(e.target.value)}name="aviso"></textarea>
            <label htmlFor="imagemEvento">Anexar Imagem:</label>
            <input type="file" id="imagem" name="imagem" onChange={handlerImagem} />
            <button id="btnAvisos" type="submit">
              <IoMdSend /> Enviar
            </button>
          </form>
        }

        {/* CRONOGRAMAS */}
        {showCronogramasForm &&
          <form id="cronogramas-form" onSubmit={sendExcel}>
          <span className="icon-close" onClick={closeFormCronogramas}>
            <IoMdClose />
          </span>
          <h2>Cronogramas</h2>
          

          
          <div className="select">
            <h3>Selecione sua máteria para editar</h3>
          <Select
              isMulti
              options={options}
              placeholder="Matéria"
              />
            </div>
            <div className="form-row">
    <div className="form-group">
      <label htmlFor="curso1">Nome do curso:</label>
      <input
        type="text"
        id="curso1"
        name="curso1"
        value={nomeCurso}
        onChange={(e) => setNomeCurso(e.target.value)}
      />
    </div>
    <div className="form-group">
      <label htmlFor="andar">Andar:</label>
      <input
        type="text"
        id="andar"
        name="andar"
        value={andar}
        onChange={(e) => setAndar(e.target.value)}
      />
    </div>
    <div className="form-group">
      <label htmlFor="materia">Matéria:</label>
      <input
        type="text"
        id="materia"
        name="materia"
        value={materia}
        onChange={(e) => setMateria(e.target.value)}
      />
    </div>
    <div className="form-group">
      <label htmlFor="periodo1">Período:</label>
      <select
        id="periodo1"
        name="periodo1"
        value={periodo}
        onChange={(e) => setPeriodo(e.target.value)}
      >
        <option value="dia">Dia</option>
        <option value="noite">Noite</option>
      </select>
    </div>
    <div className="form-group">
      <label htmlFor="horarioInicio">Horário de início:</label>
      <input
        type="time"
        id="horarioInicio"
        name="horarioInicio"
        value={horarioInicio}
        onChange={(e) => setHorarioInicio(e.target.value)}
      />
    </div>
    <div className="form-group">
      <label htmlFor="horarioFinal">Horário final:</label>
      <input
        type="time"
        id="horarioFinal"
        name="horarioFinal"
        value={horarioFinal}
        onChange={(e) => setHorarioFinal(e.target.value)}
      />
    </div>
    <div className="form-group">
      <label htmlFor="nomeProfessor">Nome do professor:</label>
      <input
        type="text"
        id="nomeProfessor"
        name="nomeProfessor"
        value={nomeProfessor}
        onChange={(e) => setNomeProfessor(e.target.value)}
      />
    </div>
  </div>
  <button id="btnCronograma" onClick={editarCurso}>
    <IoMdSend /> Enviar
  </button>

          <hr />

          {/* ENVIAR E DELETAR TODOS OS CURSOS */}
           {/* ENVIAR E DELETAR TODOS OS CURSOS */}
           <div className="excelAll">
          <h3>Para carregar todos os cursos insira um arquivo Excel.</h3>
            <div className="sendCurses">
            <input type="file" id="excel" name="excel" onChange={handlerExcel} />
            <div className="sendButtons">
            <button id="btnExcel">
            <IoMdSend /> Enviar Excel
          </button>
          <button id="btnDeleteCurses" onClick={deleteAllCurses}>
            <IoMdSend /> Deletar todos os cursos
          </button>
          </div>
          </div>
          </div>
        </form>
        
        }

            <button id="btnInfo" onClick={() => navigate('/info')}>
               ir para informações
            </button>
      </main>
      <ToastContainer position="bottom-left" />
    </>
  );
};

export default ThirdComponent;