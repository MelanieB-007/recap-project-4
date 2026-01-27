import {useState} from "react";

export default function AddColorForm({colors, setColors}){
    const [hex, setHex] = useState("#ff4a11");
    const [contrastText, setContrastText] = useState("#ffffff");

    const updateHex = (e) => {
        setHex(e.target.value);
    }

    const updateContrastText = (e) => {
        setContrastText(e.target.value);
    }
    function addColor(event){
        event.preventDefault();

        const form = event.target;
        const role = form.elements.role.value;
        const hex = form.elements.hex.value;
        const contrastText = form.elements.contrasttext.value;

        const newColor = {
            id: crypto.randomUUID(), role, hex, contrastText
        };

        setColors([newColor, ...colors]);
    }

    return (
        <form onSubmit={addColor}>
            <label className="formAddButton__label">
                Role
            </label>
            <input
                id="role"
                name="role"
                type="text"
                placeholder="primary"
                className="formAddButton__input" />

            <label className="formAddButton__label">
                Hex
            </label>
            <div className="formAddButton__input-row">
                <input
                    id="hex"
                    name="hex"
                    type="text"
                    value={hex}
                    onChange={updateHex}
                    placeholder={hex}
                    className="formAddButton__input" />

                <input
                    name="hexcolor"
                    type="color"
                    value={hex}
                    onChange={updateHex}
                    className="formAddButton__input formAddButton__input--color" />

            </div>

            <label className="formAddButton__label">
                Contrast Text
            </label>
            <div className="formAddButton__input-row">
                <input
                    id="contrasttext"
                    name="contrasttext"
                    type="text"
                    value={contrastText}
                    onChange={updateContrastText}
                    placeholder={contrastText}
                    className="formAddButton__input" />

                <input
                    name="contrast-textcolor"
                    type="color"
                    value={contrastText}
                    onChange={updateContrastText}
                    className="formAddButton__input formAddButton__input--color" />

            </div>

            <input
                name="add-color"
                type="submit"
                value="➕ Add Color"
                className="formAddButton__input formAddButton__input--submit" />
        </form>
    );
}