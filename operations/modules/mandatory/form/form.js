import { IgnorePlugin } from "webpack";

//Author - Eric Salle
export class Form extends Object {

    constructor(args) {

        super();

    }

    setFormData(form){
        this.formData = form;
    }

    getFormData(){
        return this.formData;
    }
    
    setFelemsData(felems){
        this.felemsData = felems;
    }

    getFelemsData(){
        return this.felemsData;
    }

    resolveFormElements(route, formComponent, els, parentTag = null) {

        //On check s'il ne s'agit pas d'un formulaire à étapes
        if (typeof formComponent != "undefined" && formComponent.args.className.includes("forwardable-form")) {

            formComponent.forms.map(formEl=>{
                let newEls = els.filter(el=>(el.form_number == formEl.number))
                formComponent.react_nested.push(this.resolveFormElements(route, formEl, newEls));
            })

            return formComponent;

        } else {

            let parentComponent;
            if (typeof parentTag != "undefined" && parentTag != null) {

                    parentComponent = {
                        react_element: parentTag.elem,
                        args: JSON.parse(parentTag.args),
                        react_nested: []
                    }
                
            }

            let parent;

            els.map(function (felem) {

                if (typeof parentComponent != "undefined") {

                    let felemParsedArgs = JSON.parse(felem.args);
                    if (typeof felemParsedArgs.placeholder != "undefined") {
                        felemParsedArgs.placeholder = route.i18n.translate(felemParsedArgs.placeholder, route.lang)
                    }
                    if (typeof felemParsedArgs.value != "undefined" && (felemParsedArgs.type == "submit" || felemParsedArgs.type == "button")) {
                        felemParsedArgs.value = route.i18n.translate(felemParsedArgs.value, route.lang)
                    }
                    if (typeof felemParsedArgs.els != "undefined" && (felem.elem == "h1" || felem.elem == "p" || felem.elem == "span" || felem.elem == "h2" || felem.elem == "h3" || felem.elem == "a")) {
                        felemParsedArgs.value = route.i18n.translate(felemParsedArgs.els, route.lang)
                    }
                    if (typeof felemParsedArgs.prelabel != "undefined") {
                        felemParsedArgs.prelabel = route.i18n.translate(felemParsedArgs.prelabel, route.lang)
                    }
                    if (typeof felemParsedArgs.aplabel != "undefined") {
                        felemParsedArgs.aplabel = route.i18n.translate(felemParsedArgs.aplabel, route.lang)
                    }
                    if (typeof felemParsedArgs.options != "undefined" && felemParsedArgs.options.translate) {
                        let options = [];
                        felemParsedArgs.options.values.map(function(option){
                            option = option.split("|");
                            option[1] = route.i18n.translate(option[1], route.lang);
                            options.push(option[0] + "|" + option[1]);
                        })
                        felemParsedArgs.options.values = options;
                    }
                    let felemComponent = {
                        react_element: felem.elem,
                        args: felemParsedArgs,
                        react_nested: []
                    }

                    parent = els.find(el => (el.id == felem.form_element_id));
                    //Si le champ est contenu dans un autre conteneur comme c'est le cas pour les boutons retour et suivant,
                    //on retrouve le conteneur et l'on pousse ses enfants, peut être étendu.
                    if(typeof parent != "undefined" && parent.form_element_id != null){
                        const childs = els.filter(el => (el.form_element_id == parent.id && el.form_number == felem.form_number));
                        if(childs.length>0){
                            let ch = this.resolveFormElements(route, felemComponent, childs);
                            let p = this.resolveFormElements(route, felemComponent, childs, parent);
                            parentComponent.react_nested.find(el=>(el.args.id == p.args.id)).react_nested.push(ch);
                        }
                    }else if(typeof parent != "undefined"){
                    //Si pas de nouveau conteneur parent, on pousse le champ de façon habituelle
                        return parentComponent.react_nested.push(felemComponent);
                    }

                } else if (felem.form_element_id != null && typeof parent == "undefined") {
                    
                    parent = els.find(el => (el.id == felem.form_element_id));
                    
                    //Génération du conteneur principal ici et des ses champs enfants (conteneur juste après le form)
                    if (parent != null) {
                        return formComponent.react_nested = this.resolveFormElements(route, formComponent, els, parent);
                    }
                }else if(felem.form_element_id == null){

                    let felemParsedArgs = JSON.parse(felem.args);

                    let felemComponent = {
                        react_element: felem.elem,
                        args: felemParsedArgs,
                        react_nested: []
                    }

                    formComponent.react_nested.push(felemComponent);
                }

            }.bind(this))

            return typeof parentComponent != "undefined" ? parentComponent : formComponent;

        }

    }

    setFormComponent() {

        let formArgs = JSON.parse(this.formData.element);

        //Génération d'un composant de formulaire ou du formulaire (dépend du fait qu'il s'agisse ou non d'un formulaire à étapes)
        let formComponent = {
            react_element: "form",
            args: {
                id: this.formData.name,
                key: this.formData.name,
                method: formArgs.method,
                async: Boolean(formArgs.async),
                className: formArgs.className,
                action: this.formData.action,
                enctype: formArgs.enctype,
                els: formArgs.els
            },
            react_nested: []
        }

        //Si les données présente + d'un formulaire, on génère le conteneur forwardable-form associé pour la mise en place des formulaires à étape
        if (!Boolean(this.formData.number)) {

            return formComponent;

        } else {
            let forwardableFormContainer = {
                react_element: "div",
                number : this.formData.number,
                args: {
                    id: formArgs.id + "-forwardable-form",
                    key: formArgs.id + "-forwardable-form",
                    className: "forwardable-form"
                },
                forms : [],
                react_nested: [],
            }
            for (let i = 0; i <= this.formData.number; i++) {
                if(i==0){
                    //Rajout de la classe current
                    
                    if(!formArgs.className.includes("current")){
                        forwardableFormContainer.forms.push(Object.assign({}, formComponent, { args : { ...formComponent.args, className : formArgs.className + ` current step-${i+1}`} }, { number : i}));
                    }else{
                        forwardableFormContainer.forms.push(Object.assign({}, formComponent, { args : { ...formComponent.args, className : formArgs.className + ` step-${i+1}`} }, { number : i}))
                    }
                }else{
                    forwardableFormContainer.forms.push(Object.assign({}, formComponent, { args : { ...formComponent.args, className : formArgs.className + ` step-${i+1}` } }, { number : i}))
                }
            }
            return forwardableFormContainer;
        }

    }

}