import Header from "../../components/header/Index";
import "./style.css";

function Matematica() {
  return (
    <div>
      <Header />
      <div className="container-matematica">
        <div className="page-title">
          <h2>Matemática</h2>
        </div>
        <article className="page-content">
          <p>A rotação da imagem no arquivo <code>rotacao.py</code> usa <strong>números complexos e trigonometria</strong> para calcular uma nova posição para cada pixel, mantendo sua cor.</p>
          <p>Cada pixel tem uma posição (x, y), representada no código pelo número complexo:</p>
          <div className="formula">z = x + yi</div>
          <p>A parte real representa a coordenada horizontal, e a parte imaginária representa a coordenada vertical. Na matemática, usamos <i>i</i> para a unidade imaginária; no Python, ela é representada por <code>j</code>.</p>
          <p>Para girar esse ponto, a função <code>rotacionar_ponto</code> converte o ângulo de graus para radianos:</p>
          <div className="formula">θ = (ângulo · π) / 180</div>
          <p>Essa conversão é necessária porque as funções <code>cos</code> e <code>sin</code> recebem ângulos em radianos. Em seguida, o código constrói o número complexo:</p>
          <div className="formula">r = cos(θ) + i sin(θ)</div>
          <p>Esse número tem módulo igual a 1, pois cos<sup>2</sup>(θ) + sin<sup>2</sup>(θ) = 1. Por isso, multiplicar um ponto por ele altera sua direção, preservando sua distância até a origem. A rotação acontece na operação:</p>
          <div className="formula">z′ = z · r</div>
          <p>Desenvolvendo a multiplicação e usando i<sup>2</sup> = −1, obtemos:</p>
          <div className="formula">x′ = x cos(θ) − y sin(θ)<br />y′ = x sin(θ) + y cos(θ)</div>
          <p>Essas fórmulas calculam as coordenadas do ponto após a rotação. Por exemplo, ao girar o ponto (1, 0) em 90°, o resultado é (0, 1).</p>
          <p>A função anterior gira os pontos ao redor da origem (0, 0). Para que a imagem gire ao redor de seu próprio centro, <code>rotacionar_em_torno_do_centro</code> primeiro transforma as coordenadas dos pixels em posições relativas ao centro:</p>
          <div className="formula">x<sub>relativo</sub> = x − c<sub>x</sub><br />y<sub>relativo</sub> = c<sub>y</sub> − y</div>
          <p>A inversão na coordenada vertical é necessária porque, em uma imagem, o eixo y cresce para baixo, enquanto no plano cartesiano ele cresce para cima. O centro é calculado por:</p>
          <div className="formula">c<sub>x</sub> = (largura − 1) / 2<br />c<sub>y</sub> = (altura − 1) / 2</div>
          <p>O código subtrai 1 porque os índices dos pixels começam em zero. Depois de aplicar a rotação, ele posiciona o ponto em relação ao centro da nova imagem:</p>
          <div className="formula">x<sub>novo</sub> = c<sub>x, novo</sub> + x′<sub>relativo</sub><br />y<sub>novo</sub> = c<sub>y, novo</sub> − y′<sub>relativo</sub></div>
          <p>Como uma imagem girada pode ocupar mais espaço, <code>calcular_novo_tamanho</code> também rotaciona seus quatro cantos. As diferenças entre as maiores e as menores coordenadas horizontais e verticais determinam as dimensões da imagem de saída.</p>
          <p>Por fim, o programa percorre todos os pixels, calcula suas novas posições e arredonda as coordenadas, pois os pixels ocupam posições inteiras. Assim, a imagem é girada em <strong>66° no sentido anti-horário</strong>, conforme o ângulo definido no arquivo. Esse arredondamento e o envio direto dos pixels para a imagem de saída podem deixar pequenos espaços vazios ou fazer pixels diferentes ocupar a mesma posição.</p>
        </article>
      </div>
    </div>
  );
}

export default Matematica;
