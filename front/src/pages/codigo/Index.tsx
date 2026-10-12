import "./style.css";
import codigoPython from "../../../../rotacao.py?raw";
import Header from "../../components/header/Index";
import { AiOutlinePython } from "react-icons/ai";

function Codigo() {
  return (
    <div>
      <Header />

      <main className="container-codigo">
        <div className="page-title">
          <AiOutlinePython className="python-icon" />

          <div>
            <span className="page-tag">Implementação</span>
            <h2>Código do projeto</h2>

            <p>
              Entenda como a lógica matemática foi transformada em código Python
              para realizar a rotação da imagem.
            </p>
          </div>
        </div>

        <div className="page-content">
          {/* ETAPA 1 */}
          <section className="codigo-step">
            <div className="step-number">01</div>

            <div className="step-content">
              <h3>Rotacionando um ponto</h3>

              <p>
                A função <code>rotacionar_ponto</code> recebe uma coordenada
                <strong> (x, y)</strong> e um ângulo.
              </p>

              <p>
                Primeiro, as coordenadas são transformadas em um número
                complexo.
              </p>

              <div className="code-example">
                <code>{`z = complex(x, y)`}</code>
              </div>

              <p>
                Depois, o ângulo é convertido para radianos e usado para criar o
                número complexo que representa a rotação.
              </p>

              <div className="code-example">
                <code>
                  {`theta = radians(angulo)

rotacao = complex(
    cos(theta),
    sin(theta)
)`}
                </code>
              </div>

              <p>
                A multiplicação dos dois números complexos produz a nova posição
                do ponto.
              </p>

              <div className="code-example destaque-codigo">
                <code>{`z_rotacionado = z * rotacao`}</code>
              </div>

              <p>
                Por fim, a cor encontrada na imagem original é colocada na
                posição
                <code> (novo_x, novo_y)</code> que estamos percorrendo na imagem
                resultante.
              </p>

              <div className="code-example">
                <code>
                  {`return (
    z_rotacionado.real,
    z_rotacionado.imag
)`}
                </code>
              </div>
            </div>
          </section>

          {/* ETAPA 2 */}
          <section className="codigo-step">
            <div className="step-number">02</div>

            <div className="step-content">
              <h3>Rotacionando em torno do centro</h3>

              <p>
                A função anterior realiza a rotação em torno da origem
                <strong> (0, 0)</strong>.
              </p>

              <p>
                Para rotacionar uma imagem corretamente, precisamos transformar
                a posição de cada pixel em uma coordenada relativa ao centro da
                imagem.
              </p>

              <div className="code-example">
                <code>
                  {`x_relativo = x - centro_x
y_relativo = centro_y - y`}
                </code>
              </div>

              <p>
                Depois disso, reutilizamos a função{" "}
                <code>rotacionar_ponto</code>.
              </p>

              <div className="code-example">
                <code>
                  {`novo_x_relativo, novo_y_relativo = rotacionar_ponto(
    x_relativo,
    y_relativo,
    angulo
)`}
                </code>
              </div>

              <p>
                Por fim, as coordenadas são reposicionadas em relação ao centro
                da imagem resultante.
              </p>
            </div>
          </section>

          {/* ETAPA 3 */}
          <section className="codigo-step">
            <div className="step-number">03</div>

            <div className="step-content">
              <h3>Calculando o novo tamanho</h3>

              <p>
                Uma imagem rotacionada pode ocupar mais espaço do que a imagem
                original.
              </p>

              <p>
                Por isso, a função <code>calcular_novo_tamanho</code> analisa os
                quatro cantos da imagem.
              </p>

              <div className="code-example">
                <code>
                  {`cantos = [
    (0, 0),
    (largura - 1, 0),
    (0, altura - 1),
    (largura - 1, altura - 1)
]`}
                </code>
              </div>

              <p>
                Cada canto é rotacionado e suas novas coordenadas são
                armazenadas.
              </p>

              <div className="code-example">
                <code>
                  {`coordenadas_x.append(x_rotacionado)
coordenadas_y.append(y_rotacionado)`}
                </code>
              </div>

              <p>
                A diferença entre os maiores e menores valores determina o
                tamanho necessário da imagem de saída.
              </p>

              <div className="code-example">
                <code>
                  {`nova_largura = round(
    max(coordenadas_x) - min(coordenadas_x)
) + 1

nova_altura = round(
    max(coordenadas_y) - min(coordenadas_y)
) + 1`}
                </code>
              </div>
            </div>
          </section>

          {/* ETAPA 4 */}
          <section className="codigo-step">
            <div className="step-number">04</div>

            <div className="step-content">
              <h3>Processando a imagem</h3>

              <p>
                A função <code>rotacionar_imagem</code> reúne todas as etapas
                anteriores.
              </p>

              <p>Primeiro, ela descobre as dimensões e o centro da imagem.</p>

              <div className="code-example">
                <code>
                  {`largura, altura = imagem.size

centro_x = (largura - 1) / 2
centro_y = (altura - 1) / 2`}
                </code>
              </div>

              <p>
                Depois, cria uma nova imagem transparente que será preenchida
                posição por posição durante o mapeamento inverso.
              </p>

              <div className="code-example">
                <code>
                  {`nova_imagem = Image.new(
    "RGBA",
    (nova_largura, nova_altura),
    (255, 255, 255, 0)
)`}
                </code>
              </div>
            </div>
          </section>

          {/* ETAPA 5 */}
          <section className="codigo-step">
            <div className="step-number">05</div>

            <div className="step-content">
              <h3>Mapeamento inverso dos pixels</h3>

              <p>
                Dois laços <code>for</code> percorrem todas as posições da
                imagem resultante.
              </p>

              <div className="code-example">
                <code>
                  {`for novo_y in range(nova_altura):
                     for novo_x in range(nova_largura):`}
                </code>
              </div>

              <p>
                Para cada posição da imagem final, o programa calcula qual
                posição correspondente deve ser buscada na imagem original.
              </p>

              <div className="code-example">
                <code>
                  {`x_original, y_original = rotacionar_em_torno_do_centro(
    novo_x,
    novo_y,
    novo_centro_x,
    novo_centro_y,
    centro_x,
    centro_y,
    -angulo
)`}
                </code>
              </div>

              <p>
                O sinal negativo indica que estamos realizando o caminho inverso
                da rotação: partimos da imagem final para localizar o pixel
                correspondente na imagem original.
              </p>

              <p>
                A posição encontrada pode possuir valores decimais. Como os
                pixels ocupam posições inteiras, as coordenadas da imagem
                original são arredondadas.
              </p>

              <div className="code-example">
                <code>
                  {`x_original = round(x_original)
y_original = round(y_original)`}
                </code>
              </div>

              <p>
                Depois, verificamos se essa posição realmente existe dentro dos
                limites da imagem original.
              </p>

              <div className="code-example">
                <code>
                  {`if (
    0 <= x_original < largura
    and 0 <= y_original < altura
):`}
                </code>
              </div>

              <p>
                Se a posição for válida, buscamos a cor daquele pixel na imagem
                original.
              </p>

              <div className="code-example">
                <code>
                  {`pixel = imagem.getpixel(
    (x_original, y_original)
)`}
                </code>
              </div>

              <p>
                Por fim, essa cor é colocada diretamente na posição que estamos
                percorrendo na imagem resultante.
              </p>

              <div className="code-example destaque-codigo">
                <code>
                  {`nova_imagem.putpixel(
    (novo_x, novo_y),
    pixel
)`}
                </code>
              </div>
            </div>
          </section>

          {/* FLUXO */}
          <section className="codigo-step fluxo-step">
            <div className="step-number">06</div>

            <div className="step-content">
              <h3>Fluxo completo</h3>

              <div className="codigo-flow">
                <span>Pixel da imagem final</span>
                <b>→</b>

                <span>Coordenada relativa ao centro</span>
                <b>→</b>

                <span>Rotação inversa (-θ)</span>
                <b>→</b>

                <span>Posição na imagem original</span>
                <b>→</b>

                <span>Cor do pixel</span>
                <b>→</b>

                <span>Imagem final</span>
              </div>
            </div>
          </section>

          {/* CÓDIGO COMPLETO */}
          <section className="codigo-completo">
            <div className="codigo-completo-header">
              <div>
                <span className="page-tag">Arquivo completo</span>
                <h3>rotacao.py</h3>
              </div>

              <AiOutlinePython className="python-icon-small" />
            </div>

            <pre className="codigo-python">
              <code>{codigoPython}</code>
            </pre>
          </section>
        </div>
      </main>
    </div>
  );
}

export default Codigo;
