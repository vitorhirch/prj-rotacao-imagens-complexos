<div align="center">

# 🔄 PRJ.4 — Rotação de Imagens com Números Complexos

### Matemática aplicada à computação por meio da transformação de imagens

Aplicação web acadêmica que demonstra, de forma visual e interativa, como **números complexos** podem ser utilizados para rotacionar imagens em torno de seu centro.

![Python](https://img.shields.io/badge/Python-3.x-3776AB?logo=python&logoColor=white)
![Flask](https://img.shields.io/badge/Flask-3.1-000000?logo=flask&logoColor=white)
![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=0B1B2B)
![TypeScript](https://img.shields.io/badge/TypeScript-6-3178C6?logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-8-646CFF?logo=vite&logoColor=white)
![Pillow](https://img.shields.io/badge/Pillow-12.3-306998)

</div>

---

## 📌 Sobre o projeto

O projeto foi desenvolvido para a disciplina de **Matemática para Computação** com o objetivo de relacionar conceitos matemáticos à programação.

A aplicação recebe uma imagem, um ângulo de rotação e um método de mapeamento. A posição de cada pixel é tratada como um número complexo e rotacionada por meio da multiplicação por um número complexo de módulo unitário.

Além da execução prática, o projeto possui páginas dedicadas à explicação da **matemática utilizada** e da **implementação em Python**, tornando a aplicação também uma ferramenta didática.

---

## 🖼️ Interface

<table>
  <tr>
    <td width="50%" align="center">
      <img src="front/src/assets/print1.png" alt="Tela inicial do projeto" width="100%" />
      <br />
      <sub><b>Upload da imagem e configuração da rotação</b></sub>
    </td>
    <td width="50%" align="center">
      <img src="front/src/assets/print2.png" alt="Resultado da rotação" width="100%" />
      <br />
      <sub><b>Comparação entre imagem original e rotacionada</b></sub>
    </td>
  </tr>
  <tr>
    <td width="50%" align="center">
      <img src="front/src/assets/print3.png" alt="Página de matemática" width="100%" />
      <br />
      <sub><b>Explicação visual da matemática da rotação</b></sub>
    </td>
    <td width="50%" align="center">
      <img src="front/src/assets/print4.png" alt="Página de código" width="100%" />
      <br />
      <sub><b>Relação entre conceito matemático e implementação</b></sub>
    </td>
  </tr>
</table>

---

## ✨ Funcionalidades

- Upload de imagens nos formatos **PNG, JPG e JPEG**;
- definição de um ângulo de rotação personalizado;
- atalhos para rotações de **45°, 90°, 180° e 270°**;
- rotação da imagem em torno de seu próprio centro;
- cálculo da rotação utilizando **números complexos**;
- escolha entre **mapeamento direto** e **mapeamento inverso**;
- comparação visual entre a imagem original e o resultado;
- controle de **zoom** sobre a imagem rotacionada;
- download da imagem resultante em PNG;
- página interativa explicando a matemática utilizada;
- página dedicada à implementação do algoritmo em Python.

---

## 🧮 Conceito matemático

Cada pixel possui uma posição `(x, y)`. Essa coordenada pode ser representada por um número complexo:

```text
z = x + yi
```

Para uma rotação de ângulo `θ`, utilizamos um número complexo de módulo unitário:

```text
r = cos(θ) + i·sin(θ)
```

A nova posição do ponto é obtida pela multiplicação:

```text
z' = z · r
```

No Python, a ideia principal é representada por:

```python
z = complex(x, y)

rotacao = complex(
    cos(theta),
    sin(theta)
)

z_rotacionado = z * rotacao
```

Como a imagem deve girar em torno de seu **centro**, a posição do pixel é primeiro convertida para uma coordenada relativa ao centro. Após a rotação, ela é convertida novamente para o sistema de coordenadas da imagem.

---

## 🔁 Mapeamento direto e inverso

O projeto permite comparar duas estratégias para construir a imagem rotacionada.

### Mapeamento direto

Percorre os pixels da imagem original e calcula para onde cada um deve ser enviado:

```text
origem → rotação → destino
```

Como a nova posição precisa ser arredondada para coordenadas inteiras, diferentes pixels podem chegar à mesma posição enquanto outros pontos permanecem vazios.

### Mapeamento inverso

Percorre cada posição da imagem resultante e calcula de qual ponto da imagem original sua cor deve ser obtida:

```text
destino → rotação inversa → origem
```

Para encontrar a posição correspondente na imagem original, o algoritmo utiliza o ângulo negativo (`-θ`). Essa abordagem reduz os espaços vazios observados no mapeamento direto.

---

## 🧠 Fluxo da aplicação

```text
Imagem + ângulo + método
          │
          ▼
     Frontend React
          │
          │ POST /api/rotacionar
          ▼
      Flask API
          │
          ▼
      rotacao.py
          │
          ├── calcula o centro
          ├── calcula o novo tamanho
          ├── aplica a rotação complexa
          └── usa mapeamento direto ou inverso
          │
          ▼
    Imagem PNG resultante
          │
          ▼
 Visualização + zoom + download
```

---

## 🛠️ Tecnologias utilizadas

| Camada | Tecnologias |
| --- | --- |
| **Algoritmo** | Python, números complexos |
| **Processamento de imagem** | Pillow |
| **Backend** | Flask |
| **Frontend** | React, TypeScript |
| **Build / desenvolvimento** | Vite |
| **Navegação** | React Router |
| **Interface** | CSS, React Icons |

---

## 📁 Estrutura do projeto

```text
prj4-rotacao/
├── rotacao.py
├── requirements.txt
├── README.md
│
└── front/
    ├── app.py
    ├── package.json
    ├── vite.config.ts
    │
    └── src/
        ├── assets/
        │   ├── print1.png
        │   ├── print2.png
        │   ├── print3.png
        │   └── print4.png
        │
        ├── components/
        │   └── header/
        │
        └── pages/
            ├── home/
            ├── matematica/
            └── codigo/
```

---

## 🚀 Como executar o projeto

### Pré-requisitos

Antes de começar, tenha instalados:

- **Python 3**;
- **Node.js e npm**.

### 1. Clone o repositório

```bash
git clone https://github.com/vitorhirch/prj-rotacao-imagens-complexos.git
cd prj-rotacao-imagens-complexos
```

### 2. Instale as dependências do Python

Na raiz do projeto:

```bash
pip install -r requirements.txt
```

### 3. Inicie o backend Flask

Ainda na raiz do projeto:

```bash
python front/app.py
```

O backend será executado em:

```text
http://127.0.0.1:5000
```

### 4. Inicie o frontend

Abra um **segundo terminal** e execute:

```bash
cd front
npm install
npm run dev
```

O Vite informará o endereço local da aplicação, normalmente:

```text
http://localhost:5173
```

### 5. Acesse a aplicação

Abra o endereço exibido pelo Vite no navegador e:

1. selecione uma imagem;
2. informe um ângulo;
3. escolha entre mapeamento **Direto** ou **Inverso**;
4. clique em **Rotacionar imagem**;
5. compare o resultado, utilize o zoom ou faça o download.

---

## 📚 Objetivos de aprendizagem

O projeto busca demonstrar na prática conceitos como:

- representação de pontos no plano complexo;
- forma trigonométrica dos números complexos;
- multiplicação de números complexos;
- rotação de vetores;
- transformação de coordenadas;
- diferença entre coordenadas cartesianas e coordenadas de imagens digitais;
- mapeamento direto e inverso de pixels;
- integração entre matemática, backend e interface web.

---

👥 Equipe

Projeto acadêmico desenvolvido em dupla para a disciplina de Matemática para Computação.

Vitor Hirch — GitHub

Patricia Maidana — GitHub

<div align="center">

PRJ.4 — Rotação de Imagens com Números Complexos

Desenvolvido por Vitor Hirch e Patricia Maidana

Matemática • Programação • Processamento de Imagens

</div>