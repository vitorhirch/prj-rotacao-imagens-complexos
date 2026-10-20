from math import cos, sin, radians
from PIL import Image


def rotacionar_ponto(x, y, angulo):
    """
    Rotaciona um ponto (x, y) em torno da origem (0, 0)
    utilizando números complexos.

    Parâmetros:
        x: coordenada horizontal do ponto.
        y: coordenada vertical do ponto.
        angulo: ângulo de rotação em graus.

    Retorno:
        Tupla com as novas coordenadas (x, y).
    """

    # Representa o ponto como número complexo:
    # z = x + yi
    z = complex(x, y)

    # Converte o ângulo de graus para radianos.
    theta = radians(angulo)

    # Cria o número complexo que representa a rotação:
    # cos(theta) + i * sin(theta)
    rotacao = complex(
        cos(theta),
        sin(theta)
    )

    # Multiplica o ponto pelo número complexo de rotação.
    z_rotacionado = z * rotacao

    # A parte real representa o novo x.
    # A parte imaginária representa o novo y.
    return z_rotacionado.real, z_rotacionado.imag



def rotacionar_em_torno_do_centro(
    x,
    y,
    centro_x,
    centro_y,
    novo_centro_x,
    novo_centro_y,
    angulo
):
    """
    Rotaciona uma coordenada da imagem em torno de seu centro.
    """

    # Move o centro da imagem para a origem do plano cartesiano.
    x_relativo = x - centro_x

    # Em imagens, o eixo Y cresce para baixo.
    # Aqui fazemos a conversão para o plano cartesiano,
    # onde Y cresce para cima.
    y_relativo = centro_y - y

    # Rotaciona o ponto relativo ao centro.
    novo_x_relativo, novo_y_relativo = rotacionar_ponto(
        x_relativo,
        y_relativo,
        angulo
    )

    # Move a coordenada novamente para o centro
    # da imagem de saída.
    novo_x = novo_centro_x + novo_x_relativo
    novo_y = novo_centro_y - novo_y_relativo

    return novo_x, novo_y

def calcular_novo_tamanho(largura, altura, angulo):
    """
    Calcula o tamanho necessário da imagem resultante
    para evitar cortes após a rotação.
    """

    centro_x = (largura - 1) / 2
    centro_y = (altura - 1) / 2

    # Coordenadas dos quatro cantos da imagem.
    cantos = [
        (0, 0),
        (largura - 1, 0),
        (0, altura - 1),
        (largura - 1, altura - 1)
    ]

    coordenadas_x = []
    coordenadas_y = []

    for x, y in cantos:

        # Converte o canto para uma posição relativa ao centro.
        x_relativo = x - centro_x
        y_relativo = centro_y - y

        # Rotaciona o canto.
        x_rotacionado, y_rotacionado = rotacionar_ponto(
            x_relativo,
            y_relativo,
            angulo
        )

        coordenadas_x.append(x_rotacionado)
        coordenadas_y.append(y_rotacionado)

    # A diferença entre o maior e o menor valor
    # determina o espaço necessário.
    nova_largura = round(
        max(coordenadas_x) - min(coordenadas_x)
    ) + 1

    nova_altura = round(
        max(coordenadas_y) - min(coordenadas_y)
    ) + 1

    return nova_largura, nova_altura

def rotacionar_imagem_direto(imagem,angulo):
    """
    Cria e retorna uma nova imagem rotaciona
    utilizando mapeamento direto.
    
    O algoritmo percorre os pixels da imagem original,
    calcula para onde cada pixel deve ir e transfere
    sua cor para a imagem resultante.
    """

    # Converte a imagem para RGBA.
    imagem = imagem.convert("RGBA")

    largura, altura = imagem.size

    # Centro da imagem original.
    centro_x = (largura -1)/2
    centro_y = (altura -1)/2

    #Calcula o tamanho necessário da imagem resultante.
    nova_largura, nova_altura = calcular_novo_tamanho(
        largura, 
        altura,
        angulo
    )

    novo_centro_x = (nova_largura -1)/2
    novo_centro_y = (nova_altura -1)/2

    # Cria uma nova imagem transparente.
    nova_imagem = Image.new(
        "RGBA",
        (nova_largura, nova_altura),
        (255, 255, 255, 0)
    )

    # Percorre todos os pixels da imagem Original.
    for y in range (altura):
        for x in range(largura):

            #Pega a cor do pixel original.
            pixel = imagem.getpixel((x,y))

            #Calcula para onde esse pixel deve ir.
            novo_x, novo_y = rotacionar_em_torno_do_centro(
                x,
                y,
                centro_x,
                centro_y,
                novo_centro_x,
                novo_centro_y,
                angulo
            )

            # Pixels precisam ocupar posições inteiras
            novo_x = round(novo_x)
            novo_y = round(novo_y)

            # Só escreve se estiver dentro da imagem final.
            if (
                0 <= novo_x < nova_largura
                and 0 <= novo_y < nova_altura
            ): 
                nova_imagem.putpixel(
                    (novo_x, novo_y),
                    pixel
                )
    return nova_imagem

                
