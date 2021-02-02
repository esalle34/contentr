//Author - Eric Salle
const path = require("path");
const root_path = path.dirname(require.main.filename);
const db_transaction = require(path.resolve(root_path + "/db_transaction"))();
const Form = require("./form").Form;

export class FormFactory extends Object{

    constructor(args){
        super();
        if(typeof args == "object"){
            this.formFactory = Object.assign({}, {form_name : args.form_name});
        }else if(typeof args == "string"){
            this.formFactory = Object.assign({}, {form_name : args});
        }else{

            throw new Error("Form Factory Error while mounting : " + args);

        }

    }

	getQueryPrefix(q_name, options = null){

		let _query = {

            form : `JSON_OBJECT('name', forms.name, 'element', forms.element, 'number', forms.number, 'action', (SELECT uri FROM uri WHERE id = forms.uri_id)) as form, JSON_ARRAYAGG(JSON_OBJECT("id", felems.id, "form_id", felems.form_id, "form_element_id", felems.form_element_id, "elem", felems.element, "args", felems.args, "form_number", felems.form_number, "weight", felems.weight)) as felems`,

		}

		return _query[q_name];

	}

	fetchForm(datas = "*"){

		return new Promise((resolve)=>{

			let q = `SELECT ${datas} FROM forms AS forms INNER JOIN forms_elements AS felems ON felems.form_id = forms.id WHERE forms.name = ?`;
			db_transaction.db_quick_query(q, [this.formFactory.form_name]).then((res)=>{
				let form = new Form();
				form.setFormData(res.form);
				form.setFelemsData(res.felems);
				return resolve(form);

			})

		}).catch((error)=>{

			console.error(`Error while fetching Form with name => ${this.formFactory.form_name} (FormFactory@fetchForm) : `+error)

		})

	}

}