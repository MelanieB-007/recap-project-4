import Color from "./Components/Color/Color";
import "./Components/Color/Color.css";

function App() {
    return (
        <div className="colors-grid">  {/* Fragment – direkt in #root */}
            <Color
                color="#ff4a11"
                role="primary main"
                contrastText="#FFFFFF" />
        </div>
    );
}
export default App;
