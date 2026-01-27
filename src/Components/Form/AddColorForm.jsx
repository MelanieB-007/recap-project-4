import {useRef, useEffect, useState} from "react";

export default function AddColorForm({colors, setColors, setIsFormVisible, selectedColor,
                                         isEditMode = false, onCancel}) {
    const [role, setRole] = useState("primary");
    const [hex, setHex] = useState("#ff4a11");
    const [contrastText, setContrastText] = useState("#ffffff");

    const roleRef = useRef(null);
    const hexRef = useRef(null);
    const contrastRef = useRef(null);
    const submitRef = useRef(null);

    // Prefill für Edit-Modus
    useEffect(() => {
        if (isEditMode && selectedColor) {
            setRole(selectedColor.role || "primary");
            setHex(selectedColor.hex ||  "#ff4a11");
            setContrastText(selectedColor.contrastText || "#ffffff");
        } else {
            // Reset für Add-Modus
            setRole("primary");
            setHex("#ff4a11");
            setContrastText("#ffffff");
        }
    }, [isEditMode, selectedColor]);

    function updateHex(event) {
        setHex(event.target.value);
    }
    function updateContrastText(event) {
        setContrastText(event.target.value);
    }
    function updateRole(event) {
        setRole(event.target.value);
    }

    function addColor(event) {
        event.preventDefault();
        const newColor = {
            id: crypto.randomUUID(),
            role,
            hex,
            contrastText
        };
        setColors([newColor, ...colors]);
        submitRef.current?.blur();
        if (setIsFormVisible) {
            setIsFormVisible(false);
        }
        if (onCancel) {
            onCancel();
        }
    }

    function updateColor(event) {
        event.preventDefault();
        if (!selectedColor?.id) return;

        const updatedColor = {
            id: selectedColor.id,
            role,
            hex,
            contrastText
        };

        setColors(colors.map(c => c.id === selectedColor.id ? updatedColor : c));
        submitRef.current?.blur();
        if (onCancel) onCancel();
    }

    const handleSubmit = isEditMode ? updateColor : addColor;
    const buttonText = isEditMode ? "✎ Update Color" : "➕ Add Color";

    return (
        <form onSubmit={handleSubmit}>
            <label className="formAddButton__label">
                {isEditMode ? 'Edit' : 'New'} Role
            </label>
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

            <label className="formAddButton__label">
                {isEditMode ? 'Edit' : 'New'} Hex
            </label>
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

            <label className="formAddButton__label">
                {isEditMode ? 'Edit' : 'New'} Contrast Text
            </label>
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
                type="submit"
                className="formAddButton__input formAddButton__input--submit"
            >
                {buttonText}
            </button>
        </form>
    );
}
