import adapter from '@sveltejs/adapter-static';
import preprocess from 'svelte-preprocess';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://github.com/sveltejs/svelte-preprocess
	// for more information about preprocessors
	preprocess: preprocess({
		postcss: true,
	}),

	kit: {
		adapter: adapter({
			fallback: '200.html'
		}),
		alias: {
			'constants': './src/constants',
			'lib': './src/lib',
			'utils': './src/utils',
			'stores': './src/stores',
			'types': './src/types',
		}
	}
};

export default config;
