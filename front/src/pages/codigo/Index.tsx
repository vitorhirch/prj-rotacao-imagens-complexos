import "./style.css";
import codigoPython from "../../../../rotacao.py?raw";
import Header from "../../components/header/Index";
import { AiOutlinePython } from "react-icons/ai";

function Codigo() {
  return (
    <div>
      <Header />
      <div className="container-codigo">
        <div className="page-title">
          <AiOutlinePython className="python-icon" />
          <h2> Código do projeto</h2>
        </div>
        <div className="page-content">
          <p>
            Aqui segue o código python do projeto. Para conhecer o projeto na
            íntegra acesse o repositório no GitHub.
          </p>
          <div className="codigo-completo">
            <pre className="codigo-python">
              <code>{codigoPython}</code>
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Codigo;
