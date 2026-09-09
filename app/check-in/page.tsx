"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Scan } from "lucide-react";
import { useRouter } from "next/navigation";
import { MobileNav } from "@/components/mobile-nav";
import { PlatformHeader } from "@/components/platform-header";
import { checkInAttendee } from "@/app/platform-actions";

export default function CheckInScannerPage() {
  type BarcodeDetectorInstance = {
    detect(source: HTMLVideoElement): Promise<Array<{ rawValue?: string }>>;
  };
  type BarcodeDetectorConstructor = new (options: {
    formats: string[];
  }) => BarcodeDetectorInstance;
  const router = useRouter();
  const [manualCode, setManualCode] = useState("");
  const [error, setError] = useState("");
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const checkCode = useCallback(
    async (code: string) => {
      setError("");
      const result = await checkInAttendee(code);
      if (result.ok)
        router.push(
          `/check-in/success?name=${encodeURIComponent(`${result.data.first_name} ${result.data.last_name}`)}`,
        );
      else {
        setError(result.error);
        router.push("/check-in/failed");
      }
    },
    [router],
  );
  useEffect(() => {
    let active = true;
    const startCamera = async () => {
      if (!("BarcodeDetector" in window) || !videoRef.current) return;
      const detectorConstructor = (
        window as unknown as { BarcodeDetector?: BarcodeDetectorConstructor }
      ).BarcodeDetector;
      if (!detectorConstructor || !videoRef.current) return;
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: "environment" },
        });
        if (!active || !videoRef.current) return;
        streamRef.current = stream;
        videoRef.current.srcObject = stream;
        await videoRef.current.play();
        const detector = new detectorConstructor({ formats: ["qr_code"] });
        const scan = async () => {
          if (!active || !videoRef.current) return;
          const codes = await detector.detect(videoRef.current);
          if (codes[0]?.rawValue) await checkCode(codes[0].rawValue);
          else window.requestAnimationFrame(scan);
        };
        window.requestAnimationFrame(scan);
      } catch {
        setError("Camera unavailable. Enter the registration code manually.");
      }
    };
    void startCamera();
    return () => {
      active = false;
      streamRef.current?.getTracks().forEach((track) => track.stop());
    };
  }, [checkCode]);
  return (
    <div className="mobile-product-page">
      <PlatformHeader />
      <div className="mobile-product-stack checkin-stack">
        <div className="checkin-heading">
          <h1>Event Check-In</h1>
          <p>Scan an attendee QR code to check them in</p>
        </div>
        <section className="scanner-card">
          <div className="scanner-reticle">
            <i />
            <i />
            <i />
            <i />
          </div>
          <video
            ref={videoRef}
            className="scanner-video"
            muted
            playsInline
            aria-label="QR code camera"
          />
          <p>Position QR code within the frame</p>
          <div className="scanner-tip">
            <Scan />
            <span>Hold camera steady · Auto-scans in 1–2 seconds</span>
          </div>
        </section>
        <section className="mobile-card compact-card">
          <div className="mobile-label">SIMULATE QR SCAN</div>
          <p className="mobile-footnote">
            Live attendee simulation requires records in Supabase.
          </p>
        </section>
        <section className="mobile-card compact-card">
          <div className="mobile-label">MANUAL CODE ENTRY</div>
          <div className="manual-entry">
            <input
              value={manualCode}
              onChange={(event) =>
                setManualCode(event.target.value.toUpperCase())
              }
              placeholder="OAK-2026-XXXX-XXXX"
            />
            <button onClick={() => checkCode(manualCode)}>Check</button>
          </div>
          {error && (
            <p className="mobile-error" role="alert">
              {error}
            </p>
          )}
        </section>
      </div>
      <MobileNav />
    </div>
  );
}
