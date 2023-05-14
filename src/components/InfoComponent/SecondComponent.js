import React, { useEffect, useState } from "react";
import axios from "axios"
import logo from './assets/logo.png';
import foto_professor from './assets/foto_professor.png';
import fundo from './assets/fundopreto.jpg';
import './style2.css';
const url = "http://localhost:3000/products"
const url2 = "http://localhost:3000/mensagens"

const SecondComponent = () => {
  const [visibleIndex, setVisibleIndex] = useState(0);

  const [products, setProducts] = useState([])

  //resgatando dados para cards
  useEffect(() => {
    axios.get(url)
      .then(response => setProducts(response.data))
      
      .catch(error => console.error(error));
  }, [])

  const [mensagens, setMensagens] = useState([]);


  //resgatando dados para eventos e avisos
  useEffect(() => {
    axios.get(url2)
      .then(response => setMensagens(response.data))
      .catch(error => console.error(error));
  }, [])

  const [isFlipped, setIsFlipped] = useState(false);


  const cardsFront = products.slice(0, 6);
  const cardsBack = products.slice(6, 12);

  const text = [
    {
      avisoAnimation: "as provas começarão em dezembro",
      eventoAnimation: "maratona de programação",
      textEvent: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Distinctio suscipit quia porro beatae, quidem quasi fugiat enim ipsum consequatur repellat eius nobis, dicta totam vero optio inventore consequuntur, sequi dolor!",
      textEventTwo: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Distinctio suscipit quia porro beatae, quidem quasi fugiat enim ipsum consequatur repellat eius nobis, dicta totam vero optio inventore consequuntur, sequi dolor!",
    }

  ]



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
          {cardsFront.slice(visibleIndex, visibleIndex + 6).map((product, index) => (
            <div className={`card card${index + 1} ${isFlipped ? "flipped" : ""}`} key={index}>
              <div className="front">
                <h2>{product.title}</h2>
                <div className="cardinfo">
                  <h3 className="andar">{product.andar}</h3>
                  <h3 className="curso">{product.curso}</h3>
                  <div className="imgcardone">
                    <img className="foto fotoone" src={product.img} alt="" />
                    <p className="horario" style={{ border: "none" }}>
                      {product.horario}
                    </p>
                  </div>
                </div>
                <p className="nomeprof">{product.professor}</p>
              </div>
              <div className="back">
                <h2>{cardsBack[index].title}</h2>
                <div className="cardinfo">
                  <h3 className="andar">{cardsBack[index].andar}</h3>
                  <h3 className="curso">{cardsBack[index].curso}</h3>
                  <div className="imgcardone">
                    <img className="foto fotoone" src={cardsBack[index].img} alt="" />
                    <p className="horario" style={{ border: "none" }}>
                      {cardsBack[index].horario}
                    </p>
                  </div>
                </div>
                <p className="nomeprof">{cardsBack[index].professor}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="eventandavisos">
  <div className="tamanho">
    <div className="avisos">
      <h1>avisos</h1>
      {mensagens.map((mensagem, index) => (
        <div className="texto-aviso" key={index}>
          <p>{mensagem.titleAviso}</p>
        </div>
      ))}
      <div className="avisoall">
        <div className="imgaviso">
          <img className="imghtml1" src={fundo} alt="" />
        </div>

        <div className="imgavisoTwo">
          <img className="imghtml1_1" src={fundo} alt="" />
        </div>

      </div>
    </div>
  </div>

  <div className="tamanhotwo">
    <div className="eventos">
      <h1>eventos</h1>
      {mensagens.map((mensagem, index) => (
        <div className="texto-evento" key={index}>
          <p>{mensagem.titleEvent}</p>
        </div>
      ))}

      <div className="imgevento">
        <img className="imghtml2" src={fundo} alt="" />
        <h4 className="textEvent"></h4>
      </div>

      <div className="imgeventoTwo">
        <img className="imghtml3" src={fundo} alt="" />
        <h4 className="textEventTwo"></h4>
      </div>
    </div>
  </div>
</div>  
      </div>

    </>
  )
}

export default SecondComponent;