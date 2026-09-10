"use client";

import { useEffect, useState } from "react";
import PassClient from "@/app/pass/[id]/pass-client";
import { readRegistration } from "@/lib/session";

export default function ExistingPassPage() {
  const [id, setId] = useState("");
  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      setId(readRegistration()?.id ?? "OAK-2026-7842-XKPH");
    });
    return () => cancelAnimationFrame(frame);
  }, []);
  if (!id) return null;
  return <PassClient id={id} />;
}
