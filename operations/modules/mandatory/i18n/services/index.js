//Author - Eric Salle
import { i18nRegistry } from "../i18n.registry";

import global from "~/global";

export const i18n = {

		getLang : (lang = null)=>{

			if(typeof lang == "undefined"){

				return global().DEFAULT_SITE_LANGUAGE;
				
			}else if(lang == null || lang == "*"){

				let search = Object.keys(i18nRegistry).find(l=>(l==lang));

				if(typeof search == "undefined" || search == -1){

					return search = global().DEFAULT_SITE_LANGUAGE;

				}

				if(typeof i18n.getDocLang() != "undefined"){

					return i18n.getDocLang();

				}else{

					return global().DEFAULT_SITE_LANGUAGE;

				}

				
			}else {
				
				let search = Object.keys(i18nRegistry).find(l=>(l==lang));

				if(typeof search == "undefined" || search == -1){

					search = global().DEFAULT_SITE_LANGUAGE;

				}

				return search;

			}


		},

		getDocLang : ()=>{

			let lang = typeof document != "undefined" ? document.getElementsByTagName("HTML")[0].getAttribute("lang") : undefined;

			return lang;

		},

		translate : function(string, lang = null){

			try {

				let tr_string = i18nRegistry[i18n.getLang(lang)][string];

				if(typeof tr_string == "undefined"){
		
					return string;
	
				}
	
	
				return tr_string;
	

				
			} catch (error) {

				console.log(error);
				
			}


		},

		translateN : function(string, int, lang = null){

			let tr_string;

			try {

				if(int > 0){

					tr_string = i18nRegistry[i18n.getLang(lang)][string]['other'].replace("%s", int);
	
				}else{
	
					tr_string = i18nRegistry[i18n.getLang(lang)][string]['one'].replace("%s", int);
	
				}
	
				if(typeof tr_string == "undefined"){
		
					return string;
	
				}
	
	
				return tr_string;
	
				
			} catch (error) {

				console.log(error);
				
			}




		}


} 
