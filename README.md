# CRM - React
Customer Relationship Management (CRM)- React
#

## Build with
Node.js, Express, React, React Router DOM, Vite, Tailwind CSS, JSON

## Topics
- React
- React Router DOM 6.4.3 
 > (Browser Router, Router Provider, Loaders, Forms components, Actions, [Navigate, Redirect, Link], Layouts [Outlet], Errors [Boundaries, Elements, RouterError], etc)
- CRUD Fake API with JSON Server

## Usage

Prerequisite install JSON Server (globaly)
```
npm install -g json-server
````
Download and install the proyect

```
git clone https://github.com/fosware/crm_react.git  

cd crm_react

npm install 

npm run dev
```
In another terminal run JSON Server, *watch the output

```
cd crm_react

json-server --watch db.json
```

Create a .env file into crm_react folder, with the next *content:
``` 
VITE_API_URL=http://localhost:3000/clientes 
```
> *or the json-server output



