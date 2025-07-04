# mustardng-backend

To run the app use `npm start`

To install all the dependencies `npm install`

Install dependencies: `npm install express mongoose jsonwebtoken bcryptjs cookie-parser cors morgan nodemon`

### Problem 1

```javascript
(node:25476) Warning: To load an ES module, set "type": "module" in the package.json or use the .mjs extension.
(Use node --trace-warnings ... to show where the warning was created)
C:\Users\PC\Documents\2025\Code\GitHub\Mustard backend\config\allowedOrigins.js:2
export const allowedOrigins = [
^^^^^^

```

in the highlighted code, why am i getting the error and how do I solve it ?

#### Solution

Use CommonJS syntax (recommended for your project)
Change your code to use module.exports:

```javascript 
    module.exports = allowedOrigins
```