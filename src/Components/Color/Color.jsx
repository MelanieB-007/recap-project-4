import AddColorForm from "../Form/AddColorForm.jsx";

export default function Color({ color, role, contrastText, id, selectedColor, colors, setColors, onDelete, onEdit }) {
    const isEditing = !!selectedColor;
    const borderStyle = `4px solid ${color}`;

    if (!isEditing) {
        return (
            <div
                className="color-card"
                style={{
                    backgroundColor: color,
                    color: contrastText,
                    border: borderStyle
                }}
            >
                <div className="color-display">
                    <span className="color-hex">{color} </span>
                    <button
                        className="button copy-btn"
                        onClick={async () => {
                            try {
                                await navigator.clipboard.writeText(color);
                            } catch (err) {
                                console.error('Clipboard error:', err);
                            }
                        }}
                        title="Copy color"
                    >
                        📋
                    </button>
                </div>

                <div className="color-role">
                    {role || "primary"}
                </div>
                <div className="color-contrast">
                    contrast: {contrastText || "white"}
                </div>
                <button
                    className="button edit-button"
                    onClick={() => onEdit(id)}
                    aria-label="change color"
                >
                    ✎
                </button>
                <button
                    className="button delete-button"
                    onClick={() => onDelete(id)}
                    aria-label="delete Color"
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
                    className="button close-edit-button"
                    onClick={() => onEdit(null)}
                >
                    ❌
                </button>
            </div>

            <AddColorForm
                colors = {colors}
                setColors = {setColors}
                selectedColor = {selectedColor}
                isEditMode = {true}
                onCancel = {() => onEdit(null)}
            />
        </div>
    );
}
