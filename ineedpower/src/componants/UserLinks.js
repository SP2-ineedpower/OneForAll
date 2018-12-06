import React from 'react';
import ReactTooltip from 'react-tooltip'

class UserLinks extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            class: '',
            place: '+',
            value: '',
            links: {},
            fetched: false
        }
        this.handleClick = this.handleClick.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleBlur = this.handleBlur.bind(this);
        this.handleButtonClick = this.handleButtonClick.bind(this)

    }

    handleChange(event) {
        this.setState({ value: event.target.value });
    }

    componentDidMount() {
        fetch(`http://localhost:5000/userLinks/${this.props.userId}`)
            .then(res => res.json())
            .then(res => this.setState({ links: res, fetched: true }));
    }

    handleClick() {
        this.setState({
            class: 'input',
            place: ''
        })
    }

    handleSubmit(event) {
        event.preventDefault();
        let tempNum = 1;  //temporary id of the comment
        if (this.state.links.length > 0) {
            tempNum = this.state.links[this.state.links.length - 1].userLinkId + 1;
        }
        let link = {
            userLinkId:tempNum,      
            userId: this.props.userId,
            url: this.state.value
        }
        fetch(`http://localhost:5000/userLinks/add`, {
        method: 'POST',
        body: JSON.stringify({
            "id": this.props.userId,   // the "" around the key are important
            "url": this.state.value
        }),
        headers: {
            "Content-Type": "application/json",
        }
    });
        this.state.links.push(link);
        this.setState({
            value: ''
        });
    }

    handleBlur() {
        this.setState({
            class: '',
            place: '+',
            value: ''
        });
    }

    handleButtonClick(id, e) {
        let pos = -1;
        for (let index = 0; index < this.state.links.length; index++) {
            if (this.state.links[index].userLinkId === id) {
                pos = index;
            }
        }
        fetch(`http://localhost:5000/userLinks/delete/${id}`)
        this.state.links.splice(pos, 1);
        this.setState({
        });
    }

    showLinks() {
        if (this.state.fetched) {
            const linksList = this.state.links.map(link => (
                <div className="profileLink" key={link.userLinkId}><a href={link.url}>{link.url}</a><button onClick={this.handleButtonClick.bind(this, link.userLinkId)}>delete</button></div>
            ))
            return linksList;
        } else {
            return <p>data can't be fetched</p>
        }
    }

    render() {
        if (this.props.owner) {
            return (
                <div>
                    <div className="profileTitle">
                        <b>Links</b>
                        <form onSubmit={this.handleSubmit} onBlur={this.handleBlur}>
                            <ReactTooltip effect="solid"/>
                            <input value={this.state.value} onChange={this.handleChange} type="text" className={this.state.class} placeholder={this.state.place} onClick={this.handleClick} data-tip="add links your page">
                            </input>
                        </form>
                    </div>
                    <div className="profileContainer">
                        {this.showLinks()}
                    </div>
                </div>
            );
        } else {
            let linksList = {};
            if (this.state.fetched) {
                linksList = this.state.links.map(link => (
                <div className="profileLink" key={link.userLinkId}><a href={link.url}>{link.url}</a></div>
                ))
                return (
                    <div>
                        <div className="profileTitle">
                            <b>Links</b>
                        </div>
                        <div className="profileContainer">
                            {linksList}
                        </div>
                    </div>
                );
            } else {
                return <p>data can't be fetched</p>
            }
            
        }
        
    }
}

export default UserLinks
