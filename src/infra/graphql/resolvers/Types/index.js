module.exports = () => ({
  Likeable: {
    __resolveType(obj) {
      if (obj.nickname) {
        return 'Author';
      }

      if (obj.title) {
        return 'Topic';
      }
      if (obj.text) {
        return 'Comment';
      }
      return null;
    },
  },
});
