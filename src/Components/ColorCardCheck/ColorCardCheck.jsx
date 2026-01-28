import {useState, useEffect} from 'react';
import {ArrowPathIcon } from '@heroicons/react/24/outline';

function ColorCardCheck({ bgColor, textColor, onContrastUpdate }) {
    const [contrastResult, setContrastResult] = useState(null);
    const [loading, setLoading] = useState(false);

    const checkContrast = async () => {
        const safeBg = (bgColor || '#000000').toLowerCase();
        const safeText = (textColor || '#ffffff').toLowerCase();

        if (!safeBg || !safeText) {
            return;
        }

        setLoading(true);
        try {
            const response = await fetch('https://www.aremycolorsaccessible.com/api/are-they', {
                method: 'POST',
                mode: 'cors',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ colors: [safeText, safeBg] }),
            });

            const data = await response.json();

            const cleanData = {
                Overall: data.overall || data.Overall || 'Nope',
                Contrast: data.contrast || data.Contrast || '0:1'
            };

            setContrastResult(cleanData);
            onContrastUpdate?.(cleanData);
        } catch (err) {
            setContrastResult({ Overall: 'Error' });
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (bgColor && textColor) {
            const quickFail = bgColor.toLowerCase() === textColor.toLowerCase();
            if (quickFail) {
                setContrastResult({ Overall: 'Nope' });
                return;
            }

            checkContrast();
        }
    }, [bgColor, textColor]);


    return (
        <div style={{
            display: 'flex', alignItems: 'center', gap: '12px',
            marginTop: '12px', fontSize: '14px', fontFamily: 'system-ui, sans-serif'
        }}>
            <span style={{ fontWeight: 500, color: '#374151' }}>Overall:</span>

            {loading ? (
                <span style={{ color: '#9ca3af' }}>loading...</span>
            ) : contrastResult?.Overall ? (
                <>
                    {contrastResult.Overall === 'Yup' && (
                        <span
                            role="img"
                            aria-label="WCAG AAA/AA konform"
                            style={{ fontSize: '20px', color: '#10b981' }}
                        >
                            ✅
                        </span>
                    )}
                    {contrastResult.Overall === 'Kinda' && (
                        <span
                            role="img"
                            aria-label="Teilkonform WCAG AA Large"
                            style={{ fontSize: '20px', color: '#f59e0b' }}
                        >
                            ⚠️
                        </span>
                    )}
                    {contrastResult.Overall === 'Nope' && (
                        <span
                            role="img"
                            aria-label="Nicht WCAG konform"
                            style={{ fontSize: '20px', color: '#ef4444' }}
                        >
                            ❌
                        </span>
                    )}
                </>
            ) : (
                <span style={{ color: '#9ca3af' }}>no data</span>
            )}
        </div>
    );
}

export default ColorCardCheck;