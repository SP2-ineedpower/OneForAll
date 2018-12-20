import React from 'react';
class ProjectLinks extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            links: {},
            fetched: false
        }
    }

    componentDidMount() {
        fetch(`http://localhost:5000/projectlinks/${this.props.id}`)
            .then(res => res.json())
            .then(res => this.setState({ links: res, fetched: true }));
    }

    render() {
        let linksList = "";
        if (this.state.fetched) {
            linksList = this.state.links.map(link => (
                <div className="profilePageLink" key={link.projectLinkId}><a href={link.url}>{link.url}</a></div>
            ))
        }
        return (
            <div className="projectRowWrapper">
                <div className="profileTitle">
                    <b>Links</b>
                </div>
                <div className="profileContainer">
                    {linksList}
                </div>
            </div>
        );
    }
}

export default ProjectLinks;