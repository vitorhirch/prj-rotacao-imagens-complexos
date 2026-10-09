from io import BytesIO
from flask import Flask, request, send_file
from PIL import Image
from rotacao import rotacionar_imagem

app = Flask(__name__)

@app.post("/api/rotacionar")
def rotacionar():
    arquivo = request.files["imagem"]
    angulo = float(request.form["angulo"])

    imagem = Image.open(arquivo.stream).convert("RGBA")
    resultado = rotacionar_imagem(imagem, angulo)

    buffer = BytesIO()
    resultado.save(buffer, format="PNG")
    buffer.seek(0)

    return send_file(buffer, mimetype="image/png")

if __name__ == "__main__":
    app.run(port=5000, debug=True)