import { render } from "vike/abort";

export async function onBeforeRender(pageContext) {
  const isServerClientSide =
    import.meta.env.SSR && pageContext.isClientSideNavigation;

  try {
    // client side navigation but hittin the server side hook
    if (isServerClientSide) {
      // on 0.4.143 we'd expect returning an object to hit the clientside hook
      // on 0.4.163 we'd expect the same, but it doesn't hit the clientside hook, unless we return false
      return {}; //clientside hook not hit
      // return false; // clientside hook hit
    }
  } catch (e) {
    throw render(404);
  }

  return {
    pageContext: {
      pageProps: {},
    },
  };
}
