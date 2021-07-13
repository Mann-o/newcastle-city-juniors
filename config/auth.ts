export const auth = {
  strategies: {
    local: {
      token: {
        property: 'data.token.token',
        maxAge: 604800,
      },
      user: {
        property: 'data.user',
      },
      endpoints: {
        login: {
          url: '/api/auth/login',
          method: 'post',
        },
        logout: {
          url: '/api/auth/logout',
          method: 'post',
        },
        user: {
          url: '/api/auth/user',
          method: 'get',
        },
      },
    },
  },
  redirect: {
    home: '/portal',
  },
}
