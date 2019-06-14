import {h, render, Component} from 'preact';
import './modal.css';

class Modal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false
        }
    }

    open() {
        this.setState({
            open: true
        })
    }

    close() {
        this.setState({
            open: false
        }, () => {
            this.props.onClose();
        });
    }

    componentDidMount() {
        this.open();
        document.addEventListener('keydown', e => {
            if (e.key === 'Escape') {
                this.close();
            }
        });
    }

    render(props, {open}, context) {
        const {render} = props;
        return (
            <div>
            {open &&
                <div class="modal">
                    {/* passing the close function to the render function as parameters */}
                    {/* it's the parents job to close the modal, whenever it needs */}
                    {render({close: this.close.bind(this)})}
                </div>
            }
            </div>
        )
    }
}

export {Modal};