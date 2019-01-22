module.exports = {
  async createAccount(
    _,
    {
      accountInput: { email, password },
    },
    {
      dataSources: { authAPI },
    }
  ) {
    return authAPI.createAccount({ email, password });
  },

  async deleteAccount(
    _,
    {
      accountInput: { email, password },
    },
    {
      dataSources: { authAPI },
    }
  ) {
    return authAPI.deleteAccount({ email, password });
  },

  async login(
    _,
    {
      accountInput: { email, password },
    },
    {
      dataSources: { authAPI },
    }
  ) {
    return authAPI.login({ email, password });
  },
};
