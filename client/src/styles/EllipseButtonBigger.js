import React from 'react';

const EllipseButtonBigger = (text) => {
    const buttonStyle = {
        borderRadius: '50%', // Makes the button an ellipse
        padding: '10px 20px', // Adjust padding as needed
        backgroundColor: 'lightblue',
        border: 'none',
        fontSize: '16px', // Adjust font size as needed
        fontFamily: 'inherit', // Uses the default font
        cursor: 'pointer',
    };

    return (
        <button style={buttonStyle}>
            {text}
        </button>
    );
};

export default EllipseButtonBigger;