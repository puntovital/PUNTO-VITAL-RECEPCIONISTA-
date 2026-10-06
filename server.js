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

app.listen(PORT, () => {
  console.log(Servidor Punto Vital activo en puerto ${PORT});
});
