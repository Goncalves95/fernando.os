import { ImageResponse } from "next/og";

export const alt = "Fernando Gonçalves — Full Stack Engineer · Zürich";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          backgroundColor: "#0d0d0d",
          padding: "80px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <div style={{ width: 14, height: 14, borderRadius: 7, backgroundColor: "#FF4500" }} />
          <span style={{ fontSize: 26, color: "#a1a1aa", letterSpacing: 4 }}>FERNANDO-OS</span>
        </div>

        <div style={{ display: "flex", fontSize: 68, color: "#f4f4f5", fontWeight: 700, marginTop: 28 }}>
          Fernando Gonçalves
        </div>

        <div style={{ display: "flex", fontSize: 34, color: "#FF4500", marginTop: 14 }}>
          Full Stack Engineer · Zürich, Switzerland
        </div>

        <div style={{ display: "flex", fontSize: 24, color: "#71717a", marginTop: 36 }}>
          Java · Spring Boot · Angular · React · Python ML
        </div>
      </div>
    ),
    { ...size },
  );
}
