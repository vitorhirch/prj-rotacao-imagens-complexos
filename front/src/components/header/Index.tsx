import "./style.css";
import { VscGithub } from "react-icons/vsc";

function Header() {
  return (
    <header className="header">
      <h3 className="headerTitle"> Início</h3>
      <h3 className="headerTitle"> Matemática </h3>
      <h3 className="headerTitle"> Código </h3>
      <VscGithub className="icone-github" />
    </header>
  );
}

export default Header;
