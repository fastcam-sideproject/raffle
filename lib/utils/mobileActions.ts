/**
 * @description 모바일 환경을 감지하여 성공 메시지 전송
 */
export const sendSuccessMessage = () => {
  if (/iPhone|iPad|iPod/i.test(navigator.userAgent)) {
    // iOS 성공 알림
    if (typeof window !== 'undefined' && window.webkit?.messageHandlers?.Mobile?.postMessage) {
      window.webkit.messageHandlers.Mobile.postMessage(true);
    }
  } else {
    // Android 성공 알림
    if (typeof window !== 'undefined' && window.Mobile?.sendToMobile) {
      window.Mobile.sendToMobile(true);
    }
  }
};

/**
 * @description 모바일 환경을 감지하여 취소 메시지 전송
 */
export const sendCancelMessage = () => {
  if (/iPhone|iPad|iPod/i.test(navigator.userAgent)) {
    // iOS 취소 알림
    if (
      typeof window !== 'undefined' &&
      window.webkit?.messageHandlers?.MobileCancel?.postMessage
    ) {
      window.webkit.messageHandlers.MobileCancel.postMessage(true);
    }
  } else {
    // Android 취소 알림
    if (typeof window !== 'undefined' && window.Mobile?.sendCancel) {
      window.Mobile.sendCancel();
    }
  }
};
