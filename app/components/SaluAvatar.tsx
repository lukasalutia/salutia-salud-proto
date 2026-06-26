export type SaluMood = "happy" | "thinking" | "alert";

export function SaluAvatar({ size = 56, mood = "happy" }: { size?: number; mood?: SaluMood }) {
  return (
    <svg
      width={size}
      height={Math.round(size * 1.17)}
      viewBox="0 0 48 56"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Antena */}
      <line x1="24" y1="2.5" x2="24" y2="13" stroke="#ee742f" strokeWidth="2.5" strokeLinecap="round" />
      <circle cx="24" cy="2.5" r="3.5" fill="#ee742f" />

      {/* Sombra sutil bajo la cabeza */}
      <ellipse cx="24" cy="53" rx="14" ry="3" fill="#28347c" fillOpacity="0.15" />

      {/* Cabeza */}
      <rect x="4" y="13" width="40" height="38" rx="13" fill="#28347c" />

      {/* Brillo superior (highlight) */}
      <rect x="4" y="13" width="40" height="16" rx="13" fill="white" fillOpacity="0.08" />

      {/* Ojos */}
      <rect x="10" y="23" width="11" height="8" rx="2.5" fill="#22d3ee" />
      <rect x="27" y="23" width="11" height="8" rx="2.5" fill="#22d3ee" />

      {/* Brillo en ojos */}
      <rect x="10" y="23" width="11" height="3.5" rx="2.5" fill="white" fillOpacity="0.5" />
      <rect x="27" y="23" width="11" height="3.5" rx="2.5" fill="white" fillOpacity="0.5" />

      {/* Boca según mood */}
      {mood === "happy" && (
        <path d="M15 39.5 Q24 47 33 39.5" stroke="white" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      )}
      {mood === "thinking" && (
        <>
          <line x1="16" y1="40" x2="32" y2="40" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
          {/* Bolita pensamiento */}
          <circle cx="38" cy="17" r="2.5" fill="#ee742f" fillOpacity="0.8" />
          <circle cx="42" cy="13" r="2" fill="#ee742f" fillOpacity="0.5" />
          <circle cx="45" cy="10" r="1.5" fill="#ee742f" fillOpacity="0.3" />
        </>
      )}
      {mood === "alert" && (
        <>
          <path d="M15 39.5 Q24 35 33 39.5" stroke="white" strokeWidth="2.5" fill="none" strokeLinecap="round" />
          {/* Exclamación en antena */}
          <circle cx="24" cy="2.5" r="3.5" fill="#dc2626" />
          <line x1="24" y1="1" x2="24" y2="3.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
          <circle cx="24" cy="5" r="0.7" fill="white" />
        </>
      )}
    </svg>
  );
}
