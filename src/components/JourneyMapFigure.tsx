import './JourneyMapFigure.css'

const NOTE_SIZE = 47
const CANVAS_WIDTH = 1326
const CANVAS_HEIGHT = 520

type NoteType = 'persona' | 'activity' | 'task' | 'detail'

const NOTE_ICONS: Record<NoteType, string> = {
  persona: '/work/nokia/journey-persona-alt.svg',
  activity: '/work/nokia/journey-activity-alt.svg',
  task: '/work/nokia/journey-task-alt.svg',
  detail: '/work/nokia/journey-detail-alt.svg',
}

const LEGEND_NOTES: Array<{ type: NoteType; x: number }> = [
  { type: 'persona', x: 34 },
  { type: 'activity', x: 93 },
  { type: 'task', x: 152 },
  { type: 'detail', x: 211 },
]

const ROW_X = Array.from({ length: 14 }, (_, index) => 256 + index * 59)

const NOTES: Array<{ type: NoteType; x: number; y: number }> = [
  { type: 'activity', x: 34, y: 243 },
  { type: 'activity', x: 34, y: 379 },
  { type: 'persona', x: 93, y: 164 },
  { type: 'persona', x: 256, y: 164 },
  { type: 'persona', x: 1133, y: 164 },
  { type: 'persona', x: 1246, y: 164 },
  { type: 'task', x: 93, y: 243 },
  { type: 'task', x: 152, y: 243 },
  { type: 'task', x: 256, y: 243 },
  { type: 'task', x: 315, y: 243 },
  { type: 'task', x: 374, y: 243 },
  ...ROW_X.map((x) => ({ type: 'task' as const, x, y: 379 })),
  ...ROW_X.map((x) => ({ type: 'detail' as const, x, y: 438 })),
  { type: 'detail', x: 93, y: 301 },
  { type: 'detail', x: 152, y: 301 },
  { type: 'detail', x: 256, y: 301 },
  { type: 'detail', x: 315, y: 301 },
  { type: 'detail', x: 374, y: 301 },
  { type: 'task', x: 1133, y: 379 },
  { type: 'task', x: 1246, y: 379 },
  { type: 'task', x: 1246, y: 242 },
  { type: 'detail', x: 1133, y: 438 },
  { type: 'detail', x: 1246, y: 438 },
  { type: 'detail', x: 1246, y: 301 },
]

function noteStyle(x: number, y: number) {
  return {
    left: `${(x / CANVAS_WIDTH) * 100}%`,
    top: `${(y / CANVAS_HEIGHT) * 100}%`,
    width: `${(NOTE_SIZE / CANVAS_WIDTH) * 100}%`,
    height: `${(NOTE_SIZE / CANVAS_HEIGHT) * 100}%`,
  }
}

function JourneyNote({ type, x, y }: { type: NoteType; x: number; y: number }) {
  return (
    <img
      className="nokia-journey-map__note"
      src={NOTE_ICONS[type]}
      alt=""
      style={noteStyle(x, y)}
    />
  )
}

export default function JourneyMapFigure() {
  return (
    <div className="nokia-journey-map" aria-hidden>
      <div className="nokia-journey-map__legend">
        <span style={{ left: `${(31 / CANVAS_WIDTH) * 100}%` }}>Persona</span>
        <span style={{ left: `${(93 / CANVAS_WIDTH) * 100}%` }}>Activity</span>
        <span style={{ left: `${(161 / CANVAS_WIDTH) * 100}%` }}>Task</span>
        <span style={{ left: `${(216 / CANVAS_WIDTH) * 100}%` }}>Detail</span>
      </div>

      {LEGEND_NOTES.map((note) => (
        <JourneyNote key={`legend-${note.x}`} type={note.type} x={note.x} y={61} />
      ))}

      {NOTES.map((note, index) => (
        <JourneyNote key={`${note.type}-${note.x}-${note.y}-${index}`} {...note} />
      ))}
    </div>
  )
}
