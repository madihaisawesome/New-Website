import { useEffect, useRef, useState } from 'react'
import './Room.css'

const BOOT_LINES = [
  '> MADIHA OS 1.0',
  '> SYSTEM CHECK...',
  '> LOVE PROTOCOL : ON',
  '> Loading Home........... OK',
  '> Loading Projects....... OK',
  '> Loading Education...... OK',
  '> Loading Skills......... OK',
  '> Loading Resume......... OK',
]

export default function Room({ onBoot }) {
  const [booting, setBooting] = useState(false)
  const [progress, setProgress] = useState(0)
  const timerRef = useRef(null)
  const progressRef = useRef(null)

  useEffect(() => () => {
    clearTimeout(timerRef.current)
    clearInterval(progressRef.current)
  }, [])

  const boot = () => {
    if (booting) return
    setBooting(true)
    setProgress(0)
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) {
      setProgress(100)
      timerRef.current = setTimeout(onBoot, 250)
      return
    }

    const started = performance.now()
    const duration = 1700
    progressRef.current = setInterval(() => {
      const pct = Math.min(100, ((performance.now() - started) / duration) * 100)
      setProgress(pct)
      if (pct >= 100) clearInterval(progressRef.current)
    }, 40)
    timerRef.current = setTimeout(onBoot, duration)
  }

  return (
    <div className={`room ${booting ? 'is-booting' : ''}`}>
      <div className="room-frame">
        <svg
          className="room-art"
          viewBox="0 0 480 270"
          role="img"
          aria-label="A cozy pixel-art desk at night, with a glowing computer screen"
        >
          <defs>
            <linearGradient id="wallGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stop-color="#2a2145"/>
              <stop offset="100%" stop-color="#1c1632"/>
            </linearGradient>
            <linearGradient id="floorGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stop-color="#6b4530"/>
              <stop offset="100%" stop-color="#4a2f20"/>
            </linearGradient>
            <linearGradient id="deskGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stop-color="#e0a45c"/>
              <stop offset="100%" stop-color="#b87338"/>
            </linearGradient>
            <radialGradient id="screenLight" cx="50%" cy="45%" r="55%">
              <stop offset="0%" stop-color="#8dffc8" stop-opacity="0.55"/>
              <stop offset="100%" stop-color="#8dffc8" stop-opacity="0"/>
            </radialGradient>
            <radialGradient id="lampLight" cx="50%" cy="40%" r="55%">
              <stop offset="0%" stop-color="#ffd58a" stop-opacity="0.5"/>
              <stop offset="100%" stop-color="#ffd58a" stop-opacity="0"/>
            </radialGradient>
          </defs>

          <rect width="480" height="186" fill="url(#wallGrad)"/>
          <rect width="480" height="18" fill="#151024"/>
          <rect y="176" width="480" height="10" fill="#2b221c"/>
          <rect y="186" width="480" height="84" fill="url(#floorGrad)"/>

          {[198, 222, 246].map(y => (
            <rect key={y} y={y} width="480" height="2" fill="#3a281c" opacity="0.55"/>
          ))}
          {[40, 120, 200, 280, 360, 440].map(x => (
            <rect key={x} x={x} y="186" width="2" height="84" fill="#3a281c" opacity="0.28"/>
          ))}

          {Array.from({ length: 8 }).map((_, row) =>
            Array.from({ length: 14 }).map((__, col) => (
              <circle
                key={`${row}-${col}`}
                cx={18 + col * 34}
                cy={28 + row * 20}
                r="1.2"
                fill="#3a2f55"
                opacity="0.45"
              />
            ))
          )}

          <rect x="18" y="28" width="118" height="100" rx="3" fill="#6a4a32"/>
          <rect x="26" y="36" width="102" height="78" fill="#0d1838"/>
          <rect x="26" y="36" width="14" height="78" fill="#7a3f62" opacity="0.85"/>
          <rect x="114" y="36" width="14" height="78" fill="#7a3f62" opacity="0.85"/>
          <circle cx="96" cy="58" r="10" fill="#f6ebc0"/>
          <circle cx="96" cy="58" r="6" fill="#efe0a2"/>
          <circle cx="48" cy="52" r="1.1" fill="#fff6cc"/>
          <circle cx="62" cy="70" r="1.1" fill="#fff6cc"/>
          <circle cx="54" cy="88" r="1.1" fill="#fff6cc"/>
          <circle cx="78" cy="48" r="1.1" fill="#fff6cc"/>
          <circle cx="88" cy="92" r="1.1" fill="#fff6cc"/>
          <circle cx="70" cy="60" r="0.8" fill="#fff6cc"/>
          <rect x="16" y="124" width="122" height="8" rx="1" fill="#7a5638"/>

          <rect x="352" y="32" width="96" height="104" rx="3" fill="#f2c6dc"/>
          <rect x="360" y="40" width="80" height="88" fill="#1a1428"/>
          <path d="M392 68c0-6 5-10 8-10s8 4 8 10c0 10-8 18-8 18s-8-8-8-18z" fill="#ff4d88"/>
          <rect x="384" y="98" width="12" height="6" fill="#7dffc3"/>
          <rect x="404" y="98" width="18" height="6" fill="#7dffc3"/>
          <rect x="396" y="104" width="8" height="6" fill="#7dffc3"/>

          <rect x="78" y="168" width="324" height="34" rx="2" fill="url(#deskGrad)"/>
          <rect x="78" y="168" width="324" height="6" fill="#efb56f"/>
          <rect x="92" y="202" width="296" height="46" fill="#8a552c"/>
          <rect x="92" y="202" width="296" height="5" fill="#6c401e"/>
          <rect x="104" y="248" width="16" height="16" fill="#6c401e"/>
          <rect x="360" y="248" width="16" height="16" fill="#6c401e"/>

          <rect x="104" y="148" width="22" height="20" rx="2" fill="#c45c48"/>
          <rect x="107" y="148" width="16" height="4" fill="#3a2a1c"/>
          <ellipse cx="108" cy="136" rx="10" ry="8" fill="#2f8a45"/>
          <ellipse cx="122" cy="132" rx="9" ry="8" fill="#3ea858"/>
          <ellipse cx="114" cy="126" rx="7" ry="6" fill="#56c46e"/>
          <rect x="112" y="140" width="5" height="10" fill="#246b34"/>

          <rect x="138" y="150" width="10" height="18" fill="#31468a"/>
          <rect x="148" y="146" width="10" height="22" fill="#8a3038"/>
          <rect x="158" y="152" width="9" height="16" fill="#2f6b4a"/>
          <rect x="140" y="154" width="6" height="2" fill="#d7e2ff"/>
          <rect x="150" y="150" width="6" height="2" fill="#ffd0d8"/>

          <rect x="352" y="150" width="28" height="18" rx="2" fill="#6a6a74"/>
          <rect x="363" y="126" width="5" height="24" fill="#8a8a94"/>
          <path d="M346 118h40l-8 16h-24z" fill="#f0d090"/>
          <path d="M352 122h28l-5 10h-18z" fill="#fff1c2"/>
          <circle cx="365.5" cy="138" r="28" fill="url(#lampLight)"/>

          <rect x="178" y="58" width="124" height="108" rx="4" fill="#d8d2c6"/>
          <rect x="178" y="58" width="124" height="108" rx="4" fill="none" stroke="#9c968c" stroke-width="2"/>
          <rect x="188" y="68" width="104" height="78" rx="2" fill="#151515"/>
          <rect x="194" y="74" width="92" height="60" rx="1" fill="#0c3326"/>
          <rect x="198" y="80" width="48" height="2.5" fill="#5dffb0"/>
          <rect x="198" y="88" width="36" height="2.5" fill="#3dcc88"/>
          <rect x="198" y="96" width="54" height="2.5" fill="#5dffb0"/>
          <rect x="198" y="104" width="28" height="2.5" fill="#3dcc88"/>
          <rect className="crt-cursor" x="230" y="112" width="8" height="8" fill="#b8ffd8"/>
          <circle cx="278" cy="138" r="3" fill="#39ff7a"/>
          <rect x="224" y="166" width="32" height="10" fill="#9a9a9a"/>
          <rect x="204" y="176" width="72" height="8" fill="#6e6e76"/>
          <ellipse cx="240" cy="100" rx="70" ry="48" fill="url(#screenLight)"/>

          <rect x="190" y="186" width="100" height="16" rx="2" fill="#2a2a32"/>
          {[0, 1, 2, 3, 4, 5, 6, 7].map(i => (
            <rect key={i} x={196 + i * 11} y="190" width="8" height="5" rx="0.6" fill="#4a4a56"/>
          ))}
          <rect x="302" y="190" width="18" height="12" rx="3" fill="#3a3a44"/>

          <rect x="172" y="224" width="136" height="34" rx="4" fill="#7a3058"/>
          <rect x="180" y="230" width="120" height="22" rx="3" fill="#9a4070"/>
          <rect x="186" y="218" width="108" height="10" rx="2" fill="#3a3a4e"/>

          <image href="/placeholders/pixel-buddy.svg" x="310" y="126" width="28" height="30" />
        </svg>

        <div className="lamp-glow" aria-hidden="true" />
        <div className="screen-glow" aria-hidden="true" />
        <button
          type="button"
          className="screen-hit"
          onClick={boot}
          disabled={booting}
          aria-label="Turn on the computer"
        />
      </div>

      <p className="room-hint">Click the glowing screen</p>

      {booting && (
        <div className="boot" role="status" aria-live="polite">
          <div className="boot-card">
            <div className="boot-card-title">
              <span>Loading...</span>
              <span>Madiha OS</span>
            </div>
            <div className="boot-card-body">
              {BOOT_LINES.map((line, index) => (
                <div
                  key={`${line}-${index}`}
                  className="boot-line"
                  style={{ animationDelay: `${index * 0.12}s` }}
                >
                  {line}
                </div>
              ))}
              <div className="boot-bar" aria-hidden="true">
                <div className="boot-bar-fill" style={{ width: `${progress}%` }} />
              </div>
              <p className="boot-caption">Preparing something sweet... Please wait.</p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
