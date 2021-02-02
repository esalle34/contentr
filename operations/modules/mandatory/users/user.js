//Author - Eric Salle
var sha512 = require('js-sha512').sha512;

export class User extends Object{

	constructor(){

		super();

	}

	setId(id){
		this.id = id;
	}

	getId(){
		return this.id;
	}

	setUsername(username){
		this.username = username;
	}

	getUsername(){
		return this.username;
	}

	setIsAuthenticated(isAuthenticated){
		this.isAuthenticated = isAuthenticated;
	}

	isIsAuthenticated(){
		return this.isAuthenticated;
	}

	setUserPrivileges(privileges){

		this.roles = privileges;

	}

	getUserPrivileges(){

		return Object.assign({}, {isUser : this.isUser, isContributor : this.isContributor, isAdministrator : this.isAdministrator});

	}

	setUserDatas(datas){

		this.firstname = datas.firstname;
		this.lastname = datas.lastname;
		this.phone = datas.phonenumber;

	}

	setUserLocation(datas){


	}


}