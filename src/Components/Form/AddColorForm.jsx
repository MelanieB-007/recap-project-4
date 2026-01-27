import { useState, useRef } from "react";

export default function AddColorForm({ colors, setColors, setIsFormVisible }) {
    const [role, setRole] = useState('primary');
    const [hex, setHex] = useState("#ff4a11");
    const [contrastText, setContrastText] = useState("#ffffff");

    const roleRef = useRef(null);
    const hexRef = useRef(null);
    const contrastRef = useRef(null);
    const submitRef = useRef(null);

    const updateHex = (e) => setHex(e.target.value);
    const updateContrastText = (e) => setContrastText(e.target.value);
    const updateRole = (e) => setRole(e.target.value);

    const addColor = (event) => {
        event.preventDefault();


        const newColor = {
            id: crypto.randomUUID(),
            role,
            hex,
            contrastText
        };
        setColors([newColor, ...colors]);
        submitRef.current?.blur();
        setIsFormVisible(false);
    };

    return (
        <form>
            <label className="formAddButton__label">Role</label>
            <input
                ref={roleRef}
                id="role"
                name="role"
                type="text"
                value={role}
                onChange={updateRole}
                placeholder={role}
                onFocus={() => roleRef.current?.select()}
                className="formAddButton__input"
            />

            <label className="formAddButton__label">Hex</label>
            <div className="formAddButton__input-row">
                <input
                    ref={hexRef}
                    id="hex"
                    name="hex"
                    type="text"
                    value={hex}
                    onChange={updateHex}
                    placeholder={hex}
                    onFocus={() => hexRef.current?.select()}
                    className="formAddButton__input"
                />
                <input
                    type="color"
                    name="hexcolor"
                    value={hex}
                    onChange={updateHex}
                    className="formAddButton__input formAddButton__input--color"
                />
            </div>

            <label className="formAddButton__label">Contrast Text</label>
            <div className="formAddButton__input-row">
                <input
                    ref={contrastRef}
                    id="contrasttext"
                    name="contrasttext"
                    type="text"
                    value={contrastText}
                    onChange={updateContrastText}
                    placeholder={contrastText}
                    onFocus={() => contrastRef.current?.select()}
                    className="formAddButton__input"
                />
                <input
                    type="color"
                    name="contrast-textcolor"
                    value={contrastText}
                    onChange={updateContrastText}
                    className="formAddButton__input formAddButton__input--color"
                />
            </div>

            <button
                ref={submitRef}
                type="button"
                onClick={addColor}
                className="formAddButton__input formAddButton__input--submit"
            >
                ➕ Add Color
            </button>
        </form>
    );
}
