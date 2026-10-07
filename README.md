# PRJ.4 — Rotação de Imagens com Números Complexos

Projeto acadêmico desenvolvido para a disciplina de Matemática para Computação.

O objetivo é desenvolver uma aplicação capaz de receber uma imagem e aplicar uma rotação em torno do seu centro, considerando um ângulo informado pelo usuário.

A rotação é calculada utilizando números complexos, relacionando cada posição `(x, y)` de um pixel a um número complexo da forma:

```text
z = x + yi
```

A partir disso, a posição é rotacionada por meio da multiplicação por um número complexo de módulo unitário associado ao ângulo desejado.

## Objetivo

Construir uma aplicação que:

- receba uma imagem como entrada;
- permita informar um ângulo de rotação;
- realize a rotação no sentido anti-horário;
- mantenha a rotação em torno do centro da imagem;
- utilize números complexos no cálculo das novas posições dos pixels;
- disponibilize posteriormente uma interface web utilizando Flask, HTML e CSS.

## Conceito matemático

Uma coordenada de um ponto pode ser representada por um número complexo:

```text
(x, y) → x + yi
```

Para realizar uma rotação de ângulo `θ`, é utilizado o número complexo:

```text
cos(θ) + i·sin(θ)
```

A nova posição é obtida por:

```text
z_rotacionado = z × rotação
```

No código Python, a lógica principal é representada por:

```python
z = complex(x, y)

rotacao = complex(
    cos(theta),
    sin(theta)
)

z_rotacionado = z * rotacao
```

## Funcionamento atual

A implementação atual:

1. abre uma imagem utilizando Pillow;
2. identifica sua largura e altura;
3. calcula o centro da imagem;
4. percorre os pixels da imagem original;
5. representa cada posição como um número complexo;
6. calcula sua nova posição após a rotação;
7. transfere a cor do pixel para a imagem resultante;
8. ajusta o tamanho da imagem de saída de acordo com a rotação.

## Tecnologias

- Python
- Pillow
- Flask
- HTML
- CSS

## Estrutura inicial

```text
prj4-rotacao/
├── rotacao.py
├── README.md
├── requirements.txt
└── .gitignore
```

A estrutura será expandida com a implementação da aplicação Flask.

## Próximas etapas

- permitir ângulos arbitrários;
- melhorar o preenchimento dos pixels após a rotação;
- estudar mapeamento inverso para reduzir espaços vazios;
- implementar upload de imagens com Flask;
- criar interface em HTML e CSS;
- permitir que o usuário visualize e baixe a imagem rotacionada.

## Execução local

Instale as dependências:

```bash
pip install -r requirements.txt
```

Execute o programa:

```bash
python rotacao.py
```

## Equipe

Projeto desenvolvido em dupla para fins acadêmicos.
