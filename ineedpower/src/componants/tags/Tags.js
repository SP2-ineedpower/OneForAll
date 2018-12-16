import React from 'react';

class Tags extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            tags: {},
            fetched: false
        }
    }

    componentDidMount() {
        fetch(`http://localhost:5000/projecttags/${this.props.id}`)
            .then(res => res.json())
            .then(res => this.setState({ tags: res, fetched: true }));
    }

    render() {
        let competenceList = "";
        if (this.state.fetched) {
            competenceList = this.state.tags.map(tag => (
                <div className="project-page-tags" key={tag.tagId}><span>{tag.tag}</span></div>
            ))
        }

        return (
            <div className="projectRowWrapper">
                <p className="profileTitle">
                    <b>Tags</b>
                </p>
                <div className="profileContainer">
                    {competenceList}
                </div>
            </div>
        );
    }
}

export default Tags;