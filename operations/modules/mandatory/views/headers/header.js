//Author - Eric Salle
export class Header extends Object{
	
	constructor(args){

		super();
		
	}

	setHeaderData(header){
		this.headerData = header;
	}

	getHeaderData(){
		return this.headerData;
	}

	setHeader(){

		this.header = JSON.parse(this.headerData.element);

	}

	getHeader(){

		return this.header;

	}

	setHelemsData(helems){
		this.header_elements = helems;
	}

	getHelemsData(){
		return this.header_elements;
	}

	resolveSubElements(route, els, user = null, parentTag = null){

		let header_item = {
			react_element : "void",
			args : {
				key : "header-void-element",
			},
			react_nested : []
		}

		let parsedArg = parentTag != null ? (JSON.parse(parentTag.args)) : null;

		if(parsedArg != null){

			header_item = {
				react_element : parentTag.elem,
				args : {
					key : `${parentTag.elem}-${parsedArg.id.toLowerCase()}`,
					dropDownClassName : parsedArg.dropDownClassName,
					menuClassName : parsedArg.menuClassName,
					className : parsedArg.classes,
					value : parentTag.value,
					id : parsedArg.id,
				},
				react_nested : [],

			}

		}

		els.map(function(helem){

			let lowCaseValue = helem.value.toLowerCase().replace(/\s/g, "-");
			let args = JSON.parse(helem.args);

			if(helem.elem == "ul" || helem.elem == "dropdown"){
				let newEls = this.header_elements.filter(el => (el.header_element_id == helem.id ));
				if((header_item.react_element == "void" && helem.elem == "ul") || header_item.react_element != "void"){

					helem.value = route.i18n.translate(helem.value, route.lang);
					return header_item.react_nested.push(this.resolveSubElements(route, newEls, user, helem));

				}
			}

			if(parentTag == null && helem.header_element_id == null){

				header_item.react_nested.push({

					react_element : "li",
					args : {
						key : `header-${lowCaseValue}-item`,
						className : "nav-item"
					},
					react_nested :
					{	
						react_element : helem.elem,
						args : {
							className : (args != null && args.classes != null) ? args.classes : null,
							id : (args != null && args.id != null) ? args.id : null,
							href : helem.uri,
							key : `header-${lowCaseValue}-link`,
							value : route.i18n.translate(helem.value, route.lang),
							els : helem.value == "Welcome" ? route.i18n.translate(helem.value, route.lang) + ", " + (typeof user.firstname != "undefined" && typeof user.lastname != "undefined" ? user.firstname + " " + user.lastname : user.username) : route.i18n.translate(helem.value, route.lang),
						}
					}

				})

			}else if(parentTag != null && helem.header_element_id != null){

				header_item.react_nested.push({

					react_element : helem.elem,
					args : {
						className : (args != null && args.classes != null) ? args.classes : null,
						id : (args != null && args.id != null) ? args.id : null,
						href : (typeof helem.uri != "undefined" && helem.uri != null ) ? helem.uri : (typeof args != "undefined" && args != null && args.href != null) ? args.href : undefined,
						target : (typeof args != "undefined" && args != null && args.target != null) ? args.target : undefined,
						key : `header-${lowCaseValue}-link`,
						els : helem.value == "Welcome" ? route.i18n.translate(helem.value, route.lang) + ", " + (typeof user.firstname != "undefined" && typeof user.lastname != "undefined" ? user.firstname + " " + user.lastname : user.username) : route.i18n.translate(helem.value, route.lang),
					}

				})


			}




		}.bind(this))

		return header_item;

	}

	setHeaderElements(header, els){

		if(Array.isArray(header)){

			header.map((headerEl)=>{

				if(headerEl.hasOwnProperty("react_nested")){

					if(headerEl.react_nested.length == 0){
						return headerEl.react_nested.push(els);
					}

					return this.setHeaderElements(headerEl.react_nested, els);

				}

			})

		}else if(typeof header == "object"){

			for(const prop in header){

				if(header.hasOwnProperty("react_nested")){

					if(header.react_nested.length != 0){
						return this.setHeaderElements(header.react_nested, els);
					}

				}

			}

		}

	}

}