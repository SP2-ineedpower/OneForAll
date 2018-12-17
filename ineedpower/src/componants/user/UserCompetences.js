import React from 'react';

class Competences extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            place: 'Add a competence to your profile.',
            value: '',
            competences: {},
            fetched: false
        }

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleButtonClick = this.handleButtonClick.bind(this)
    }

    componentDidMount() {
        fetch(`http://localhost:5000/userCompetences/${this.props.userId}`)
            .then(res => res.json())
            .then(res => this.setState({ competences: res, fetched: true }));
    }

    handleChange(event) {
        this.setState({ value: event.target.value });
    }


    handleSubmit(event) {
        event.preventDefault();
        let tempNum = 1;  //temporary id of the comment
        if (this.state.competences.length > 0) {
            tempNum = this.state.competences[this.state.competences.length - 1].competenceId + 1;
        }
        let tag = {
            tagId: tempNum,
            competence: this.state.value
        }
        fetch(`http://localhost:5000/userCompetences/add/${this.props.userId}/${tag.competence}`)
        this.state.competences.push(tag);
        this.setState({
            value: ''
        });
    }


    handleButtonClick(id, e) {
        let pos = -1;
        for (let index = 0; index < this.state.competences.length; index++) {
            if (this.state.competences[index].competenceId === id) {
                pos = index;
            }
        }
        fetch(`http://localhost:5000/userCompetences/delete/${id}`)
        this.state.competences.splice(pos, 1);
        this.setState({
        });
    }


    render() {
        let competenceList = ''
        if (this.props.owner && this.state.fetched) {
            competenceList = this.state.competences.map(competence => (
                <div className="tags" key={competence.competenceId}><span>{competence.competence}</span><button onClick={this.handleButtonClick.bind(this, competence.competenceId)}>x</button></div>
            ))
        }
        else if(this.state.fetched){
            competenceList = this.state.competences.map(competence => (
                <div className="tags" key={competence.competenceId}><span>{competence.competence}</span></div>
            ))
        }
        if (this.props.owner) {
            return (
                <div className="projectRowWrapper">
                    <p className="profileTitle">
                        <b>Competences</b>
                    </p>
                    <div className="profileContainer">
                        {competenceList}
                        <form onSubmit={this.handleSubmit}>
                            <input value={this.state.value} onChange={this.handleChange} type="text" className={this.state.class} placeholder={this.state.place}>
                        </input>
                    </form>
                    </div>
                </div>
            );
        } else {
            return (
                <div>
                    <div className="profileTitle">
                        <b>Competences</b>
                    </div>
                    <div className="profileContainer">
                        {competenceList}
                    </div>
                </div>
            );
        }
        
    }
}

export default Competences;