module.exports = app => {
  const { existsOrError } = app.api.validation;

  const save = async (req, res) => {
    const modulos = { ...req.body };
    if (req.params.id) modulos.id = req.params.id;

    try {
      existsOrError(modulos.nome, "Necessário informar o nome");
      existsOrError(
        modulos.idCurso,
        "Necessário informar a que curso pertence"
      );
    } catch (msg) {
      return res.status(400).send(msg);
    }

    if (modulos.id) {
      app
        .db("modulos")
        .update(modulos)
        .where({ id: modulos.id })
        .then(_ => res.status(204).send("Módulo atualizado com sucesso."))
        .catch(err => res.status(500).send(err));
    } else {
      app
        .db("modulos")
        .insert(modulos)
        .then(_ => res.status(204).send("Módulo adicionado com sucesso"))
        .catch(err => res.status(500).send(err));
    }
  };

  const remove = async (req, res) => {
    try {
      const rowsDeleted = await app
        .db("modulos")
        .where({ id: req.params.id })
        .del();

      try {
        existsOrError(rowsDeleted, "Módulo não foi encontrado");
      } catch (msg) {
        return res.status(400).send(msg);
      }
      res.status(204).send();
    } catch (msg) {
      res.status(500).sen(msg);
    }
  };

  const get = (req, res) => {
    const modulos = { ...req.body };
    if (req.params.idCurso) modulos.id = req.params.idCurso;

    if (modulos.id) {
      app
        .db("modulos")
        .select("id", "nome", "descricao", "idCurso")
        .where({ idCurso: modulos.id })
        .then(modulos => res.json(modulos))
        .catch(err => res.status(500).send(err));
    } else {
      app
        .db("modulos")
        .select("id", "nome", "descricao", "idCurso")
        .then(modulos => res.json(modulos))
        .catch(err => res.status(500).send(err));
    }
  };

  return { save, remove, get };
};
