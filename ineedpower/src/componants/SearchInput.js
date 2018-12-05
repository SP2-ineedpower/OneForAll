import React from 'react'
import { Button, Select, Input } from 'semantic-ui-react'

//UI FROM https://react.semantic-ui.com/elements/input/#variations-actions



const options = [
    { key: 'all', text: 'All', value: 'All' },
    { key: 'projects', text: 'Projects', value: 'Projects' },
    { key: 'users', text: 'Users', value: 'Users' },
    { key: 'problems', text: 'Problems', value: 'Problems' },
]

class SearchInput extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            value: '',
            select: 'All'
        }
        this.onChange = this.onChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleSelect = this.handleSelect.bind(this);
        this.change = this.change.bind(this);
    }

    onChange(event) {
        this.setState({ value: event.target.value });
    }

    handleSubmit(event) {
        event.preventDefault();
        this.change()
    }

    change() {
        this.props.handleInput(this.state.select, this.state.value)
    }

    
    //getting the selected value
    handleSelect = (e, {value}) => {
        this.setState({ select: value });
    };

    render() {
        return (
            <form className="searchbar" onSubmit={this.handleSubmit}>
                <Input type='text' placeholder='Search...' action value={this.state.value} onChange={this.onChange} >
                    <input />
                    <Select compact options={options} defaultValue="All" onChange={this.handleSelect} className="searchSelect"/>
                    <Button type='submit'>Search</Button>
                </Input>
            </form>
        )
    }
}

export default SearchInput