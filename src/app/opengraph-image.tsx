import { ImageResponse } from "next/og";

export const alt = "Fernando Gonçalves — Full Stack Engineer · Zürich";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const TECH_LINES = ["Java · Spring Boot", "Angular · Next.js", "Python · MLflow", "React Native"];

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          backgroundColor: "#0d0d0d",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 48,
            left: 64,
            display: "flex",
            fontSize: 22,
            fontFamily: "monospace",
            color: "#FF4500",
          }}
        >
          {"> Fernando OS"}
        </div>

        <div
          style={{
            position: "absolute",
            top: 0,
            bottom: 0,
            right: 64,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "flex-end",
            gap: 10,
          }}
        >
          {TECH_LINES.map((line) => (
            <span key={line} style={{ display: "flex", fontFamily: "monospace", fontSize: 20, color: "#888888" }}>
              {line}
            </span>
          ))}
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
            height: "100%",
          }}
        >
          <div style={{ display: "flex", fontSize: 72, fontWeight: 700, color: "#ffffff" }}>
            Fernando Gonçalves
          </div>
          <div style={{ display: "flex", fontSize: 30, color: "#888888", marginTop: 16 }}>
            Full Stack Engineer · Zürich, Switzerland
          </div>
        </div>

        <div
          style={{
            position: "absolute",
            bottom: 56,
            left: 0,
            right: 0,
            display: "flex",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              display: "flex",
              border: "1px solid #FF4500",
              padding: "8px 20px",
              color: "#FF4500",
              fontFamily: "monospace",
              fontSize: 22,
            }}
          >
            View Portfolio →
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
