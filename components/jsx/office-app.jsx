//Author - Eric Salle
import React from "react";
import ReactDOM from "react-dom";
import { officeRegistry }from "~/components/jsx/modules/office-app.registry";
import { connect, Provider } from 'react-redux';
import { store } from "./modules/redux/stores/store";
import "regenerator-runtime/runtime";

class OfficeApp extends React.Component{

		constructor(props){

			super(props)
			this.state = { view : "" };

		}

		componentDidMount() {
			officeRegistry["dropdown"]();
			Array.from(document.querySelectorAll('link[rel="preload"]')).map((css) => {
				var preloadLink = document.createElement("link");
				preloadLink.href = css.href;
				preloadLink.rel = "stylesheet";
				preloadLink.as = "style";
	
				css.parentNode.parentNode.append(preloadLink)
			})
		}

		render(){

			let adminforms = Array.from(document.getElementsByTagName("FORM"));
			let Form = officeRegistry["form"];

			return <React.Fragment key="officeapp">{adminforms.map((form, i)=>{return <Form key={`form-control-${i}`} form={form} store={store} />})}</React.Fragment>;

		}

}

document.addEventListener("DOMContentLoaded", function(){

let officeapp = document.getElementById("office");
let uploader = document.getElementById("uploader");

if(officeapp != null){

	ReactDOM.render(

		<Provider store={store}><OfficeApp /></Provider>,
		officeapp

	)

};
if(uploader != null){

	let Uploader = officeRegistry["invokeUploader"];

	ReactDOM.render(

		<Uploader />,
		uploader
	
	)

}


})

