const express = require("express");

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.json({
    status: "ok",
    servicio: "Recepcionista Digital Punto Vital"
  });
});

app.get("/salud", (req, res) => {
  res.json({ ok: true });
});

app.post("/chat", async (req, res) => {
  try {
    const mensaje = req.body.mensaje;

    if (!mensaje) {
      return res.status(400).json({
        error: "Falta el mensaje"
      });
    }

    const respuesta = await fetch("https://api.openai.com/v1/responses", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + process.env.OPENAI_API_KEY
      },
      body: JSON.stringify({
        model: "gpt-6-luna",
        instructions:
          "Eres la recepcionista digital de Punto Vital. Atiende en español, de forma amable, clara y breve. Ayuda al paciente a explicar qué necesita y orienta sobre los servicios de Punto Vital. No inventes diagnósticos ni sustituyas una valoración médica.",
        input: mensaje
      })
    });

    const datos = await respuesta.json();

    if (!respuesta.ok) {
      console.error("Error de OpenAI:", datos);
      return res.status(500).json({
        error: "No se pudo obtener respuesta de OpenAI"
      });
    }

    res.json({
      respuesta: datos.output_text
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Error interno del servidor"
    });
  }
});

app.listen(PORT, () => {
  console.log(Servidor Punto Vital activo en puerto ${PORT});
});
