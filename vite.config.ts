import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig, loadEnv, type Plugin} from 'vite';

/**
 * Serves POST /api/contact during `npm run dev` so the Orthodox Wealth
 * Management consultation form works locally. In production the same logic runs
 * as the serverless function in `api/contact.ts`.
 */
const contactApiDevServer = (): Plugin => ({
  name: 'orthodox-contact-api',
  apply: 'serve',
  configureServer(server) {
    server.middlewares.use('/api/contact', (req, res, next) => {
      if (req.method !== 'POST') return next();

      let raw = '';
      req.on('data', (chunk) => {
        raw += chunk;
      });
      req.on('end', async () => {
        res.setHeader('Content-Type', 'application/json');
        try {
          const {sendContactEnquiry} = await server.ssrLoadModule('/api/contact.ts');
          await sendContactEnquiry(JSON.parse(raw || '{}'));
          res.statusCode = 200;
          res.end(JSON.stringify({message: 'Inquiry sent successfully'}));
        } catch (error) {
          console.error(error);
          res.statusCode = 500;
          res.end(JSON.stringify({message: 'Failed to send inquiry'}));
        }
      });
    });
  },
});

export default defineConfig(({mode}) => {
  // Vite only exposes VITE_-prefixed variables to the client. The contact
  // middleware runs in this Node process, so read the unprefixed EMAIL_*
  // credentials from .env.local into process.env. These are never bundled.
  Object.assign(process.env, loadEnv(mode, process.cwd(), ''));

  return {
    plugins: [react(), tailwindcss(), contactApiDevServer()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modify—file watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
