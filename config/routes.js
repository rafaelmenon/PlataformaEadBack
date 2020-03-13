module.exports = app => {
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
};
