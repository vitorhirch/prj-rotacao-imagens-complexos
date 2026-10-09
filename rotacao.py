from math import cos, sin, radians
from PIL import Image

print("Projeto de rotacao iniciado")

def rotacionar_ponto(x,y, angulo):

#transfora a posição (x,y) em um número complexo
    z = complex(x,y)

#converta o ângulo informado em graus para radianos.
    theta = radians(angulo)

#crie um número complexo de módulo 1 apontando na direção do ângulo desejado.
    rotacao = complex( 
    cos(theta),
    sin(theta)

)

#gire o ponto através da multiplicação dos números complexos
    z_rotacionado = z*rotacao

    return z_rotacionado.real, z_rotacionado.imag 

#Explicação da função acima, temos uma função que recebe três informações x,y e angulo certo?
# Então ela pega x e y e coloca em uma variavel z que transforma esses números em números complexos
# assim z vale (x, yj) sendo j o simbolo que usamos para representar o complexo
# o ângulo também precisa de uma conversão, por isso ele  vira  radiano, chamamos ele de theta e passamos ele pro cos e sin (cosesno e seno?)
# mas para isso aplicamos o numero complexo no angulo e isso cria um novo numero complexo, que vai pegar cos (theta), sin (theta) -> igual fizemos com o x, y e transformar ele em:
#cos(theta), sen(theta)j?  só que enão não representa o ponto e sim o quanto queremos rotacionar
# dai para rotacionar o ponto criamos o z_rotacionado, que é o ponto z * a rotação, ou seja (x,yj)* (angulo convertido em cossenoe  seno)

# o retorno transforma o numero complexo em coordenada novamente criando um novo x e novo y que é aquele x e y que foi rotacionado em numero complexo
# a primeira função gira em torno de (0,0) mas nós precisamos fazê-la gira em torno do centro, pois se não ela sairia do campo de visão 
# o centro não necessariamente é o centro, em uma imagem de 800x600 px por exmeplo o centro é (400, 300)

def rotacionar_em_torno_do_centro(x,y, centro_x, centro_y, novo_centro_x,
    novo_centro_y, angulo):

    x_relativo = x - centro_x
    y_relativo = centro_y - y
#Acima estamos criando um ponto refencial 
    # o y fica diferente aqui poruqe na matemtica isso representa uma coisa, mas na imagem isso é diferente essa diferença é porque estamos trabalhando com imagem

    novo_x_relativo, novo_y_relativo = rotacionar_ponto(x_relativo, y_relativo, angulo)
 #aplicando a rotação com a função rotacionar_ponto
 

    novo_x = novo_centro_x + novo_x_relativo 
    novo_y = novo_centro_y - novo_y_relativo 
#aqui estamos colocando o centro de volta após a rotação
    return novo_x, novo_y


def calcular_novo_tamanho(largura, altura, angulo):
    centro_x = (largura-1)/2
    contro_y = (altura-1)/2

    cantos = [
        (0,0),
        (largura -1,0),
        (0,altura -1),
        (largura -1, altura -1)
    ]

    xs = []
    ys = []

    for x, y in cantos:
        x_relativo = x - centro_x
        y_relativo = centro_y - y

        x_rotacionado, y_rotacionado = rotacionar_ponto(
            x_relativo,
            y_relativo,
            angulo
        )

        xs.append(x_rotacionado)
        ys.append(y_rotacionado)
        #esse trecho faz com que seja guardado todos os valores de x rotacionados numa lista e os de y em outra

    nova_largura = round(max(xs) - min(xs)) + 1
    nova_altura = round(max(ys) - min(ys))  + 1  
    # aqui ele pega o maior x max(xs) o menor min(xs) e subtrai para chegar no valor necessário

    return nova_largura, nova_altura




imagem= Image.open("esboco.png").convert("RGBA")
#abrimos a imagem


largura,altura = imagem.size
#descobrimos seu tamanho

centro_x = (largura -1) / 2
centro_y = (altura -1) / 2
#descobrimos seu centro

angulo = 66

nova_largura, nova_altura = calcular_novo_tamanho(
    largura,
    altura,
    angulo
)
# tamanho da imagem de saída para rotação


novo_centro_x = (nova_largura-1) /2
novo_centro_y = (nova_altura-1) /2
#centro da nova imagem


#criando uma nova imagem vazia
nova_imagem = Image.new(
     "RGBA",
    (nova_largura, nova_altura),
    (255, 255, 255, 0)
)




for y in range(altura):
    #anda linha por linha
    for x in range (largura):
        #outro for que anda pixel por pixel dentro da linha 
        pixel = imagem.getpixel((x,y))
        #isso pega a cor em cada pixel

        novo_x, novo_y = rotacionar_em_torno_do_centro(
            x,
            y,
            centro_x,
            centro_y,
            novo_centro_x,
            novo_centro_y,
            angulo
        )

        novo_x= round(novo_x)
        novo_y= round(novo_y)
        #arrendodamos os numeros

        if 0 <= novo_x < nova_largura and 0 <= novo_y < nova_altura:
            nova_imagem.putpixel(
                (novo_x, novo_y),
                pixel
            )

nova_imagem.save(
    "imagem_rotacionada.png",
    format="PNG"
)

print("Imagem salva com sucesso")

teste = Image.open("imagem_rotacionada.png")

print(
    "Resultado:",
    teste.format,
    teste.mode,
    teste.size
)