import { useEffect, useRef, useState } from 'react'
import './Room.css'

const BOOT_LINES = [
  'Madiha OS 1.0',
  '',
  'Loading Home........... OK',
  'Loading Projects....... OK',
  'Loading Education...... OK',
  'Loading Skills......... OK',
  'Loading Resume......... OK',
  '',
  'Starting desktop_',
]

export default function Room({ onBoot }) {
  const [booting, setBooting] = useState(false)
  const timerRef = useRef(null)

  useEffect(() => () => clearTimeout(timerRef.current), [])

  const boot = () => {
    if (booting) return
    setBooting(true)
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    timerRef.current = setTimeout(onBoot, reduced ? 250 : 1700)
  }

  return (
    <div className={`room ${booting ? 'is-booting' : ''}`}>
      <div className="room-frame">
        <svg
          className="room-art"
          viewBox="0 0 160 90"
          role="img"
          aria-label="A pixel-art desk at night, with a glowing computer screen"
        >
          <rect width="160" height="62" fill="#241c3b" />
          <rect width="160" height="8" fill="#1a142c" />
          <rect y="58" width="160" height="4" fill="#2a221c" />
          <rect y="62" width="160" height="28" fill="#5c3b2a" />
          <rect y="70" width="160" height="1" fill="#3e271c" />
          <rect y="78" width="160" height="1" fill="#3e271c" />
          <rect y="86" width="160" height="1" fill="#3e271c" />

          <rect x="6" y="10" width="42" height="36" fill="#5a3c28" />
          <rect x="9" y="13" width="36" height="28" fill="#0c1430" />
          <rect x="9" y="13" width="5" height="28" fill="#6d3458" />
          <rect x="40" y="13" width="5" height="28" fill="#6d3458" />
          <rect x="30" y="18" width="8" height="8" fill="#f4e7b8" />
          <rect x="34" y="20" width="3" height="3" fill="#d9c98a" />
          <rect x="16" y="18" width="1" height="1" fill="#fff6cc" />
          <rect x="22" y="24" width="1" height="1" fill="#fff6cc" />
          <rect x="18" y="30" width="1" height="1" fill="#fff6cc" />
          <rect x="26" y="16" width="1" height="1" fill="#fff6cc" />
          <rect x="36" y="32" width="1" height="1" fill="#fff6cc" />
          <rect x="5" y="44" width="44" height="3" fill="#6b4a30" />

          <rect x="118" y="12" width="32" height="36" fill="#f0c6dc" />
          <rect x="120" y="14" width="28" height="32" fill="#1a1428" />
          <rect x="130" y="22" width="2" height="2" fill="#ff4d88" />
          <rect x="128" y="24" width="6" height="2" fill="#ff4d88" />
          <rect x="128" y="26" width="6" height="2" fill="#ff4d88" />
          <rect x="130" y="28" width="2" height="2" fill="#ff4d88" />
          <rect x="126" y="34" width="4" height="2" fill="#7dffc3" />
          <rect x="132" y="34" width="6" height="2" fill="#7dffc3" />
          <rect x="130" y="36" width="2" height="2" fill="#7dffc3" />

          <rect x="48" y="74" width="72" height="14" fill="#7a3058" />
          <rect x="50" y="76" width="68" height="10" fill="#9a4070" />

          <rect x="28" y="56" width="108" height="12" fill="#c4843e" />
          <rect x="28" y="56" width="108" height="2" fill="#e0a45c" />
          <rect x="32" y="68" width="100" height="16" fill="#8a552c" />
          <rect x="32" y="68" width="100" height="2" fill="#6c401e" />
          <rect x="36" y="84" width="6" height="6" fill="#6c401e" />
          <rect x="122" y="84" width="6" height="6" fill="#6c401e" />

          <rect x="36" y="48" width="8" height="8" fill="#c45c48" />
          <rect x="37" y="48" width="6" height="2" fill="#3a2a1c" />
          <rect x="34" y="42" width="8" height="6" fill="#2f8a45" />
          <rect x="40" y="40" width="6" height="6" fill="#3ea858" />
          <rect x="38" y="46" width="2" height="4" fill="#246b34" />

          <rect x="48" y="50" width="8" height="6" fill="#31468a" />
          <rect x="50" y="46" width="7" height="6" fill="#8a3038" />

          <rect x="118" y="50" width="10" height="6" fill="#6a6a74" />
          <rect x="122" y="42" width="2" height="8" fill="#8a8a94" />
          <rect x="116" y="34" width="14" height="8" fill="#f0d090" />
          <rect x="118" y="36" width="10" height="4" fill="#fff1c2" />

          <rect x="60" y="20" width="42" height="36" fill="#d8d2c6" />
          <rect x="63" y="23" width="36" height="26" fill="#1a1a1a" />
          <rect x="65" y="25" width="32" height="20" fill="#0c3326" />
          <rect x="66" y="27" width="16" height="1" fill="#5dffb0" />
          <rect x="66" y="30" width="12" height="1" fill="#3dcc88" />
          <rect x="66" y="33" width="18" height="1" fill="#5dffb0" />
          <rect x="66" y="36" width="10" height="1" fill="#3dcc88" />
          <rect className="crt-cursor" x="78" y="39" width="3" height="3" fill="#b8ffd8" />
          <rect x="94" y="46" width="3" height="2" fill="#39ff7a" />
          <rect x="76" y="56" width="10" height="4" fill="#9a9a9a" />
          <rect x="68" y="60" width="26" height="3" fill="#6e6e76" />

          <rect x="64" y="63" width="34" height="5" fill="#2a2a32" />
          <rect x="66" y="64" width="4" height="2" fill="#4a4a56" />
          <rect x="72" y="64" width="4" height="2" fill="#4a4a56" />
          <rect x="78" y="64" width="4" height="2" fill="#4a4a56" />
          <rect x="84" y="64" width="4" height="2" fill="#4a4a56" />
          <rect x="90" y="64" width="4" height="2" fill="#4a4a56" />
          <rect x="102" y="64" width="7" height="4" fill="#3a3a44" />

          <rect x="58" y="76" width="48" height="12" fill="#2c2c3c" />
          <rect x="62" y="74" width="40" height="4" fill="#3a3a4e" />

          <image href="/placeholders/pixel-buddy.svg" x="104" y="42" width="16" height="18" />
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
          {BOOT_LINES.map((line, index) => (
            <div
              key={`${line}-${index}`}
              className="boot-line"
              style={{ animationDelay: `${index * 0.16}s` }}
            >
              {line || '\u00A0'}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
