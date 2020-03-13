module.exports = app => {
  const { existsOrError } = app.api.validation;

  const save = async (req, res) => {
    const matriculas = { ...req.body };
    if (req.params.id) matriculas.id = req.params.id;

    try {
      existsOrError(matriculas.aluno, "Necessário informar o aluno");
      existsOrError(matriculas.curso, "Necessário informar o curso");
    } catch (msg) {
      return res.status(400).send(msg);
    }

    if (matriculas.id) {
      app
        .db("matriculas")
        .update(matriculas)
        .where({ id: matriculas.id })
        .then(_ => res.status(204).send("Matricula atualizado com sucesso."))
        .catch(err => res.status(500).send(err));
    } else {
      app
        .db("matriculas")
        .insert(matriculas)
        .then(_ => res.status(204).send("Matricula adicionado com sucesso"))
        .catch(err => res.status(500).send(err));
    }
  };

  const remove = async (req, res) => {
    try {
      const rowsDeleted = await app
        .db("matriculas")
        .where({ id: req.params.id })
        .del();

      try {
        existsOrError(rowsDeleted, "Matricula não foi encontrado");
      } catch (msg) {
        return res.status(400).send(msg);
      }
      res.status(204).send();
    } catch (msg) {
      res.status(500).sen(msg);
    }
  };

  const get = (req, res) => {
    const matriculas = { ...req.body };
    if (req.params.id) matriculas.id = req.params.id;

    if (matriculas.id) {
      app
        .db("matriculas")
        .select("id", "aluno", "curso")
        .where({ aluno: matriculas.id })
        .then(matriculas => res.json(matriculas))
        .catch(err => res.status(500).send(err));
    } else {
      app
        .db("matriculas")
        .select("id", "aluno", "curso")
        .then(matriculas => res.json(matriculas))
        .catch(err => res.status(500).send(err));
    }
  };

  return { save, remove, get };
};
