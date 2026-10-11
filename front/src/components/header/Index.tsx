import "./style.css";
import { VscGithub } from "react-icons/vsc";
import { Link } from "react-router-dom";

function Header() {
  return (
    <header className="header">
      <Link className="headerTitle" to="/">
        Início
      </Link>
      <Link className="headerTitle" to="/matematica">
        Matemática
      </Link>
      <Link className="headerTitle" to="/codigo">
        Código
      </Link>
      <a
        href="https://github.com/vitorhirch/prj-rotacao-imagens-complexos.git"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Abrir o projeto no GitHub"
      >
        <VscGithub className="icone-github" />
      </a>
    </header>
  );
}

export default Header;
