import {h} from 'preact';

function Formfield(props) {
    return (
        <div class={"form-field" + (props.hasFocus ? " has-focus" : "")}>
            <label for={props.name} class="form-field__label">{props.label}</label>
            {props.children}
            {(!props.isValid && props.isEmpty) && <span class="form-field__helper" aria-live="polite">Required</span>}
            {(!props.isValid && !props.isEmpty && !props.customValidity) && <span class="form-field__helper form-field__helper--error" aria-live="polite">{props.errorMessage}</span>}
            {(props.customValidity && props.customValidity.length > 0) && <span class="form-field__helper form-field__helper--error" aria-live="polite">{props.customValidity}</span>}
        </div>
    )
}

export {Formfield};

/**
 * Notes
 * Custom validity is based on a string
 * If the string is empty, it is valid. If it is not empty, it is invalid and the string is the error that will show.
 * An empty string in JavaScript is falsey, which is why `!props.customValidity` works.
 */