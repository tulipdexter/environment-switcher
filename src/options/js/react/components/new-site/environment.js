import {h} from 'preact';

function Environment(props) {
    return (
        <fieldset>
            <div className="environment">
                <h4 className="environment__number">{props.id}</h4>
                <div className="environment__fields">
                    <div className="form-group">
                        {props.children}
                    </div>
                </div>
            </div>
        </fieldset>
    )
}

export {Environment};