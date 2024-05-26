// // svelte.config.js
// const preprocess = require('svelte-preprocess');

// module.exports = {
//   preprocess: preprocess()
// };
import adapter from '@sveltejs/adapter-static';

export default {
  kit: {
    adapter: adapter({
      pages: 'build',
      assets: 'build',
      fallback: null
    }),
  },
};
