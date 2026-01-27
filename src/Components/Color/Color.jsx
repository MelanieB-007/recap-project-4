import AddColorForm from "../Form/AddColorForm.jsx";

export default function Color({ color, role, contrastText, id, selectedColor, colors, setColors, onDelete, onEdit }) {
    const isEditing = !!selectedColor;
    const borderStyle = `4px solid ${color}`;

    if(!isEditing) {
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
                <div>{role || 'primary'}</div>
                <div>contrast: {contrastText || 'white'}</div>
                <button
                    className="edit-btn"
                    onClick={() => onEdit(id)}
                    aria-label="Farbe ändern"
                >
                    ✎
                </button>
                <button
                    className="delete-btn"
                    onClick={() => onDelete(id)}
                    aria-label="Farbe löschen"
                >
                    🗑️
                </button>
            </div>
        );
    }

    return (
        <div className="formAddButton">

            <div className="edit-header">
                <h3>Edit Color</h3>
                <button
                    className="close-edit"
                    onClick={() => onEdit(null)} // cancelEdit() triggert
                >
                    ❌
                </button>
            </div>

            <AddColorForm
                colors={colors}
                setColors={setColors}
                selectedColor={selectedColor}
                setIsFormVisible={false}
                onCancel={() => onEdit(null)}
            />

        </div>
    )
}
