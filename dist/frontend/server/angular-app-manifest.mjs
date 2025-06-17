
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
    'index.csr.html': {size: 433, hash: '9042e3f476b0febf0b35dcc7d508df158c7f5636c6d433d573bff6b5e2960568', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 946, hash: '06621e7af3d3631375c0a2fa8bae1862ebe4f90e80a5dcd7506dcdecf02e0536', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'login/index.html': {size: 6751, hash: '45a3366124e3fd2bf0af43db67d0b9e866f4d874b2094fab4923dafb538567bf', text: () => import('./assets-chunks/login_index_html.mjs').then(m => m.default)},
    'cart/index.html': {size: 8217, hash: '44304a38302938534c09773c05ef604315fd92b36577fa7676be5edcae69e5e3', text: () => import('./assets-chunks/cart_index_html.mjs').then(m => m.default)},
    'products/index.html': {size: 6082, hash: 'd09f7678882d6ecb33a2b79ee99d5795fffaa628c942ee50214592b7b53b0fa3', text: () => import('./assets-chunks/products_index_html.mjs').then(m => m.default)},
    'styles-5INURTSO.css': {size: 0, hash: 'menYUTfbRu8', text: () => import('./assets-chunks/styles-5INURTSO_css.mjs').then(m => m.default)}
  },
};
