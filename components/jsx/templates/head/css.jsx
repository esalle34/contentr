import React from "react";
import ReactDOM from "react-dom";
import {theme_css} from "~/theme.js";

export default class Css extends React.Component{
	

	constructor(props){

		super(props);

		this.state = { 

			css : theme_css(props.data.theme),

		}

	}

	render(){

		var view = [];



		if(typeof this.state.css != "undefined"){

			this.state.css.map(function(css_file){

				if(css_file.includes("vendors") || css_file.includes("app")){

					view.push(<link href={css_file} type="text/css" rel="stylesheet" media="all"/>)

				}else{

					view.push(<React.Fragment><link href={css_file} type="text/css" as="style" rel="preload" onload="this.rel='stylesheet'"/><noscript><link href={css_file} type="text/css" rel="stylesheet" /></noscript></React.Fragment>)

				}

			});

		}



		return view;

	}


}