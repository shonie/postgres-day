exports.upsert = (Model, values, condition) =>
  Model.findOne({ where: condition }).then(obj => (obj ? obj.update(values) : Model.create(values)));
