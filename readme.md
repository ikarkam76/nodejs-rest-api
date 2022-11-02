
## GoIT Node.js 
This project created with:
- [cors](https://github.com/expressjs/cors#readme)
- [morgan](https://github.com/expressjs/morgan#readme)
- [express](http://expressjs.com/)
- [mongoose](https://mongoosejs.com/)
- [joi](https://github.com/hapijs/joi#readme)
- [cross-env](https://github.com/kentcdodds/cross-env#readme)
- [dotenv](https://github.com/motdotla/dotenv#readme)
- [nodemon](https://nodemon.io/)
- [eslint](https://eslint.org/)
 ### 1. Create a .env file in the root of your project:
```javascript
.env
1. PORT=3000 //your localhost port, for example 3000
2. MONGODB_URL=mongodb+srv:... //path to your database on mongodb
```
 ### 2. Install all dependencies with `npm` or `yarn`
 ### Commands:
- `npm start` &mdash; start the server in production mode
- `npm run start:dev` &mdash; start the server in development mode
- `npm run lint` &mdash; run a code check with eslint, must run before each PR and fix all linter errors
- `npm lint:fix` &mdash; the same linter check, but with automatic fixes for simple errors
 ### Routes:
Server will start on `/api/contacts` 
- `GET` &mdash; `/` get all contacts
- `GET` &mdash; `/:contactId` get contact by id
- `POST` &mdash; `/` add new contact
- `PUT` &mdash; `/:contactId` change one contact by id
- `DELETE` &mdash; `/:contactId` remove one contact by id
- `PATCH` &mdash;  `/:contactId/favorite` change status in one contact
#### Options:
`POST` &mdash; body of new contact:
Field    | Option  | Description                 |Example
---------|---------|-----------------------------|-------
name     | string  |anything                     |"Denis Smit"
email    | string  | valid email address         | "email@site.com"
phone    | string  | valid phone number          | "(000)123-4567"
favorite | boolean |not required, default "false"| `true` or `false`
