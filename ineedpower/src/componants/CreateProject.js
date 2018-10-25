import React from 'react';
import Header from './Header';

import '../css/createproject.css';

//Dit pagina wordt gebruikt om bestaande projecten te editen en nieuwe projecten aan te maken

const Project =   {   //een dummy project maken om te testen, later wordt dit vervangen met project uit database aleja hopelijk
    projectId: 1,
    name: "I Need Power",
    creatorId: "Bob De Bouwer", //dit kan natuurlijk niet als ID, dient gewoon voor een visuele ondersteuning
    description: "awesome project made by awesome people",
    ended: "false",
    issueId: "laravel werkt niet.", // moet nog besproken worden
    creationDate: "25/10/2018",
    groupsize: "6",
    tags: "c++"
}

class Projectdata extends React.Component {

    render() {
        return (
            <div className="centerProjectdata">
                <p className="">
                        <b>Name of project: </b>
                </p>
                <textarea rows="1" cols="30">
                {Project.name}
                </textarea> 

                <p className="">
                    <b>Creator: </b>
                </p>
                <textarea rows="1" cols="30">
                {Project.creatorId}
                </textarea> 

                <p className="">
                    <b>Creation Date: </b>
                </p>
                <textarea rows="1" cols="30">
                {Project.creationDate}
                </textarea> 

                <p className="">
                     <b>Description: </b>
                </p>
                <textarea rows="4" cols="30">
                {Project.description}
                </textarea> 

                <p className="">
                    <b>Groupsize: </b>
                </p>
                <textarea rows="1" cols="30">
                {Project.groupsize}
                </textarea> 

                <p className="">
                    <b>Problem: </b>
                </p>
                <textarea rows="4" cols="30">
                {Project.issueId}
                </textarea>

                <p className="">
                    <b>Persoon 1 nodig voor de project: </b>
                </p>
                <p>
                <span className="checking tags">Consultant</span> <span className="checking tags">Extra member</span>
                </p>
                <p>
                <b>Tags of importance:</b>
                </p>
                <p>
                    <span className="tags">C++</span> <span className="tags">HTML5</span> <span className="tags">Javascript</span> <span className="tags">CSS</span> <span className="tags">REACT</span>
                </p>

                 <p className="">
                     <b>Persoon 2 nodig voor de project: </b>
                </p>
                <p>
                <span className="checking tags">Consultant</span> <span className="checking tags">Extra member</span>
                </p>
                <p>
                <b>Tags of importance:</b>
                </p>
                <p>
                    <span className="tags">Laravel</span> <span className="tags">Java</span> <span className="tags">Python</span> <span className="tags">Ruby</span> <span className="tags">Express</span>
                </p>
                <p>
                    <span className="save">SAVE</span>
                </p>
            </div>
            
        );
    }
}

class EditProject extends React.Component {
    render() {
        return (
            <div>
                <Header version="newProject" />
                <Projectdata />
            </div>
        );

    }
}

export default EditProject;