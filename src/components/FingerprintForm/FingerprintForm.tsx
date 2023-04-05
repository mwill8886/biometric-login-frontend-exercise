import React, { useState, useEffect } from 'react';
import styles from './FingerprintForm.module.css';
import {
  FingerprintScanner,
  ScanEvent,
  FingerprintScan,
  Finger,
  LoginService,
} from 'services';
import { ReactComponent as FingerprintIcon } from 'assets/icon-fingerprint.svg';
import { ViewTypes, ProgressBar } from 'components';

//
// Models
//
export type FingerprintFormProps = {
  loginService: LoginService;
  scanner: FingerprintScanner;
  username: string;
  fingers: Array<Finger>;
  setView: (view: ViewTypes) => void;
};

//
// Component
//
export const FingerprintForm: React.FC<FingerprintFormProps> = (props) => {
  const { loginService, scanner, username, fingers, setView } = props;

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [scanIndex, setScanIndex] = useState<number>(0);
  const [fingerprintScans, setFingerprintScans] = useState<
    Array<FingerprintScan>
  >([]);

  // submit the scanned fingerprints to the login
  const submitLoginData = async () => {
    setLoading(true);

    const loginRequest = {
      username: username,
      scans: fingerprintScans,
    };

    const response = await loginService.login(loginRequest);

    if (response.success) {
      // show success
      setView('success');
    } else {
      // show response.errorMessage
      setError(response.errorMessage);
      setLoading(false);
      setScanIndex(0);
    }
  };

  // simulate the scanning of each finger
  // save the scan data to each fingerprint
  const setScanData = (data: ScanEvent) => {
    // reset from error state
    if (error) {
      setError(null);
    }

    // set the data
    const scannedFinger: Finger = fingers[scanIndex];
    const updatedData: FingerprintScan = { ...data, finger: scannedFinger };

    // check to see if the finger has already been scanned
    const existingDataIndex = fingerprintScans.findIndex((scan) => {
      return scan.finger === scannedFinger;
    });

    if (existingDataIndex === -1) {
      // the finger has not been scanned, add it to the array
      setFingerprintScans([...fingerprintScans, updatedData]);
    } else {
      // the finger has previously been scanned, find and update it
      let updatedScansArr = fingerprintScans;
      updatedScansArr[existingDataIndex] = updatedData;
      setFingerprintScans(updatedScansArr);
    }

    // move to the next finger
    setScanIndex((prev) => prev + 1);
  };

  // set the state back 1 so the user can rescan the previous finger
  const handleRescanPrevious = () => {
    setScanIndex((prev) => prev - 1);
  };

  // cancel scanning and return to the initial view
  const handleCancel = () => {
    setView('username');
  };

  useEffect(() => {
    // start scanner
    const scanId = scanner.subscribe(setScanData);

    // all fingers have been scanned - check the scans
    if (scanIndex === fingers.length) {
      submitLoginData();
    }

    // stop scanner
    if (scanIndex === fingers.length) scanner.unsubscribe(scanId);
    return () => scanner.unsubscribe(scanId);
  }, [scanIndex]);

  return (
    <div>
      <FingerprintIcon className="icon" />
      {loading ? (
        <div>
          <p className="header">Submitting fingerprints</p>
        </div>
      ) : (
        <p className="header">
          {error && <p className={styles.textRed}>Error: {error}</p>}
          Please {error && 're-'}scan your{' '}
          <strong>
            {fingers[scanIndex]?.toLowerCase()?.replace(/_/g, ' ')}
          </strong>{' '}
          fingerprint for authentication
        </p>
      )}
      <hr className="divider" />
      <div className={styles.progressWrapper}>
        <ProgressBar totalValue={fingers.length} currentValue={scanIndex} />
      </div>
      {loading ? (
        <div className={styles.spinner}></div>
      ) : (
        <div className={styles.buttonWrapper}>
          <button onClick={handleCancel} className="button-open">
            Cancel
          </button>
          <button onClick={handleRescanPrevious} className="button-contained">
            Re-scan previous finger
          </button>
        </div>
      )}
    </div>
  );
};
