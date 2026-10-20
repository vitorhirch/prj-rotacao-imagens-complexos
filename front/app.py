from io import BytesIO
from math import isfinite
from pathlib import Path
import sys

from flask import Flask, jsonify, request, send_file
from PIL import Image, UnidentifiedImageError

# Permite importar rotacao.py da raiz ao executar python front/app.py.
sys.path.insert(0, str(Path(__file__).resolve().parent.parent))
from rotacao import rotacionar_imagem

app = Flask(__name__)

@app.post("/api/rotacionar")
def rotacionar():
    arquivo = request.files.get("imagem")
    if arquivo is None or not arquivo.filename:
        return jsonify(erro="Selecione uma imagem PNG ou JPEG."), 400

    try:
        angulo = float(request.form.get("angulo", ""))
        metodo = request.form.get("metodo", "inverso")
    except ValueError:
        return jsonify(erro="Informe um ângulo válido em graus."), 400
    if not isfinite(angulo):
        return jsonify(erro="Informe um ângulo finito."), 400

    metodo = request.form.get("metodo", "inverso")

    try:
        with Image.open(arquivo.stream) as imagem:
            if imagem.format not in ("PNG", "JPEG"):
                return jsonify(erro="Selecione uma imagem PNG ou JPEG."), 400
            imagem.load()
            resultado = rotacionar_imagem(imagem, angulo % 360, metodo)

    except (UnidentifiedImageError, OSError, Image.DecompressionBombError):
        return jsonify(erro="Não foi possível ler a imagem enviada."), 400

    buffer = BytesIO()
    resultado.save(buffer, format="PNG")
    buffer.seek(0)

    return send_file(buffer, mimetype="image/png")

if __name__ == "__main__":
    app.run(port=5000, debug=True)
