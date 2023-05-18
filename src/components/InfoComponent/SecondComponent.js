import React, { useEffect, useState } from "react";
import { getEvents } from "./getEventsApi";
import { getWarnings } from "./getWarningsApi";
import { getAllCourses } from "./getCoursesAllApi";
import logo from './assets/logo.png';
import fundo from './assets/fundopreto.jpg';
import './info.css';


const SecondComponent = () => {
  const [visibleIndex, setVisibleIndex] = useState(0);

  const [products, setProducts] = useState([])
  const [eventData, setEventData] = useState(null);
  const [warningData, setWarningData] = useState(null);
  const [courseData, setCourseData] = useState([]);
  
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
            <img className="imgone" src={logo} alt="logo" />
          </div>
          <div className="textone">
            <h1>cronograma em tempo real</h1>
          </div>
        </nav>
      </header>

      <div className="main-content">
        <div className="cards">
          {cardsFront.slice(visibleIndex, visibleIndex + 6).map((courseData, index) => (
            <div className={`card card${index + 1} ${isFlipped ? "flipped" : ""}`} key={index}>
              <div className="front">
                <h2>{courseData.name}</h2>
                <div className="cardinfo">
                  <h3 className="andar">{courseData.period}</h3>
                  <h3 className="curso">{courseData.start}</h3>
                  <div className="imgcardone">
                    <img className="foto fotoone" alt="" />
                    <p className="horario" style={{ border: "none" }}>
                      {courseData.end}
                    </p>
                  </div>
                </div>
                <p className="nomeprof">{courseData.coordinator}</p>
              </div>
              <div className="back">
                <h2>{cardsBack[index].name}</h2>
                <div className="cardinfo">
                  <h3 className="andar">{cardsBack[index].period}</h3>
                  <h3 className="curso">{cardsBack[index].start}</h3>
                  <div className="imgcardone">
                    <img className="foto fotoone" alt="" />
                    <p className="horario" style={{ border: "none" }}>
                      {cardsBack[index].end}
                    </p>
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
        <p>{warningData[warningData.length - 1].message}</p>
        </div>
     
      <div className="avisoall">
        <div className="imgaviso">
          <img className="imghtml1" src={warningData[warningData.length - 1].imageName} alt="" />
          <h3 className="textAviso"></h3>
        </div>
        </div>

      </div>
      )}
    </div>
  </div>

  <div className="tamanhotwo">
    <div className="eventos">
      <h1>eventos</h1>
      {eventData && (
                <div>
                  <div className="titleEvento">
                    <p>{eventData.title}</p>
                  </div>
                  <div className="imgevento">
                    <img className="imghtml2" src={eventData.image_Uri} alt="" />
                    <h4 className="textEvent">{eventData.description}</h4>
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