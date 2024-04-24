// Import the framework and instantiate it
import { build, options } from './app.js';

  const server = await build(options);
  await server.listen({port: options.port, host: options.host});
  