export default function Color({ color, role, contrastText, id, onDelete, onEdit }) {
    const borderStyle = `4px solid ${color}`;

  return (
      <div
          className="color-card"
          style={{
              backgroundColor: color,
              color: contrastText,
              border: borderStyle
          }}
      >
          <div>{color}</div>
          <div>{role|| 'primary'}</div>
          <div>contrast: {contrastText || 'white'}</div>
          <button
              className="edit-btn"
              onClick={() => onEdit(id)}
              aria-label="Farbe ändern"
          >
              🗑️
          </button>
          <button
              className="delete-btn"
              onClick={() => onDelete(id)}
              aria-label="Farbe löschen"
          >
              ✎
          </button>
      </div>
  );
}
