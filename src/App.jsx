import { initialColors } from "./lib/colors";
import "./App.css";

import AddColorForm from "./Components/Form/AddColorForm.jsx"
import "./Components/Form/AddColorForm.css";

import Color from "./Components/Color/Color";
import "./Components/Color/Color.css";

import {useState} from "react";

function App() {
    const [colors, setColors] = useState(initialColors);
    const [isFormVisible, setIsFormVisible] = useState(false);
    const [selectedId, setSelectedId] = useState(null);

    function editColor(id) {
        setSelectedId( id);
    }

    function cancelEdit() {
        setSelectedId(null);
    }

    function deleteColor (id){
        const colorHex = colors.find(c => c.id === id)?.hex || 'diese Farbe';
        const confirm = window.confirm(
            `Do you really want to delete the color "${colorHex}"?\nThis action cannot be undone.`
        );

        if(confirm) {
            setColors(colors.filter(c => c.id !== id));
        }
    }

    return (
        <>
            <div className="input-area">
                <button
                    className="plus-toggle-btn"
                    onClick={() => setIsFormVisible(!isFormVisible)}
                    tabIndex={-1}
                >
                    {isFormVisible ? '➖' : '➕'}
                </button>
            </div>

            {isFormVisible && (
                <div className="formAddButton">
                    <AddColorForm
                        colors={colors}
                        setColors={setColors}
                        setIsFormVisible={setIsFormVisible}
                    />
                </div>
            )}

            <div className="colors-grid">
                {colors.length === 0 ? (
                    <div className="empty-state">
                        No colors yet. ➕ Add your first color!
                    </div>
                ) : (
                    colors.map(({id, hex, role, contrastText}) => (
                    <Color
                        key={id}
                        id={id}
                        color={hex}
                        role={role}
                        contrastText={contrastText}
                        selectedColor={selectedId === id ? {id, hex, role, contrastText} : null}
                        colors={colors}
                        setColors={setColors}
                        onEdit={editColor}
                        onDelete={deleteColor}
                    />
                    ))
                )}
            </div>
        </>
    );
}
export default App;