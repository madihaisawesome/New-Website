import { useMemo, useState } from 'react'
import './Minesweeper.css'

const SIZE = 9
const MINES = 10

function buildBoard(safeIndex = -1) {
  const mines = new Set()
  while (mines.size < MINES) {
    const spot = Math.floor(Math.random() * SIZE * SIZE)
    if (spot === safeIndex) continue
    mines.add(spot)
  }

  return Array.from({ length: SIZE * SIZE }, (_, index) => {
    if (mines.has(index)) return { mine: true, count: 0, open: false, flag: false }
    const x = index % SIZE
    const y = Math.floor(index / SIZE)
    let count = 0
    for (let dy = -1; dy <= 1; dy += 1) {
      for (let dx = -1; dx <= 1; dx += 1) {
        if (!dx && !dy) continue
        const nx = x + dx
        const ny = y + dy
        if (nx < 0 || ny < 0 || nx >= SIZE || ny >= SIZE) continue
        if (mines.has(ny * SIZE + nx)) count += 1
      }
    }
    return { mine: false, count, open: false, flag: false }
  })
}

function floodOpen(board, start) {
  const next = board.map(cell => ({ ...cell }))
  const stack = [start]
  while (stack.length) {
    const index = stack.pop()
    const cell = next[index]
    if (!cell || cell.open || cell.flag || cell.mine) continue
    cell.open = true
    if (cell.count !== 0) continue
    const x = index % SIZE
    const y = Math.floor(index / SIZE)
    for (let dy = -1; dy <= 1; dy += 1) {
      for (let dx = -1; dx <= 1; dx += 1) {
        if (!dx && !dy) continue
        const nx = x + dx
        const ny = y + dy
        if (nx < 0 || ny < 0 || nx >= SIZE || ny >= SIZE) continue
        stack.push(ny * SIZE + nx)
      }
    }
  }
  return next
}

export default function Minesweeper() {
  const [board, setBoard] = useState(() => buildBoard())
  const [started, setStarted] = useState(false)
  const [dead, setDead] = useState(false)
  const [won, setWon] = useState(false)

  const flags = useMemo(() => board.filter(cell => cell.flag).length, [board])
  const face = dead ? '😵' : won ? '😎' : '🙂'

  const reset = () => {
    setBoard(buildBoard())
    setStarted(false)
    setDead(false)
    setWon(false)
  }

  const openCell = index => {
    if (dead || won) return
    setBoard(current => {
      let next = current.map(cell => ({ ...cell }))
      if (!started) {
        next = buildBoard(index)
        setStarted(true)
      }
      const cell = next[index]
      if (!cell || cell.open || cell.flag) return current
      if (cell.mine) {
        next = next.map(item => (item.mine ? { ...item, open: true } : item))
        setDead(true)
        return next
      }
      next = floodOpen(next, index)
      const complete = next.every(item => item.mine || item.open)
      if (complete) setWon(true)
      return next
    })
  }

  const flagCell = (event, index) => {
    event.preventDefault()
    if (dead || won) return
    setBoard(current => current.map((cell, i) => (
      i === index && !cell.open ? { ...cell, flag: !cell.flag } : cell
    )))
  }

  return (
    <div className="mine-app">
      <div className="mine-toolbar">
        <div className="mine-counter">{String(Math.max(0, MINES - flags)).padStart(3, '0')}</div>
        <button type="button" className="mine-face" onClick={reset} aria-label="New game">
          {face}
        </button>
        <div className="mine-counter">{won ? 'WIN' : dead ? 'BOOM' : '9x9'}</div>
      </div>
      <div className="mine-grid" style={{ gridTemplateColumns: `repeat(${SIZE}, 24px)` }}>
        {board.map((cell, index) => (
          <button
            key={index}
            type="button"
            className={`mine-cell ${cell.open ? 'is-open' : ''} ${cell.flag ? 'is-flag' : ''}`}
            onClick={() => openCell(index)}
            onContextMenu={event => flagCell(event, index)}
          >
            {cell.open && cell.mine && '💣'}
            {cell.open && !cell.mine && cell.count > 0 && (
              <span className={`mine-n mine-n-${cell.count}`}>{cell.count}</span>
            )}
            {!cell.open && cell.flag && '🚩'}
          </button>
        ))}
      </div>
      <p className="mine-hint">Left click open · right click flag</p>
    </div>
  )
}
