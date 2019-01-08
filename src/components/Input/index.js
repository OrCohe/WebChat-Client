import React from 'react';

class Input extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            checked: true,
            value: '',
            arr: []
        }
    }
    componentDidUpdate() {
        if (this.props.type === "checkbox") {
            this.props.callback(this.state.checked);
        } else {
            this.props.callback(this.state.value);
        }
        
    }
    addLine() {
        if (this.state.value.trim().length > 0) {
            const newArr = [...this.state.arr];
            newArr.push(this.state.value);
            this.setState({arr: newArr, value: ''});
        }
    }
    render() {
        if (this.props.type === "checkbox") {
            return (
                <input type="checkbox" checked={this.state.checked} onChange={() => this.setState({checked: !this.state.checked})}/>
            )
        } else {
            return (
                <div>
                    <input type="text" value={this.state.value} onChange={(evt) => this.setState({value: evt.target.value})}/>
                    <button onClick={() =>this.addLine()}>Add</button>
                    {this.state.arr.length > 0 ?
                    <ul>
                        {this.state.arr.map((word,key) => {
                            return (
                                <li key={key}>{word}</li>
                            )
                        })}
                    </ul> : null}
                </div>
            )
        }
        
    }
}

export default Input;