import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Sam Irung — Cloud Engineer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background:
            "linear-gradient(135deg, #2563eb 0%, #1e3a8a 50%, #7c3aed 100%)",
          color: "white",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            fontSize: 24,
            fontWeight: 500,
            opacity: 0.9,
            marginBottom: 20,
          }}
        >
          Portfolio
        </div>
        <div
          style={{
            fontSize: 96,
            fontWeight: 800,
            lineHeight: 1.05,
            marginBottom: 20,
          }}
        >
          Sam Irung
        </div>
        <div
          style={{
            fontSize: 36,
            fontWeight: 600,
            opacity: 0.95,
            marginBottom: 40,
          }}
        >
          Cloud Engineer • DevOps • Infrastructure as Code
        </div>
        <div
          style={{
            display: "flex",
            gap: 16,
            fontSize: 22,
            opacity: 0.85,
          }}
        >
          <span>AWS</span>
          <span>·</span>
          <span>Terraform</span>
          <span>·</span>
          <span>Kubernetes</span>
          <span>·</span>
          <span>DevSecOps</span>
        </div>
      </div>
    ),
    { ...size }
  );
}