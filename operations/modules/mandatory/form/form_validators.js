module.exports = ()=> {

   let  _validators = {

        name : (value, options = null)=>{
            let minlength;
            if(options != null){
                minlength = options.substring(options.indexOf("length") + 7);
            }
            let noBlankValue = value.replace(/\s/g, '');
            if(noBlankValue.length==0){
                return Object.assign({}, { isValid : false, errorLabel : "Name field is empty"});
            }else if(typeof minlength != "undefined" && noBlankValue.length < minlength){
                return Object.assign({}, { isValid : false, errorLabel : "Number of characters doesn't match in name field"});             
            }

            return Object.assign({}, { isValid : true });
        },
        
        theme : (value, options = null)=>{

            let noBlankValue = value.replace(/\s/g, '');
            if(noBlankValue.length==0){
                return Object.assign({}, { isValid : false, errorLabel : "A theme must be selected"});
            }

            return Object.assign({}, { isValid : true });
        },

        method : (value, options = null)=>{

            let noBlankValue = value.replace(/\s/g, '');
            if(noBlankValue.length==0){
                return Object.assign({}, { isValid : false, errorLabel : "A content type must be selected"});
            }

            return Object.assign({}, { isValid : true });
        },

        feature : (value, options = null)=>{
            let minlength;
            if(options != null){
                minlength = options.substring(options.indexOf("length") + 7);
            }
            let noBlankValue = value.replace(/\s/g, '');
            if(noBlankValue.length==0){
                return Object.assign({}, { isValid : false, errorLabel : "Feature field is empty"});
            }else if(typeof minlength != "undefined" && noBlankValue.length < minlength){
                return Object.assign({}, { isValid : false, errorLabel : "Number of characters doesn't match in feature field"});             
            }

            return Object.assign({}, { isValid : true });
        },

        template : (value, options = null)=>{

            return _validators.feature(value, options);

        },

        title : (value, options = null)=>{
            let minlength;
            if(options != null){
                minlength = options.substring(options.indexOf("length") + 7);
            }
            let noBlankValue = value.replace(/\s/g, '');
            if(noBlankValue.length==0){
                return Object.assign({}, { isValid : false, errorLabel : "Title field is empty"});
            }else if(typeof minlength != "undefined" && noBlankValue.length < minlength){
                return Object.assign({}, { isValid : false, errorLabel : "Number of characters doesn't match in feature field"});             
            }

            return Object.assign({}, { isValid : true });
        },

        contentid : (value, options = null)=>{

            let noBlankValue = value.replace(/\s/g, '');
            if(noBlankValue.length==0){
                return Object.assign({}, { isValid : false, errorLabel : "Id field is empty"});
            }

            return Object.assign({}, { isValid : true });
        },

        uri : (value, options = null)=>{
            let noBlankValue = value.replace(/\s/g, '');
            if(noBlankValue.length==0){
                return Object.assign({}, { isValid : false, errorLabel : "Link field is empty"});
            }
            if(!value.match(/^\/(?=[a-zA-Z0-9~@#$^*()/_+=[\]{}|\\,.?:-]*$)(?!.*[<>'";`%])?/i) && !value.match("(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})") ){
                return Object.assign({}, { isValid : false, errorLabel : "Link is not standard"});
            }
            return Object.assign({}, { isValid : true });
        }

    }

    return _validators;
}