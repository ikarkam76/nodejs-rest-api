
## GoIT Node.js 
#### For start this project you need `Node.js`
#### This project created with:
- [cors](https://github.com/expressjs/cors#readme)
- [morgan](https://github.com/expressjs/morgan#readme)
- [express](http://expressjs.com/)
- [mongoose](https://mongoosejs.com/)
- [sendgrid](https://sendgrid.com/go/email-brand-signup-sales-1?utm_source=google&utm_medium=cpc&utm_term=sendgrid&utm_campaign=SendGrid_G_S_Brand_ROE_Emerging&cq_plac=&cq_net=g&cq_pos=&cq_med=&cq_plt=gp&gclid=Cj0KCQiAg_KbBhDLARIsANx7wAyLN5nut55TsTo2YjL4saX0HA8i5wI0KUCIgb4F3D9ZpzIwIwbKkYAaAoEYEALw_wcB)
- [jsonwebtoken](https://github.com/auth0/node-jsonwebtoken#readme)
- [nodemon](https://nodemon.io/)
- [bcrypt](https://github.com/kelektiv/node.bcrypt.js#readme)
- [multer](https://github.com/expressjs/multer#readme)
- [docker](https://www.docker.com/)
- and other...
 ### 1. Create a .env file in the root of your project:
```javascript
.env
1 PORT=3000 //your localhost port, for example 3000
2 MONGODB_URL=... //path to your database on mongodb
3 JWT_SECRET=... //create secret word to generic password (for example salt)
4 SENDGRID_API_KEY=... //your sehdgrid api key
5 SENDGRID_EMAIL=... //your sendgrid email
```
 ### 2. Install all dependencies with `npm` or `yarn`
 ### Commands:
- `npm start` &mdash; start the server in production mode
- `npm run start:dev` &mdash; start the server in development mode
- `npm run lint` &mdash; run a code check with eslint, must run before each PR and fix all linter errors
- `npm lint:fix` &mdash; the same linter check, but with automatic fixes for simple errors
 ### Routes:
#### Registration request
```javascript
POST /api/users/register
Content-Type: application/json
RequestBody: {
  "email": "example@example.com",
  "password": "examplepassword"
}
```
#### Resending a email request
```javascript
POST /api/users/verify
Content-Type: application/json
RequestBody: {
  "email": "example@example.com"
}
```
#### Login request
```javascript
GET /api/users/login
Content-Type: application/json
RequestBody: {
  "email": "example@example.com",
  "password": "examplepassword"
}
```
#### Logout request
```javascript
POST /api/users/logout
Authorization: "Bearer {{token}}"
```
#### Current user request
```javascript
GET /api/users/current
Authorization: "Bearer {{token}}"
```
#### Update subscription
```javascript
PATCH /api/users
Content-Type: application/json
RequestBody: {
  "subscription": "pro", "starter" or "business"
}
Authorization: "Bearer {{token}}"
```
#### Get all contacts
```javascript
GET /api/contacts
```
#### Add filter
```javascript
GET /api/contacts
Content-Type: application/json
RequestBody: {
  "favorite": `true` or `false`
}
```
#### Add pagination
```javascript
GET /api/contacts
Content-Type: application/json
RequestBody: {
  "page": `number`,
  "limit": `number`
}
```
#### Get contact by ID
```javascript
GET /api/contacts/:contactId
```
#### Add new contact
```javascript
POST /api/contacts
Content-Type: application/json
RequestBody: {
  "name": "examplename", //string
  "email": "example@example.com", //string
  "phone": "valid phone number", //string, valid (012)345-6789
  "favorite": `boolean` //not required, default "false"
}
```
#### Change one contact by ID
```javascript
PUT /api/contacts/:contactId
Content-Type: application/json
RequestBody: {
  "name": "examplename", //string
  "email": "example@example.com", //string
  "phone": "valid phone number", //string, valid (012)345-6789
  "favorite": `boolean` //not required, default "false"
}
```
#### Delete one contact by ID
```javascript
DELETE /api/contacts/:contactId
```
#### Change status in one contact
```javascript
PATCH /api/contacts/:contactId/favorite
Content-Type: application/json
RequestBody: {
  "favorite": `true` or `false`
}
```
