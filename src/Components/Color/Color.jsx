export default function Color({ color, role, contrastText }) {
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
      </div>
  );
}
