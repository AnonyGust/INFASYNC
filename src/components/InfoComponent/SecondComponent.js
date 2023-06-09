import React, { useEffect, useState } from "react";
import { getEvents } from "./getEventsApi";
import { getWarnings } from "./getWarningsApi";
import { getAllCourses } from "./getCoursesAllApi";
import logo from './assets/logo.png';
import infasync from './assets/infasync.png'
import './info.css';


const SecondComponent = () => {
  const [visibleIndex, setVisibleIndex] = useState(0);
  const [eventData, setEventData] = useState(null);
  const [warningData, setWarningData] = useState(null);
  const [courseData, setCourseData] = useState([]);

  //extraindo data correta 
  function extractTime(datetimeString) {
    const time = datetimeString.split(" ")[1]; // Divide a string em duas partes separadas pelo espaço e pega a segunda parte
    const hour = time.split(":")[0]; // Divide a parte do tempo em três partes separadas pelos dois pontos e pega a primeira parte
    const minute = time.split(":")[1]; // Pega a segunda parte
  
    return `${hour}:${minute}`; // Retorna o horário formatado
  }
  
//resgatando e executados dados para passar para eventos
useEffect(() => {
  const fetchData = async () => {
    try {
      const events = await getEvents();
      setEventData(events);
    } catch (error) {
      console.error(error);
      setEventData([]);
    }
  };

  fetchData();
}, []);

  useEffect(() => {
    const fetchWarning = async () => {
      try {
        const warnings = await getWarnings();
        setWarningData(warnings);
      } catch (error) {
        console.error(error);
        setWarningData([]);
      }
    };

    fetchWarning();
  }, []);

  useEffect(() => {
    const fetchWarning = async () => {
      try {
        const courses = await getAllCourses();
        setCourseData(courses);
      } catch (error) {
        console.error(error);
        setCourseData([]);
      }
    };

    fetchWarning();
  }, []);
  //resgatando dados para cards
 

  //resgatando dados para eventos e avisos
 

  const [isFlipped, setIsFlipped] = useState(false);


  const cardsFront = courseData.slice(0, 6);
  const cardsBack = courseData.slice(6, 12);


  useEffect(() => {
    const intervalId = setInterval(() => {
      setIsFlipped((prevIsFlipped) => !prevIsFlipped);
      setVisibleIndex((visibleIndex + 6) % cardsFront.length);
    }, 5000);

    return () => clearInterval(intervalId);
  }, [cardsFront, visibleIndex]);

  return (
    <>
      <header>
        <nav className="header-content">
          <div className="superman">
            <img className="imginfo" src={logo} alt="logo" />
          </div>
          <div className="textone">
            <img className="infasync" src={infasync} alt="infasync" />
          </div>
        </nav>
      </header>

      <div className="main-content">
        <div className="cards">
          {cardsFront.slice(visibleIndex, visibleIndex + 6).map((courseData, index) => (
            <div className={`card card${index + 1} ${isFlipped ? "flipped" : ""}`} key={index}>
              <div className="front">
                <div className="courseName">
                <h2>{courseData.name}</h2>
                </div>

                <div className="cardinfo">
                  <h3 className="andar">{courseData.floor}</h3>
                  <h3 className="curso">{courseData.matter}</h3>
                  <div className="horarioAll">
                    <div className="horarioInicio">{extractTime(courseData.start)}</div>
                    <h4>as</h4>
                    <div className="horarioFinal">{extractTime(courseData.end)}</div>
                  </div>
                </div>

                <p className="nomeprof">{courseData.coordinator}</p>
              </div>
              <div className="back">
              <div className="courseName">
                <h2>{cardsBack[index].name}</h2>
                </div>
                <div className="cardinfo">
                  <h3 className="andar">{cardsBack[index].floor}</h3>
                  <h3 className="curso">{cardsBack[index].matter}</h3>
                  <div className="horarioAll">
                    <div className="horarioInicio">{extractTime(cardsBack[index].start)}</div>
                    <h4>as</h4>
                    <div className="horarioFinal">{extractTime(cardsBack[index].end)}</div>
                  </div>

                </div>
                <p className="nomeprof">{cardsBack[index].coordinator}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="eventandavisos">
  <div className="tamanho">
    <div className="avisos">
      <h1>avisos</h1>
      {warningData && warningData.length > 0 && (
      <div>
        <div className="titleAviso">
        <p>{warningData[warningData.length - 1].title}</p>
        </div>
     
      
        <div className="imgaviso">
          <img className="imghtml1"
           src={`https://localhost:7245/api/Warnings/ShowImage/${warningData[warningData.length - 1].imageName}`}
            alt=""
          />
          <h3 className="textAviso">{warningData[warningData.length - 1].message}</h3>
        </div>
        

      </div>
      )}
    </div>
  </div>

  <div className="tamanhotwo">
    <div className="eventos">
      <h1>eventos</h1>
      {eventData && eventData.length > 0 && (
      <div>
        <div className="titleEvento">
          <p>{eventData[eventData.length - 1].title}</p>
        </div>
        <div className="imgevento">
          <img
            className="imghtml2"
            src={`https://localhost:7245/api/Events/ViewImageEvent/${eventData[eventData.length - 1].imageName}`}
            alt=""
          />
          <h4 className="textEvent">{eventData[eventData.length - 1].description}</h4>
        </div>
      </div>
    )}
            </div>
  </div>
</div>  
      </div>

    </>
  )
}

export default SecondComponent;