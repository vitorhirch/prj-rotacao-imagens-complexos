import Header from "../../components/header/Index";
import "./styles.css";
import borboleta from "../../assets/borboleta.png";
import { IoImage } from "react-icons/io5";
import { GiAnticlockwiseRotation } from "react-icons/gi";
import { IoSparklesOutline } from "react-icons/io5";
import { IoCloudUploadOutline } from "react-icons/io5";
import { VscFolder } from "react-icons/vsc";
import { VscSync } from "react-icons/vsc";

function Home() {
  return (
    <div>
      <Header />
      <div className="container">
        <div>
          <h2> Rotação de imagem com números complexos</h2>
          <p>
            Nesse projeto utilizamos a multiplicação de números complexos para
            realizar a rotação de imagens em torno do seu centro, mostrando na
            prática como matemática e programação se conectam.
          </p>
        </div>
        <img className="imgBorboleta" src={borboleta} alt="Borboleta" />
      </div>
      <div className="principal">
        <div className="addImage">
          <div className="addImage-header">
            <IoImage className="icone-image" />
            <div>
              <h5>Adicione sua imagem</h5>
              <p>Arraste e solte a imagem aqui ou clique para selecionar.</p>
            </div>
          </div>
          <div className="addImageButton">
            <IoCloudUploadOutline className="upload" />
            <p>Arraste sua imagem aqui</p>
            <span>ou</span>
            <button type="button" className="uploadbutton">
              <VscFolder size={20} />
              Selecionar imagem
            </button>
            <small>Formatos aceitos: PNG, JPG, JPEG</small>
          </div>
        </div>
        <div className="rotateImage">
          <div className="rotateImage-header">
            <GiAnticlockwiseRotation className="icone-rotacao" />
            <h5>Ângulo de rotação</h5>
          </div>
          <div className="campo-angulo">
            <label htmlFor="angulo-desejado">Ângulo desejado (graus)</label>
            <input
              id="angulo-desejado"
              name="angulo"
              type="number"
              step="any"
              placeholder="Ex.: 45"
            />
          </div>
          <div className="controles-rotacao">
            <div className="angulos">
              <button type="button">45°</button>
              <button type="button">90°</button>
              <button type="button">180°</button>
              <button type="button">270°</button>
            </div>
            <button type="button" className="botao-rotacionar">
              <VscSync size={22} />
              Rotacionar imagem
            </button>
          </div>
        </div>
      </div>
      <div className="resultado">
        <div className="resultadoItem">
          <IoSparklesOutline className="sparkle" />
          <h5> Resultado da rotação</h5>
          <p> Após a rotação, sua imagem será exibida aqui.</p>
        </div>
        <div className="resultadoItem">
          <h5> Original </h5>{" "}
        </div>
        <div className="resultadoItem">
          {" "}
          <h5> Rotacionada </h5>{" "}
        </div>
      </div>
      <div className="informacoes">
        <div className="infoItem">
          <h5>Como funciona?</h5>
          <p>Entenda a matemática por trás da rotação.</p>
        </div>

        <div className="infoItem">
          <h5>Código Python</h5>
          <p>Veja o código completo e suas explicações.</p>
        </div>

        <div className="infoItem">
          <h5>Matemática</h5>
          <p>Explore os números complexos e o passo a passo do cálculo.</p>
        </div>
      </div>
    </div>
  );
}

export default Home;
