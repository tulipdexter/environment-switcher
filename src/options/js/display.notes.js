class DisplayNotes extends Component {

    constructor(props) {
        super(props);

        this.state = {
            loading: true
        };

        this.add = this.add.bind(this);

        get(['sites'])
            .then(data => {
                if (data.length) {
                    this.setState({items: data});
                } else {
                    this.setState({empty: true});
                }
            });
    }

    add() {
        this.setState({adding: true});
    }

    render() {
        const state = this.state;

        if (state.loading) {
            return <h1>Loading!!!!</h1>;
        }

        let content;

        if (state.empty) {
            return <p>Monkey add stuff</p>;
        } else  if (state.adding) {
            content = <AddSite/>;
        } else {
            content = <ItemsDisplay items={state.items} />;
        }

        return (
            <form>
                <button onClick={this.add}>
                    { content }
            </form>
    );
    }
    }

    preact.render(new )