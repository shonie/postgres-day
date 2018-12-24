module.exports = model => {
  const all = (...args) =>
    model.findAll(...args).then(entity =>
      entity.map(data => {
        const { dataValues } = data;
        return dataValues;
      })
    );

  const findById = (...args) => model.findByPk(...args);

  return {
    all,
    findById,
  };
};
