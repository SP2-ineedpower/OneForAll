import React from 'react';

class Competences extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            class: '',
            place: '+',
            value: '',
            competences: {},
            fetched: false
        }
        this.handleClick = this.handleClick.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleBlur = this.handleBlur.bind(this);
        this.handleButtonClick = this.handleButtonClick.bind(this)
    }

    componentDidMount() {
        fetch('http://localhost:5000/userCompetences')
            .then(res => res.json())
            .then(res => this.setState({ competences: res.data, fetched: true }, () => console.log('competences fetched', res)));
    }

    handleChange(event) {
        this.setState({ value: event.target.value });
    }

    handleClick() {
        this.setState({
            class: 'input',
            place: ''
        })
    }

    handleSubmit(event) {
        event.preventDefault();
        // let tag = {
        //     tagId: 4,
        //     competence: this.state.value
        // }
        // tags.push(tag);
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
        //console.log(id);
        // let pos = -1;
        // for (let index = 0; index < tags.length; index++) {
        //     if (tags[index].tagId === id) {
        //         pos = index;
        //     }
        // }
        // tags.splice(pos, 1);
        // this.setState({
        // });
    }

    render() {
        let competenceList = ''
        if (this.state.fetched) {
            competenceList = this.state.competences.map(competence => (
                <div className="tags" key={competence.competenceId}><span>{competence.competence}</span><button onClick={this.handleButtonClick.bind(this, competence.competenceId)}>x</button></div>
            ))
        }
        if (this.props.owner) {
            return (
                <div>
                    <div className="profileTitle">
                        <b>Competences</b>
                        <form onSubmit={this.handleSubmit} onBlur={this.handleBlur}>
                            <input value={this.state.value} onChange={this.handleChange} type="text" className={this.state.class} placeholder={this.state.place} onClick={this.handleClick}>
                            </input>
                        </form>
                    </div>
                    <div className="profileContainer">
                        {competenceList}
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