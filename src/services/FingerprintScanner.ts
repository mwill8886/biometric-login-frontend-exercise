export type Finger = "RIGHT_THUMB" | "RIGHT_INDEX" | "RIGHT_MIDDLE" | "RIGHT_RING" | "RIGHT_SMALL" | "LEFT_THUMB" | "LEFT_INDEX" | "LEFT_MIDDLE" | "LEFT_RING" | "LEFT_SMALL"

export type ScanEvent = {
  data: ImageData,
  dpi: number,
};

export type ScanEventCallback = (event: ScanEvent) => void;

/**
 * A simulated fingerprint scanner.
 */
export class FingerprintScanner {

  /**
   * Create a new subscription to the scanner.
   *
   * @param onScan - Callback that will be invoked when the user scans a fingerprint.
   * @returns Subscription id to pass to unsubscribe to cancel.
   */
  subscribe(onScan: ScanEventCallback): number {
    // Emit a scan event every 2 seconds.
    return window.setInterval(() => {
      onScan({
        data: new ImageData(300, 300),
        dpi: 500,
      });
    }, 2000);
  }

  /**
   * Close a previously-opened subscription.
   *
   * @param id - Subscription id returned by a previous call to subscribe().
   */
  unsubscribe(id: number) {
    window.clearInterval(id);
  }

}
