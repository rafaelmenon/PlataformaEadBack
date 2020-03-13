module.exports = app => {
  const { existsOrError } = app.api.validation;

  const save = async (req, res) => {
    const cursos = { ...req.body };
    if (req.params.id) cursos.id = req.params.id;

    try {
      existsOrError(cursos.nome, "Necessário informar o nome");
    } catch (msg) {
      return res.status(400).send(msg);
    }

    if (cursos.id) {
      app
        .db("cursos")
        .update(cursos)
        .where({ id: cursos.id })
        .then(_ => res.status(204).send("Curso atualizado com sucesso."))
        .catch(err => res.status(500).send(err));
    } else {
      app
        .db("cursos")
        .insert(cursos)
        .then(_ => res.status(204).send("Curso adicionado com sucesso"))
        .catch(err => res.status(500).send(err));
    }
  };

  const remove = async (req, res) => {
    try {
      const rowsDeleted = await app
        .db("cursos")
        .where({ id: req.params.id })
        .del();

      try {
        existsOrError(rowsDeleted, "Curso não foi encontrado");
      } catch (msg) {
        return res.status(400).send(msg);
      }
      res.status(204).send();
    } catch (msg) {
      res.status(500).sen(msg);
    }
  };

  const get = (req, res) => {
    const cursos = { ...req.body };
    if (req.params.id) cursos.id = req.params.id;

    if (cursos.id) {
      app
        .db("cursos")
        .select("id", "nome", "descricao", "imagem")
        .where({ id: cursos.id })
        .then(cursos => res.json(cursos))
        .catch(err => res.status(500).send(err));
    } else {
      app
        .db("cursos")
        .select("id", "nome", "descricao", "imagem")
        .then(cursos => res.json(cursos))
        .catch(err => res.status(500).send(err));
    }
  };

  return { save, remove, get };
};
