
export default {
  bootstrap: () => import('./main.server.mjs').then(m => m.default),
  inlineCriticalCss: true,
  baseHref: '/',
  locale: undefined,
  routes: [
  {
    "renderMode": 2,
    "redirectTo": "/products",
    "route": "/"
  },
  {
    "renderMode": 2,
    "route": "/login"
  },
  {
    "renderMode": 2,
    "route": "/products"
  },
  {
    "renderMode": 2,
    "route": "/cart"
  },
  {
    "renderMode": 2,
    "redirectTo": "/products",
    "route": "/**"
  }
],
  entryPointToBrowserMapping: undefined,
  assets: {
    'index.csr.html': {size: 433, hash: 'e5de59e0298486102d92da2d950caddd85bfed75b17e82a550c822e32d35a92c', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 946, hash: 'bf6227cb2db797195bd12452350a96c075de1bf6df55465ceb1c386d6ad31144', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'login/index.html': {size: 6751, hash: '24159994b1018179f7d8ed987364b2b46ba3156ef69fd38b26df2d8299793bac', text: () => import('./assets-chunks/login_index_html.mjs').then(m => m.default)},
    'cart/index.html': {size: 8217, hash: '992e546abb6eda6d9dc3938dd5a34feb59d96c33ac26cb0583ae9f6bbf0c0b97', text: () => import('./assets-chunks/cart_index_html.mjs').then(m => m.default)},
    'products/index.html': {size: 6062, hash: 'fe30919cfa04545fda1f08c96aa823744ace6d98b1fe8d7c445b8e555865ac67', text: () => import('./assets-chunks/products_index_html.mjs').then(m => m.default)},
    'styles-5INURTSO.css': {size: 0, hash: 'menYUTfbRu8', text: () => import('./assets-chunks/styles-5INURTSO_css.mjs').then(m => m.default)}
  },
};
