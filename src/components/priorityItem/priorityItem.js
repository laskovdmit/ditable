import React from "react";
import styled from 'styled-components';

const StyledPriorityItem = styled.div`
    width: 30px;
    height: 30px;
    position: relative;

    :after, :before {
        content: "";

        height: 3px;
        position: absolute;

        transform: translate(0, -50%);
        ${props => props.all}
    }

    :after {
        ${props => props.after}
    }
    
    :before {
        ${props => props.before}
    }
`;

const PriorityItem = ({priority, color}) => {
    let before, after, all;

    switch (priority) {
        case "5":
            all = `
                width: 20px;
                top: 8px;
                background-color: ${color};
            `;
            after = `
                left: 11px;
                transform: rotate(45deg);
                box-shadow: 8px 8px 0 0 ${color};
            `;
            before = `
                left: -1px;
                transform: rotate(-45deg);
                box-shadow: -8px 8px 0 0 ${color};
            `;
            break;
        case "4":
            all = `
                width: 20px;
                top: 14px;
                background-color: ${color};
            `;
            after = `
                left: 11px;
                transform: rotate(45deg);
            `;
            before = `
                left: -1px;
                transform: rotate(-45deg);
            `;
            break;
        case "3":
            all = `
                width: 30px;
                top: 10px;
                background-color: ${color};
            `;
            after = `
                box-shadow: 0 10px 0 0 ${color};
            `;
            before = `
                box-shadow: 0 10px 0 0 ${color};
            `;
            break;
        case "2":
            all = `
                width: 20px;
                top: 14px;
                background-color: ${color};
            `;
            after = `
                left: 11px;
                transform: rotate(-45deg);
            `;
            before = `
                left: -1px;
                transform: rotate(45deg);
            `;
            break;
        default:
            all = `
                width: 20px;
                top: 8px;
                background-color: ${color};
            `;
            after = `
                left: -1px;
                transform: rotate(45deg);
                box-shadow: 8px 8px 0 0 ${color};
            `;
            before = `
                left: 11px;
                transform: rotate(-45deg);
                box-shadow: -8px 8px 0 0 ${color};
            `;
            break;
    }

    return (
        <StyledPriorityItem all={all} after={after} before={before}/>
    );
};

export default PriorityItem;