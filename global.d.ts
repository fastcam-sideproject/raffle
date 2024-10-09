export {};

declare global {
  interface Window {
    Mobile?: {
      sendCancel: () => void;
      sendToMobile: (status: boolean) => void;
    };
  }
}
