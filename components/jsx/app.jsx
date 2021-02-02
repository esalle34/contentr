//Author - Eric Salle
import React from "react";
import ReactDOM from "react-dom";
import { officeRegistry } from "~/components/jsx/modules/office-app.registry";
import { connect, Provider } from 'react-redux';
import { store } from "./modules/redux/stores/store";
import "regenerator-runtime/runtime";

class App extends React.Component {

	constructor(props) {

		super(props)

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

	render() {


		return null;

	}

}

document.addEventListener("DOMContentLoaded", function () {

	let app = document.getElementById("main");

	if (app != null) {

		ReactDOM.render(

			<App />,
			app

		)


	};
})

