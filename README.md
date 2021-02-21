I. To use Contentr, you must first read and accept the license, you are not owner and/or holder of any rights revolving arround Contentr.<br/>
<br/>
II. Installation<br/>
<br/>
To install this project :<br/> 
<br/>
- You must have installed node.js in your environnment at least version 14 or above and affiliated NPM.<br/>
- You need a running mySQL server with at least version 8 or above.<br/>
- Clone the project in your preferred folder, then execute "npm run install", and finally "npm run build-data".<br/>
<br/>
III. Configuration :<br/>
<br/>
- You need to configure at least one file in the root folder of your project, this file is called "config.json", it looks like this :<br/>
<br/>
"DB_PORT" : xxx,<br/>
"LOCAL_SA_DB_ROOT" : xxx,<br/>
"LOCAL_SA_DB_PWD" : xxx,<br/>
"LOCAL_DB_HOST" : xxx,<br/>
"DB_USER" : xxx,<br/>
"DB_PWD" : xxx,<br/>
"DB_MAIL" : xxx,<br/>
"DB_NAME" : xxx,<br/>
"DB_ROLE" : xxx,<br/>
<br/>
IV. Running the project :<br/>
<br/>
- Run the project locally with : "npm run dev" or "npm run prod" if you are on your production machine.<br/>
<br/>
V. Development :<br/>
<br/>
- If you need to recompile the client js/css files use "npm run development-process" or "npm run production-process".<br/>
<br/>
Please note that in development mode or production mode (not cloud-production), files recompile automatically on file save if your app is already running.<br/>
<br/>
VI. Cloud Config :<br/>
<br/>
This section will come out later...<br/>

Thank you for reading !
