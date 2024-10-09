// global.d.ts
export {};

declare global {
  interface Window {
    webkit?: {
      messageHandlers: {
        Mobile: {
          postMessage: (message: any) => void;
        };
        MobileCancel: {
          postMessage: (message: any) => void;
        };
      };
    };
    Mobile?: {
      sendToMobile: (message: boolean) => void;
      sendCancel: () => void;
    };
  }
}
