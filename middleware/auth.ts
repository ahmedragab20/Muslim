export default defineNuxtRouteMiddleware(async (to, from) => {
  const user = useCurrentUser();

  if (!user) {
    return navigateTo({
      path: '/',
      query: {
        redirect: to.fullPath,
      },
    });
  }
});
