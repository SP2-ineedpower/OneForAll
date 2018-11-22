import React from 'react';
import { NavLink } from 'react-router-dom'
import '../css/participants.css';

class Participants extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            participants: [],
            fetched: false
        }
        this.onClick = this.onClick.bind(this);
    }

    componentDidMount() {
        fetch(`http://localhost:5000/project/participants/${this.props.id}`)
            .then(res => res.json())
            .then(res => this.setState({ participants: res, fetched: true }));
    }

    onClick() {
        // hier code implementeren op participant te verwijderen
    }

    render() {
        if (this.state.fetched) {
            let delIcon = "";
            if(this.props.edit) {  //aangeven of dit component editable mag zijn : indien wel => props edit sturen die true is
                delIcon = <i class="fas fa-minus-circle fa-2x del" onClick={this.onClick}></i>
            }
            const participantsList = this.state.participants.map(participant => (
                <NavLink key={participant.participantId} to={`/Userpage/#${participant.userId}`}>
                    <div className="participantContainer" >
                        {delIcon}
                        <div className="participantIcon">
                            <i className="fas fa-user-circle fa-4x"></i>
                        </div>
                        <p>{participant.name}</p>
                    </div>
                </NavLink>
            ));
            return (
                <div>
                    <div className="profileTitle">
                        <b>Participants</b>
                    </div>
                    <div className="profileContainer">
                        {participantsList}
                    </div>
                </div>
            );
        } else {
            return (
                <p></p>
            );
        }

    }

}

export default Participants;