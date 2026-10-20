import Header from "../../components/header/Index";
import "./style.css";

function Matematica() {
  return (
    <div>
      <Header />

      <main className="container-matematica">
        <div className="page-title">
          <span className="page-tag">PRJ.4</span>
          <h2>Matemática da rotação</h2>

          <p className="page-description">
            Entenda como cada pixel da imagem é representado por um número
            complexo e como sua posição é modificada durante a rotação.
          </p>
        </div>

        <article className="page-content">
          {/* ETAPA 1 */}
          <section className="math-step">
            <div className="step-number">01</div>

            <div className="step-content">
              <h3>Representando um pixel</h3>

              <p>
                Cada pixel possui uma posição formada pelas coordenadas{" "}
                <strong>(x, y)</strong>. No algoritmo, essa posição pode ser
                representada por um número complexo:
              </p>

              <div className="formula">z = x + yi</div>

              <p>
                A parte real representa a posição horizontal <strong>x</strong>,
                enquanto a parte imaginária representa a posição vertical{" "}
                <strong>y</strong>.
              </p>

              <div className="code-example">
                <span className="code-label">Python</span>
                <code>z = complex(x, y)</code>
              </div>

              <p className="observation">
                Na matemática, a unidade imaginária é escrita como{" "}
                <strong>i</strong>. No Python, utiliza-se <strong>j</strong>.
              </p>
            </div>
          </section>

          {/* ETAPA 2 */}
          <section className="math-step">
            <div className="step-number">02</div>

            <div className="step-content">
              <h3>Convertendo o ângulo</h3>

              <p>
                O usuário informa o ângulo da rotação em graus pela interface.
                Entretanto, as funções <code>cos</code> e <code>sin</code> do
                Python trabalham com radianos.
              </p>

              <div className="formula">θ = (ângulo · π) / 180</div>

              <div className="code-example">
                <span className="code-label">Python</span>
                <code>theta = radians(angulo)</code>
              </div>
            </div>
          </section>

          {/* ETAPA 3 */}
          <section className="math-step">
            <div className="step-number">03</div>

            <div className="step-content">
              <h3>Criando o número de rotação</h3>

              <p>
                Com o ângulo convertido, construímos um segundo número complexo.
                Ele não representa um pixel: ele representa{" "}
                <strong>quanto o ponto será girado</strong>.
              </p>

              <div className="formula">r = cos(θ) + i sin(θ)</div>

              <div className="code-example code-multiline">
                <span className="code-label">Python</span>
                <code>
                  {`rotacao = complex(
    cos(theta),
    sin(theta)
)`}
                </code>
              </div>

              <p>
                Esse número possui módulo igual a 1. Por isso, ele altera a
                direção do ponto sem alterar sua distância em relação à origem.
              </p>
            </div>
          </section>

          {/* ETAPA 4 */}
          <section className="math-step destaque">
            <div className="step-number">04</div>

            <div className="step-content">
              <h3>Realizando a rotação</h3>

              <p>
                A rotação acontece quando multiplicamos o número complexo que
                representa o ponto pelo número complexo que representa o giro:
              </p>

              <div className="formula formula-principal">z′ = z · r</div>

              <div className="code-example">
                <span className="code-label">Python</span>
                <code>z_rotacionado = z * rotacao</code>
              </div>

              <p>
                O resultado continua sendo um número complexo. A parte real
                fornece a nova coordenada <strong>x</strong> e a parte
                imaginária fornece a nova coordenada <strong>y</strong>.
              </p>

              <div className="formula">
                x′ = x cos(θ) − y sin(θ)
                <br />
                y′ = x sin(θ) + y cos(θ)
              </div>
            </div>
          </section>

          {/* ETAPA 5 */}
          <section className="math-step">
            <div className="step-number">05</div>

            <div className="step-content">
              <h3>Rotacionando em torno do centro</h3>

              <p>
                A função anterior realiza a rotação em torno da origem{" "}
                <strong>(0, 0)</strong>. Porém, a imagem precisa girar em torno
                de seu próprio centro.
              </p>

              <p>
                Primeiro, transformamos a posição do pixel em uma coordenada
                relativa ao centro da imagem:
              </p>

              <div className="formula">
                x<sub>relativo</sub> = x − c<sub>x</sub>
                <br />y<sub>relativo</sub> = c<sub>y</sub> − y
              </div>

              <p>
                O centro é calculado a partir da largura e da altura da imagem:
              </p>

              <div className="formula">
                c<sub>x</sub> = (largura − 1) / 2
                <br />c<sub>y</sub> = (altura − 1) / 2
              </div>
              <div className="sequencia-diagramas">
                <div className="diagrama-centro">
                  <div className="eixo eixo-x"></div>
                  <div className="eixo eixo-y"></div>
                  <div className="guia guia-horizontal"></div>
                  <div className="guia guia-vertical"></div>

                  <div className="ponto-centro">
                    <span>Centro</span>
                  </div>

                  <div className="ponto-pixel">
                    <span>Pixel (x, y)</span>
                  </div>

                  <div className="linha-relativa"></div>

                  <div className="legenda-x-relativo">
                    x − c<sub>x</sub>
                  </div>

                  <div className="legenda-y-relativo">
                    c<sub>y</sub> − y
                  </div>
                </div>

                <div className="conector-diagramas">
                  <span>Coordenada relativa</span>
                  <strong>↓</strong>
                  <code>z = xrelativo + yrelativo·i</code>
                  <strong>↓</strong>
                  <span>Aplicamos a rotação complexa</span>
                </div>

                <div className="diagrama-rotacao">
                  <div className="eixo eixo-x"></div>
                  <div className="eixo eixo-y"></div>

                  <div className="ponto-centro">
                    <span>Centro</span>
                  </div>

                  <div className="vetor vetor-original"></div>
                  <div className="vetor vetor-rotacionado"></div>

                  <div className="ponto ponto-original"></div>

                  <div className="ponto ponto-rotacionado"></div>

                  <span className="label-ponto label-antes">Antes</span>

                  <span className="label-ponto label-depois">Depois</span>

                  <div className="indicador-angulo">θ</div>
                </div>
              </div>
            </div>
          </section>

          {/* ETAPA 6 */}
          <section className="math-step">
            <div className="step-number">06</div>

            <div className="step-content">
              <h3>Por que o eixo Y é invertido?</h3>

              <div className="axis-comparison">
                <div>
                  <span>Plano cartesiano</span>
                  <strong>Y cresce para cima ↑</strong>
                </div>

                <div>
                  <span>Imagem digital</span>
                  <strong>Y cresce para baixo ↓</strong>
                </div>
              </div>

              <p>
                Por causa dessa diferença, o algoritmo inverte o eixo vertical
                antes da rotação e faz a conversão inversa ao posicionar o pixel
                na imagem resultante.
              </p>

              <div className="formula">
                x<sub>novo</sub> = c<sub>x, novo</sub> + x′
                <br />y<sub>novo</sub> = c<sub>y, novo</sub> − y′
              </div>
            </div>
          </section>

          {/* ETAPA 7 */}
          <section className="math-step">
            <div className="step-number">07</div>

            <div className="step-content">
              <h3>Calculando o tamanho da nova imagem</h3>

              <p>
                Dependendo do ângulo escolhido, uma imagem rotacionada pode
                ocupar mais espaço do que a imagem original.
              </p>

              <p>
                Para evitar cortes, a função <code>calcular_novo_tamanho</code>{" "}
                rotaciona os quatro cantos da imagem e encontra os menores e
                maiores valores de <strong>x</strong> e <strong>y</strong>.
              </p>

              <div className="formula">
                nova largura = x<sub>máximo</sub> − x<sub>mínimo</sub>
                <br />
                nova altura = y<sub>máximo</sub> − y<sub>mínimo</sub>
              </div>
            </div>
          </section>

          {/* ETAPA 8 */}
          <section className="math-step">
            <div className="step-number">08</div>

            <div className="step-content">
              <p>
                Depois de calcular a nova posição dos pixels, existem duas
                formas de construir a imagem rotacionada: o{" "}
                <strong>mapeamento direto</strong> e o{" "}
                <strong>mapeamento inverso</strong>.
              </p>

              <div className="comparacao-mapeamentos">
                <div className="mapeamento-card">
                  <span className="mapeamento-tipo">Direto</span>

                  <div className="formula">origem → rotação → destino</div>

                  <p>
                    O algoritmo percorre cada pixel da imagem original e calcula
                    para qual posição ele deve ser enviado na imagem final.
                  </p>

                  <div className="fluxo-mapeamento">
                    <span>Pixel original</span>
                    <strong>→</strong>
                    <span>Calcula nova posição</span>
                    <strong>→</strong>
                    <span>Imagem final</span>
                  </div>

                  <div className="pixel-demo">
                    <div className="pixel-linha">
                      <span className="pixel preenchido"></span>
                      <span className="pixel preenchido"></span>
                      <span className="pixel vazio"></span>
                      <span className="pixel preenchido"></span>
                      <span className="pixel vazio"></span>
                    </div>

                    <span className="pixel-demo-legenda">
                      Alguns destinos podem ficar sem pixel.
                    </span>
                  </div>

                  <p className="observation">
                    Como as coordenadas calculadas precisam ser arredondadas,
                    alguns pixels podem cair na mesma posição e outros espaços
                    podem ficar sem preenchimento.
                  </p>
                </div>

                <div className="mapeamento-card">
                  <span className="mapeamento-tipo">Inverso</span>

                  <div className="formula">
                    destino → rotação inversa → origem
                  </div>

                  <p>
                    O algoritmo percorre cada posição da imagem final e calcula
                    de qual pixel da imagem original deve buscar a cor.
                  </p>

                  <div className="fluxo-mapeamento">
                    <span>Imagem final</span>
                    <strong>→</strong>
                    <span>Busca posição original</span>
                    <strong>→</strong>
                    <span>Copia o pixel</span>
                  </div>

                  <div className="pixel-demo">
                    <div className="pixel-linha">
                      <span className="pixel preenchido"></span>
                      <span className="pixel preenchido"></span>
                      <span className="pixel preenchido"></span>
                      <span className="pixel preenchido"></span>
                      <span className="pixel preenchido"></span>
                    </div>

                    <span className="pixel-demo-legenda">
                      Cada posição final procura uma origem.
                    </span>
                  </div>

                  <div className="code-example">
                    <code>-angulo</code>
                  </div>

                  <p className="observation">
                    Esse método reduz os espaços vazios porque cada posição da
                    imagem final tenta buscar um pixel correspondente na imagem
                    original.
                  </p>
                </div>
              </div>
            </div>
          </section>
        </article>
      </main>
    </div>
  );
}

export default Matematica;
