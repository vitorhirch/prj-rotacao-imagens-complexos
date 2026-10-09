import "./style.css";
import { VscGithub } from "react-icons/vsc";
import { Link } from "react-router-dom";

function Header() {
  return (
    <header className="header">
      <Link className="headerTitle" to="/">
        Início
      </Link>
      <h3 className="headerTitle"> Matemática </h3>
      <Link className="headerTitle" to="/codigo">
        Código
      </Link>
      <VscGithub className="icone-github" />
    </header>
  );
}

export default Header;
