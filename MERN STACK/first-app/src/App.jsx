import { useRef, useState, useEffect } from 'react'
import './App.css'

function App() {
  const canvasRef = useRef(null)
  const [isDrawing, setIsDrawing] = useState(false)
  const [color, setColor] = useState('#000000')
  const [brushSize, setBrushSize] = useState(5)
  const [darkMode, setDarkMode] = useState(false)
  const [tool, setTool] = useState('brush') // brush, eraser, rectangle, circle, line, text, triangle, eyedropper, stamp
  const [shapeStart, setShapeStart] = useState(null)
  const [fill, setFill] = useState(false)
  const [text, setText] = useState('')
  const [grid, setGrid] = useState(false)
  const [zoom, setZoom] = useState(1)
  const [stamps] = useState(['🎨', '🌟', '💖', '🔥', '🌈', '⭐', '🎯', '💎'])
  const [history, setHistory] = useState([])
  const [historyIndex, setHistoryIndex] = useState(-1)

  const saveState = () => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
    const newHistory = history.slice(0, historyIndex + 1)
    newHistory.push(imageData)
    setHistory(newHistory)
    setHistoryIndex(newHistory.length - 1)
  }

  const drawGrid = () => {
    if (!grid) return
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    ctx.strokeStyle = darkMode ? '#444' : '#ddd'
    ctx.lineWidth = 1
    for (let x = 0; x <= canvas.width; x += 20) {
      ctx.beginPath()
      ctx.moveTo(x, 0)
      ctx.lineTo(x, canvas.height)
      ctx.stroke()
    }
    for (let y = 0; y <= canvas.height; y += 20) {
      ctx.beginPath()
      ctx.moveTo(0, y)
      ctx.lineTo(canvas.width, y)
      ctx.stroke()
    }
  }

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    ctx.fillStyle = darkMode ? '#1a1a1a' : '#ffffff'
    ctx.fillRect(0, 0, canvas.width, canvas.height)
  }, [darkMode])

  const undo = () => {
    if (historyIndex > 0) {
      const canvas = canvasRef.current
      const ctx = canvas.getContext('2d')
      setHistoryIndex(historyIndex - 1)
      ctx.putImageData(history[historyIndex - 1], 0, 0)
    }
  }

  const redo = () => {
    if (historyIndex < history.length - 1) {
      const canvas = canvasRef.current
      const ctx = canvas.getContext('2d')
      setHistoryIndex(historyIndex + 1)
      ctx.putImageData(history[historyIndex + 1], 0, 0)
    }
  }

  const startDrawing = (e) => {
    const canvas = canvasRef.current
    const rect = canvas.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    if (tool === 'brush' || tool === 'eraser') {
      const ctx = canvas.getContext('2d')
      ctx.beginPath()
      ctx.moveTo(x, y)
      setIsDrawing(true)
    } else {
      setShapeStart({ x, y })
    }
  }

  const draw = (e) => {
    if (tool === 'brush' || tool === 'eraser') {
      if (!isDrawing) return
      const canvas = canvasRef.current
      const ctx = canvas.getContext('2d')
      const rect = canvas.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      ctx.lineTo(x, y)
      ctx.strokeStyle = tool === 'eraser' ? (darkMode ? '#1a1a1a' : '#ffffff') : color
      ctx.lineWidth = brushSize
      ctx.lineCap = 'round'
      ctx.stroke()
    }
  }

  const stopDrawing = (e) => {
    if (tool === 'brush' || tool === 'eraser') {
      if (isDrawing) {
        saveState()
      }
      setIsDrawing(false)
    } else if (tool === 'text' && text) {
      const canvas = canvasRef.current
      const ctx = canvas.getContext('2d')
      const rect = canvas.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      ctx.fillStyle = color
      ctx.font = `${brushSize * 2}px Arial`
      ctx.fillText(text, x, y)
      saveState()
    } else if (tool === 'stamp') {
      const canvas = canvasRef.current
      const ctx = canvas.getContext('2d')
      const rect = canvas.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      ctx.fillStyle = color
      ctx.font = `${brushSize * 3}px Arial`
      ctx.fillText(stamps[Math.floor(Math.random() * stamps.length)], x, y)
      saveState()
    } else if (tool === 'eyedropper') {
      const canvas = canvasRef.current
      const ctx = canvas.getContext('2d')
      const rect = canvas.getBoundingClientRect()
      const x = Math.floor(e.clientX - rect.left)
      const y = Math.floor(e.clientY - rect.top)
      const imageData = ctx.getImageData(x, y, 1, 1)
      const [r, g, b] = imageData.data
      const hex = `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`
      setColor(hex)
      setTool('brush') // switch back to brush
    } else if (shapeStart) {
      const canvas = canvasRef.current
      const ctx = canvas.getContext('2d')
      const rect = canvas.getBoundingClientRect()
      const endX = e.clientX - rect.left
      const endY = e.clientY - rect.top
      ctx.strokeStyle = color
      ctx.fillStyle = color
      ctx.lineWidth = brushSize
      ctx.lineCap = 'round'
      if (tool === 'rectangle') {
        const width = endX - shapeStart.x
        const height = endY - shapeStart.y
        if (fill) {
          ctx.fillRect(shapeStart.x, shapeStart.y, width, height)
        } else {
          ctx.strokeRect(shapeStart.x, shapeStart.y, width, height)
        }
      } else if (tool === 'circle') {
        const radius = Math.sqrt((endX - shapeStart.x) ** 2 + (endY - shapeStart.y) ** 2)
        ctx.beginPath()
        ctx.arc(shapeStart.x, shapeStart.y, radius, 0, 2 * Math.PI)
        if (fill) {
          ctx.fill()
        } else {
          ctx.stroke()
        }
      } else if (tool === 'triangle') {
        ctx.beginPath()
        ctx.moveTo(shapeStart.x, shapeStart.y)
        ctx.lineTo(endX, shapeStart.y)
        ctx.lineTo((shapeStart.x + endX) / 2, endY)
        ctx.closePath()
        if (fill) {
          ctx.fill()
        } else {
          ctx.stroke()
        }
      } else if (tool === 'line') {
        ctx.beginPath()
        ctx.moveTo(shapeStart.x, shapeStart.y)
        ctx.lineTo(endX, endY)
        ctx.stroke()
      }
      saveState()
      setShapeStart(null)
    }
  }

  const clearCanvas = () => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    ctx.fillStyle = darkMode ? '#1a1a1a' : '#ffffff'
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    drawGrid()
    saveState()
  }

  const saveCanvas = () => {
    const canvas = canvasRef.current
    const link = document.createElement('a')
    link.download = 'my-drawing.png'
    link.href = canvas.toDataURL()
    link.click()
  }

  const zoomIn = () => setZoom(Math.min(zoom + 0.2, 3))
  const zoomOut = () => setZoom(Math.max(zoom - 0.2, 0.5))
  const toggleDarkMode = () => {
    setDarkMode(!darkMode)
    document.body.classList.toggle('dark')
  }
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    for (let i = 0; i < 50; i++) {
      const x = Math.random() * canvas.width
      const y = Math.random() * canvas.height
      const size = Math.random() * 20 + 5
      const color = `hsl(${Math.random() * 360}, 70%, 50%)`
      ctx.fillStyle = color
      ctx.beginPath()
      ctx.arc(x, y, size, 0, 2 * Math.PI)
      ctx.fill()
    }
    saveState()
  }

  return (
    <div className="app">
      <h1>🎨 Creative Canvas</h1>
      <div className="controls">
        <div className="tool-group">
          <button className={tool === 'brush' ? 'active' : ''} onClick={() => setTool('brush')}>🖌️ Brush</button>
          <button className={tool === 'eraser' ? 'active' : ''} onClick={() => setTool('eraser')}>🧽 Eraser</button>
          <button className={tool === 'rectangle' ? 'active' : ''} onClick={() => setTool('rectangle')}>▭ Rectangle</button>
          <button className={tool === 'circle' ? 'active' : ''} onClick={() => setTool('circle')}>○ Circle</button>
          <button className={tool === 'triangle' ? 'active' : ''} onClick={() => setTool('triangle')}>△ Triangle</button>
          <button className={tool === 'line' ? 'active' : ''} onClick={() => setTool('line')}>━ Line</button>
          <button className={tool === 'text' ? 'active' : ''} onClick={() => setTool('text')}>📝 Text</button>
          <button className={tool === 'stamp' ? 'active' : ''} onClick={() => setTool('stamp')}>🏷️ Stamp</button>
          <button className={tool === 'eyedropper' ? 'active' : ''} onClick={() => setTool('eyedropper')}>💧 Eyedropper</button>
        </div>
        <label>
          Color:
          <input
            type="color"
            value={color}
            onChange={(e) => setColor(e.target.value)}
            disabled={tool === 'eraser'}
          />
        </label>
        <div className="color-palette">
          {['#000000', '#FFFFFF', '#FF0000', '#00FF00', '#0000FF', '#FFFF00', '#FF00FF', '#00FFFF', '#FFA500', '#800080', '#FFC0CB', '#A52A2A', '#808080', '#000080', '#008000', '#FF4500'].map(c => (
            <button
              key={c}
              style={{ backgroundColor: c }}
              onClick={() => setColor(c)}
              disabled={tool === 'eraser'}
            />
          ))}
        </div>
        <label>
          Size:
          <input
            type="range"
            min="1"
            max="50"
            value={brushSize}
            onChange={(e) => setBrushSize(e.target.value)}
          />
          {brushSize}px
        </label>
        <label>
          Fill Shapes:
          <input
            type="checkbox"
            checked={fill}
            onChange={(e) => setFill(e.target.checked)}
          />
        </label>
        <label>
          Grid:
          <input
            type="checkbox"
            checked={grid}
            onChange={(e) => setGrid(e.target.checked)}
          />
        </label>
        {tool === 'text' && (
          <label>
            Text:
            <input
              type="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Enter text"
            />
          </label>
        )}
        <div className="action-group">
          <button onClick={undo} disabled={historyIndex <= 0}>↶ Undo</button>
          <button onClick={redo} disabled={historyIndex >= history.length - 1}>↷ Redo</button>
          <button onClick={zoomIn}>🔍 Zoom In</button>
          <button onClick={zoomOut}>🔎 Zoom Out</button>
          <button onClick={resetZoom}>🔄 Reset Zoom</button>
          <button onClick={generateRandomArt}>🎲 Random Art</button>
          <button onClick={clearCanvas} className="clear-btn">🗑️ Clear</button>
          <button onClick={saveCanvas} className="save-btn">💾 Save</button>
          <button onClick={toggleDarkMode} className="theme-toggle">
            {darkMode ? '☀️ Light' : '🌙 Dark'}
          </button>
        </div>
      </div>
      <canvas
        ref={canvasRef}
        width={800}
        height={600}
        onMouseDown={startDrawing}
        onMouseMove={draw}
        onMouseUp={stopDrawing}
        onMouseLeave={stopDrawing}
        className="canvas"
        style={{ transform: `scale(${zoom})`, transformOrigin: 'top left' }}
      />
      <p className="instructions">
        Unleash your creativity! Use tools, colors, grid, and save your masterpieces.
      </p>
    </div>
  )
}

export default App
