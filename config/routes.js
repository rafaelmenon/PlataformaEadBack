const multer = require("multer");
const fs = require("fs");
const path = require("path");

module.exports = (app) => {
  app.post("/sessions", app.api.auth.signin);
  app.post("/validateToken", app.api.auth.validateToken);

  app
    .route("/usuarios")
    .all(app.config.passport.authenticate())
    .post(app.api.usuarios.save)
    .get(app.api.usuarios.get);

  app
    .route("/usuarios/:id")
    .all(app.config.passport.authenticate())
    .put(app.api.usuarios.save)
    .delete(app.api.usuarios.remove);

  app
    .route("/cursos")
    .all(app.config.passport.authenticate())
    .post(app.api.cursos.save)
    .get(app.api.cursos.get);

  app
    .route("/cursos/:id")
    .all(app.config.passport.authenticate())
    .put(app.api.cursos.save)
    .delete(app.api.cursos.remove)
    .get(app.api.cursos.get);

  app
    .route("/matriculas")
    .all(app.config.passport.authenticate())
    .post(app.api.matriculas.save)
    .get(app.api.matriculas.get);

  app
    .route("/matriculas/:id")
    .all(app.config.passport.authenticate())
    .put(app.api.matriculas.save)
    .delete(app.api.matriculas.remove)
    .get(app.api.matriculas.get);

  app
    .route("/modulos")
    .all(app.config.passport.authenticate())
    .post(app.api.modulos.save)
    .get(app.api.modulos.get);

  app
    .route("/modulos/:id")
    .all(app.config.passport.authenticate())
    .put(app.api.modulos.save)
    .delete(app.api.modulos.remove);

  app
    .route("/modulos/:idCurso")
    .all(app.config.passport.authenticate())
    .get(app.api.modulos.get);

  //Aqui recebe o upload do video, será separado posteriormente.
  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "public");
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + "-" + file.originalname);
    },
  });

  const upload = multer({ storage: storage }).single("file");

  app.post("/upload", function (req, res) {
    upload(req, res, function (err) {
      if (err instanceof multer.MulterError) {
        return res.status(500).json(err);
      } else if (err) {
        return res.status(500).json(err);
      }

      return res.status(200).send(req.file);
    });
  });

  //Aqui faz o streaming do video, será seperado posteriormente.
  app.get("/aula/:nomeAula", function (req, res) {
    console.log("params ->>>>><<<<<<", req.params.nomeAula);
    const path = `public/${req.params.nomeAula}`;
    const stat = fs.statSync(path);
    const fileSize = stat.size;
    const range = req.headers.range;

    if (range) {
      const parts = range.replace(/bytes=/, "").split("-");
      const start = parseInt(parts[0], 10);
      const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;

      const chunksize = end - start + 1;
      const file = fs.createReadStream(path, { start, end });
      const head = {
        "Content-Range": `bytes ${start}-${end}/${fileSize}`,
        "Accept-Ranges": "bytes",
        "Content-Length": chunksize,
        "Content-Type": "video/mp4",
      };

      res.writeHead(206, head);
      file.pipe(res);
    } else {
      const head = {
        "Content-Length": fileSize,
        "Content-Type": "video/mp4",
      };
      res.writeHead(200, head);
      fs.createReadStream(path).pipe(res);
    }
  });
};
