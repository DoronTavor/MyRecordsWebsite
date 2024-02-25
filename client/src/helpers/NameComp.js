import React from 'react';

const NameComp = (props) => {
    // Function to split name into lines based on parentheses
    const splitName = (name) => {
        let lines = [];
        let startIndex = name.indexOf('(');
        let endIndex = name.indexOf(')');

        // If parentheses are found at the beginning
        if (startIndex === 0 && endIndex > 0) {
            lines.push(name.substring(0, endIndex + 1));
            lines.push(name.substring(endIndex + 1).trim());
        }
        // If parentheses are found at the end
        else if (startIndex > 0 && endIndex === name.length - 1) {
            lines.push(name.substring(0, startIndex).trim());
            lines.push(name.substring(startIndex));
        }
        // Otherwise, no parentheses found or found in the middle
        else {
            lines.push(name);
        }

        return lines.map((line, index) => <div key={index}>{line}</div>);
    };

    return (
        <div className="centeredName">
            <h1>{splitName(props.name)}</h1>
        </div>
    );
};

export default NameComp;
