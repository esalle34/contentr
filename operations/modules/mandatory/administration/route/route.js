//Author - Eric Salle
export class Route extends Object{

    constructor(args){
        super();

    }

    setId(id){
        this.id = id;
    }

    getId(){
        return this.id;
    }

    setUri(uri){
        this.uri = uri;
    }

    getUri(){
        return this.uri;
    }

    setRootId(root_id){
        this.root_id = root_id;
    }

    getRootId(){
        return this.root_id;
    }

    setValue(feature){
        this.value = feature.split("_")[1];
    }

    getValue(){
        return this.value;
    }

    setFeature(feature){
        this.feature = feature;
    }

    getFeature(){
        return this.feature;
    }

    setIsExternal(isExternal){
        this.isExternal = isExternal;
    }

    isIsExternal(){
        return this.isExternal;
    }

    setTitle(title){

        this.title = title;

    }

    getTitle(){

        return this.title;

    }

    setMethod(method){

        this.method = method;

    }

    getMethod(){

        return this.method;

    }

    setTheme(theme){

        this.theme = theme;

    }

    getTheme(){

        return this.theme;

    }

    setContentId(content_id){
    
        this.content_id = content_id;

    }

    getContentId(){

        return this.content_id;

    }
    
    setContentType(contentType){

        this.contentType = contentType;

    }

    getContentType(){

        return this.contentType;

    }

    setFilepath(filepath){

        this.filepath = filepath;

    }

    getFilepath(){

        return this.filepath;

    }

    setFilename(filename){

        this.filename = filename;

    }

    getFilename(){

        return this.filename;

    }

    setIsPublished(isPublished){

        this.isPublished = isPublished;

    }

    isIsPublished(){

        return this.isPublished;

    }

    setUriComponent(args){

        this.setUri(args.uri);
        this.setRootId(args.root_id);
        this.setFeature(args.feature);
        this.setIsExternal(args.isExternal);

    }

    getUriComponent(){

        return Object.assign({}, { uri : this.getUri(), rootId : this.getRootId(), feature : this.getFeature(), isExternal : this.isIsExternal() })

    }

    setUriContent(args){
        
        this.setId(args.id);
        this.setRootId(args.root_id);
        this.setTitle(args.title);
        this.setMethod(args.method);
        this.setTheme(args.theme);
        this.setContentId(args.content_id);
        this.setContentType(args.contentType);
        this.setFilepath(args.filepath);
        this.setFilename(args.filename);

    }

    getUriContent(){

        return Object.assign({}, { 
            id : this.getId(), 
            title : this.getTitle(), 
            method : this.getMethod(), 
            theme : this.getTheme(), 
            contentType : this.getContentType(), 
            content_id : this.getContentId(), 
            root_id : this.getRootId(), 
            filename : this.getFilename(), 
            filepath : this.getFilepath() 
        })

    }

    setUriPermissions(args){

        for(let [key, value] of Object.entries(args)){
            if(!key.includes('is_') && key.includes('is')){
                key = key.slice(2);
                if(key == "User"){
                    key = "Login";
                }
                key = "mandatory" + key;
                this.permissions = Object.assign({}, this.permissions, { [key] : true })
            }

        }

    }

    getUriPermissions(){

        return Object.assign({}, { permissions : this.permissions } );

    }


}