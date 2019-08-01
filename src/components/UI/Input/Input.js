import React from 'react';
import classes from './Input.css';

const input = (props) => {
    let inputElement = null;
    // Input Element class set as initial CSS
    const inputClasses = [classes.InputElement];
    
    // if invalid AND shouldValidate AND touched are all true then push Invalid CCS class to inputs
    if (props.invalid && props.shouldValidate && props.touched) {
        inputClasses.push(classes.Invalid);
    }

    // Dynamic switch statement to render input components from State on ContactData.js
    switch (props.elementType) {
        case ('input'): 
            inputElement = <input 
                className={inputClasses.join(' ')}
                {...props.elementConfig} 
                value={props.value} onChange={props.changed}/>;
            break;
        case ('textarea'):
            inputElement = <textarea 
                className={inputClasses.join(' ')} 
                {...props.elementConfig} 
                value={props.value} onChange={props.changed}/>;
            break;
        case ('select'):
            inputElement = (
                <select 
                    className={inputClasses.join(' ')} 
                    value={props.value} onChange={props.changed}>
                    {props.elementConfig.options.map(option => (
                        <option value={option.value} key={option.value}>
                            {option.displayValue}
                        </option>
                    ))}
                </select> );
                break;
        default:
            inputElement = <input 
                className={inputClasses.join(' ')} 
                {...props.elementConfig} 
                value={props.value} onChange={props.changed}/>;
    }

    return(
        <div className={classes.Input}>
            <label className={classes.Label}>{props.label}</label>
            {inputElement}
        </div>
    );
};

export default input;