/* eslint-disable @typescript-eslint/no-explicit-any */

interface ReactotronType {
  log(...value: any[]): void;
  logImportant(...value: any[]): void;
  warn(...value: any[]): void;
  error(error: any, stack?: any): void;
}

declare let global: {
  reduxNativeDevTools?: (reduxNativeDevToolsPayload: { name: string }) => any;
  Reactotron: ReactotronType;
  Buffer: any;
};

declare let Reactotron: ReactotronType;
