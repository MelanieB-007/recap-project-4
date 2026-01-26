import { initialColors } from "./lib/colors";
import Color from "./Components/Color/Color";
import "./Components/Color/Color.css";
import AddColorForm from "./Components/Form/AddColorForm.jsx"
import "./Components/Form/Form.css";
import {useState} from "react";

function App() {
    const [colors, setColors] = useState(initialColors);

    return (
        <>
            <div className="formAddButton">
                <AddColorForm colors={colors} setColors={setColors} />
            </div>
            <div className="colors-grid">
                {colors.map(({id, hex, role, contrastText}) => (
                <Color
                    key={id}
                    color={hex}
                    role={role}
                    contrastText={contrastText} />
                ))}
            </div>
        </>
    );
}
export default App;
