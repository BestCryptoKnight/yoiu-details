/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable global-require */
let reactotron;

if (process.env.NODE_ENV === 'development') {
  const Reactotron = require('reactotron-react-js').default;
  const { trackGlobalErrors } = require('reactotron-react-js');
  const { reactotronRedux } = require('reactotron-redux');
  reactotron = Reactotron
    .configure({
      name: 'compose-finance',
    })
    .use(trackGlobalErrors())
    .use(reactotronRedux())
    .connect();
  (global as any).Reactotron = Reactotron;
} else {
  (global as any).Reactotron = {
    log: () => {},
    logImportant: () => {},
    warn: () => {},
    error: () => {},
  };
}

export const configuredReactotron = reactotron;