def rotacionar_imagem_inverso(imagem, angulo):
    """
    Cria e retorna uma nova imagem rotacionada.
    utilizando mapeamento inverso.
    O algoritmo utiliza mapeamento inverso:
    percorre cada posição da imagem resultante e calcula
    qual posição correspondente deve ser buscada.
    na imagem original.
    """

    # Padroniza a imagem para trabalhar com transparência.
    imagem = imagem.convert("RGBA")

    largura, altura = imagem.size

    # Centro da imagem original.
    centro_x = (largura - 1) / 2
    centro_y = (altura - 1) / 2

    # Descobre o tamanho necessário da imagem resultante.
    nova_largura, nova_altura = calcular_novo_tamanho(
        largura,
        altura,
        angulo
    )
    
    # Centro da imagem resultante.
    novo_centro_x = (nova_largura - 1) / 2
    novo_centro_y = (nova_altura - 1) / 2

    # Cria uma nova imagem transparente.
    nova_imagem = Image.new(
        "RGBA",
        (nova_largura, nova_altura),
        (255, 255, 255, 0)
    )

    # Percorre cada linha da imagem nova.
    for novo_y in range(nova_altura):

        # Percorre cada pixel da linha.
        for novo_x in range(nova_largura):

            # Descobre de qual posição original
            # veio cada pixel da imagem final.
            x_original, y_original = rotacionar_em_torno_do_centro(
                novo_x,
                novo_y,
                novo_centro_x,
                novo_centro_y,
                centro_x,
                centro_y,
                -angulo
            )

            # A rotação pode gerar posições decimais.
            # Como pixels ocupam coordenadas inteiras, arredondamos.
            x_original = round(x_original)
            y_original = round(y_original)

            # Só buscamos o pixel caso a posição encontrada
            # exista dentro da imagem original.
            if (
                0 <= x_original < largura
                and 0 <= y_original < altura
            ):
                pixel = imagem.getpixel(
                    (x_original, y_original)
                )

                # A posição atual da imagem de destino
                # recebe a cor encontrada na imagem original.
                nova_imagem.putpixel(
                    (novo_x, novo_y),
                    pixel
                )

    return nova_imagem

def rotacionar_imagem(imagem, angulo, metodo="inverso"):
    """
    Escolhe o método utilizado para realizar a rotação.
    Métodos disponíveis:
        "direto"
        "inverso"
    """

    if metodo == "direto":
        return rotacionar_imagem_direto(
            imagem,
            angulo
        )
    if metodo == "inverso":
        return rotacionar_imagem_inverso(
            imagem,
            angulo
        )

    raise ValueError(
        "Método inválido. Utilize 'direto' ou 'inverso'."
    )



# Este exemplo abaixo apenas roda quando executamos: python rotacao.py
if __name__ == "__main__":
    print("Projeto de rotação iniciado")

    imagem = Image.open("esboco.png")

    angulo = 45

    resultado_direto = rotacionar_imagem(
        imagem,
        angulo,
        "direto"
    )

    resultado_inverso = rotacionar_imagem(
        imagem,
        angulo,
        "inverso"
    )

    resultado_direto.save(
        "rotacao_direta.png",
        format="PNG"
    )

    resultado_inverso.save(
        "rotacao_inversa.png",
        format="PNG"
    )

    print("Imagens geradas com sucesso")