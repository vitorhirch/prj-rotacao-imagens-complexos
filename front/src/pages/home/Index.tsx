import { useEffect, useRef, useState } from "react";
import Header from "../../components/header/Index";
import "./styles.css";
import borboleta from "../../assets/borboleta.png";
import { IoImage } from "react-icons/io5";
import { GiAnticlockwiseRotation } from "react-icons/gi";
import { IoSparklesOutline } from "react-icons/io5";
import { IoCloudUploadOutline } from "react-icons/io5";
import { VscFolder } from "react-icons/vsc";
import { VscSync } from "react-icons/vsc";
import { IoIosImages } from "react-icons/io";

function Home() {
  const inputImagem = useRef<HTMLInputElement>(null);
  const [arquivoImagem, setArquivoImagem] = useState<File | null>(null);
  const [imagemOriginal, setImagemOriginal] = useState("");
  const [erroImagem, setErroImagem] = useState("");
  const [angulo, setAngulo] = useState("");
  const [imagemRotacionada, setImagemRotacionada] = useState("");
  const [erroRotacao, setErroRotacao] = useState("");
  const [rotacionando, setRotacionando] = useState(false);
  const requisicaoRotacao = useRef<AbortController | null>(null);

  useEffect(() => {
    return () => {
      if (imagemRotacionada) URL.revokeObjectURL(imagemRotacionada);
    };
  }, [imagemRotacionada]);

  useEffect(() => () => requisicaoRotacao.current?.abort(), []);

  useEffect(() => {
    return () => {
      if (imagemOriginal) URL.revokeObjectURL(imagemOriginal);
    };
  }, [imagemOriginal]);

  function selecionarImagem(arquivo?: File) {
    if (!arquivo) return;
    if (!["image/png", "image/jpeg"].includes(arquivo.type)) {
      setErroImagem("Selecione uma imagem PNG ou JPG/JPEG.");
      return;
    }
    setErroImagem("");
    requisicaoRotacao.current?.abort();
    requisicaoRotacao.current = null;
    setRotacionando(false);
    setImagemRotacionada("");
    setErroRotacao("");
    setArquivoImagem(arquivo);
    setImagemOriginal(URL.createObjectURL(arquivo));
  }

  async function rotacionarImagem() {
    if (!arquivoImagem) {
      setErroRotacao("Selecione uma imagem antes de rotacionar.");
      return;
    }
    if (angulo.trim() === "" || !Number.isFinite(Number(angulo))) {
      setErroRotacao("Informe um ângulo válido em graus.");
      return;
    }

    requisicaoRotacao.current?.abort();
    const controller = new AbortController();
    requisicaoRotacao.current = controller;
    setRotacionando(true);
    setErroRotacao("");
    setImagemRotacionada("");

    const dados = new FormData();
    dados.append("imagem", arquivoImagem);
    dados.append("angulo", angulo);

    try {
      const resposta = await fetch("/api/rotacionar", {
        method: "POST",
        body: dados,
        signal: controller.signal,
      });
      if (!resposta.ok) {
        const erro = await resposta.json().catch(() => null);
        throw new Error(erro?.erro || "Não foi possível rotacionar. Verifique se o backend está rodando.");
      }
      if (!resposta.headers.get("content-type")?.includes("image/png")) {
        throw new Error("O servidor não retornou uma imagem PNG.");
      }
      const imagem = await resposta.blob();
      if (!controller.signal.aborted) setImagemRotacionada(URL.createObjectURL(imagem));
    } catch (erro) {
      if (!controller.signal.aborted) {
        setErroRotacao(erro instanceof TypeError
          ? "Não foi possível conectar ao backend Python."
          : erro instanceof Error ? erro.message : "Erro ao rotacionar a imagem.");
      }
    } finally {
      if (requisicaoRotacao.current === controller) {
        requisicaoRotacao.current = null;
        setRotacionando(false);
      }
    }
  }

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
          <div
            className="addImageButton"
            onDragOver={(event) => event.preventDefault()}
            onDrop={(event) => {
              event.preventDefault();
              selecionarImagem(event.dataTransfer.files[0]);
            }}
          >
            <input
              ref={inputImagem}
              type="file"
              accept="image/png,image/jpeg"
              aria-label="Selecionar imagem original"
              hidden
              onChange={(event) => {
                selecionarImagem(event.target.files?.[0]);
                event.target.value = "";
              }}
            />
            <IoCloudUploadOutline className="upload" />
            <p>Arraste sua imagem aqui</p>
            <span>ou</span>
            <button
              type="button"
              className="uploadbutton"
              onClick={() => inputImagem.current?.click()}
            >
              <VscFolder size={20} />
              Selecionar imagem
            </button>
            <small>Formatos aceitos: PNG, JPG, JPEG</small>
            {erroImagem && <p role="alert">{erroImagem}</p>}
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
              value={angulo}
              onChange={(event) => setAngulo(event.target.value)}
              disabled={rotacionando}
            />
          </div>
          <div className="controles-rotacao">
            <div className="angulos">
              {[45, 90, 180, 270].map((valor) => (
                <button type="button" key={valor} disabled={rotacionando}
                  aria-pressed={angulo !== "" && Number(angulo) === valor}
                  onClick={() => setAngulo(String(valor))}>
                  {valor}°
                </button>
              ))}
            </div>
            <button type="button" className="botao-rotacionar"
              onClick={rotacionarImagem} disabled={rotacionando || !arquivoImagem}>
              <VscSync size={22} />
              {rotacionando ? "Rotacionando…" : "Rotacionar imagem"}
            </button>
          </div>
          {erroRotacao && <p role="alert">{erroRotacao}</p>}
        </div>
      </div>
      <div className="resultado">
        <div className="resultadoItem">
          <div className="resultadoItem-header">
            <IoSparklesOutline className="sparkle" />
            <h5>Resultado da rotação</h5>
          </div>
          <p role="status">{rotacionando ? "Processando a imagem…" : imagemRotacionada ? "Rotação concluída. Compare as imagens abaixo." : "Após a rotação, sua imagem será exibida aqui."}</p>
        </div>
        <div className="resultadoItem">
          <div className="resultadoItem-header">
            <IoCloudUploadOutline className="resultadoItemImg" />
            <h5>Original</h5>
          </div>
          <div className="imagem-preview">
            {imagemOriginal ? (
              <img
                src={imagemOriginal}
                alt={arquivoImagem?.name || "Imagem original"}
              />
            ) : (
              <p>Selecione uma imagem para visualizar aqui.</p>
            )}
          </div>
        </div>
        <div className="resultadoItem">
          <div className="resultadoItem-header">
            <IoIosImages className="resultadoItemImg" />
            <h5>Rotacionada</h5>
          </div>
          <div className="imagem-preview">
            {imagemRotacionada ? (
              <img src={imagemRotacionada} alt="Imagem rotacionada" />
            ) : (
              <p>{rotacionando ? "Processando a imagem…" : "A imagem rotacionada será exibida aqui."}</p>
            )}
          </div>
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
