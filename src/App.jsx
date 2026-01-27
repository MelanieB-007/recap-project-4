import { initialColors } from "./lib/colors";
import "./App.css";

import Color from "./Components/Color/Color";
import "./Components/Color/Color.css";

import AddColorForm from "./Components/Form/AddColorForm.jsx"
import "./Components/Form/AddColorForm.css";

import {useState} from "react";

function App() {
    const [colors, setColors] = useState(initialColors);
    const [isFormVisible, setIsFormVisible] = useState(false);

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
                {colors.map(({id, hex, role, contrastText}) => (
                <Color
                    key={id}
                    color={hex}
                    role={role}
                    contrastText={contrastText}
                />
                ))}
            </div>
        </>
    );
}
export default App;