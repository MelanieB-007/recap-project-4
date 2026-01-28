import {useState, useEffect} from 'react';
import {ArrowPathIcon } from '@heroicons/react/24/outline';

function ColorCardCheck({ bgColor, textColor, onContrastUpdate }) {
    console.log('🎨 COMPONENT MOUNTED - props:', bgColor, textColor);
    const [contrastResult, setContrastResult] = useState(null);
    const [loading, setLoading] = useState(false);

    const checkContrast = async () => {
        console.log('🔍 CHECK STARTED - bg:', bgColor, 'text:', textColor);

        const safeBg = (bgColor || '#ff4a11').toLowerCase();
        const safeText = (textColor || '#ffffff').toLowerCase();

        if (!safeBg || !safeText) return;

        setLoading(true);
        try {
            const response = await fetch('https://www.aremycolorsaccessible.com/api/are-they', {
                method: 'POST',
                mode: 'cors',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ colors: [safeText, safeBg] }),
            });

            const data = await response.json();
            console.log('=== DEBUG WEISS/WEISS ===');
            console.log('SENT:', textColor.toLowerCase(), bgColor.toLowerCase());
            console.log('RAW API FULL:', JSON.stringify(data, null, 2));
            console.log('Keys:', Object.keys(data));
            console.log('Overall:', data.Overall, 'overall:', data.overall);
            console.log('small:', data.small, 'large:', data.large);
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
        console.log('⚡ useEffect:', bgColor, textColor);  // Immer loggt!

        if (bgColor && textColor) {
            // Sofort local Fallback checken (wenn API langsam/offline)
            const quickFail = bgColor.toLowerCase() === textColor.toLowerCase();
            if (quickFail) {
                console.log('🚫 LOCAL FAIL: Gleiche Farben!');
                setContrastResult({ Overall: 'Nope' });
                return;
            }

            // API Call (mit Fallback)
            checkContrast();
        }
    }, [bgColor, textColor]);


    console.log('🎨 RENDER - Overall:', contrastResult?.Overall);
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

            <button
                onClick={checkContrast}
                disabled={loading}
                style={{
                    border: 'none', background: 'rgba(0,0,0,0.1)', borderRadius: '4px',
                    width: '28px', height: '28px', cursor: loading ? 'not-allowed' : 'pointer',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    opacity: loading ? 0.4 : 0.8, transition: 'all 0.2s ease'
                }}
                title="Re-check"
            >
                <ArrowPathIcon
                    style={{ width: '16px', height: '16px' }}
                />
            </button>
        </div>
    );
}

export default ColorCardCheck;
