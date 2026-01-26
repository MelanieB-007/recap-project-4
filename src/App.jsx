import { initialColors } from "./lib/colors";
import Color from "./Components/Color/Color";
import "./Components/Color/Color.css";

function App() {

    return (
        <div className="colors-grid">
            {initialColors.map(({id, hex, role, contrastText}) => (
            <Color
                key={id}
                color={hex}
                role={role}
                contrastText={contrastText} />
            ))}
        </div>
    );
}
export default App;
