# react-app-flower-store

# This project was bootstrapped with Create React App.

The client side is a single page app, dynamically updating with React, using JSX, React JS and Bootstrap. The server is built on Express JS and it is using Mongo Db for storing the data. Redux is used as a state management library. The application consists of users, products and orders. Each user can register, login and logout. Users can also view each products details and make orders. Admins can add, edit and delete  entries and approve orders.

## Functionality


User Login:
 - login in the application via email and password

User Registe:
 - register a new user via email, username and password

User Logout:
 - Logouts from the application

## Not Register user can:
- see the store
- register

## An register user can:
- order
- see product details
- like/unlike products
- see "my orders"
- write reviews

## An admin user can:
- approve orders
- create new offer
- edin product
- delete product


## Home:
- List of products

## Details:
 - product details. Add review . Each user can like/unlike the product

## Cart:
 - Users add product to the card
 - Users select quantity of the chosen product
 - Users have option to remove product from the cart or refresh the quantity to one
 - Users have option to checkout or to continue shopping

## My orders:
 - List users orders
 - Navigate to order details

## Order Details:
 - Shows full order details
 
 Product add:
 - Admin route only
 - Create a new  entry and save it to the database

 Prooduct edit:
 - Admin route only
 - Edit an existing  entry and save it to the database

 Product delete:
 - Admin route only
 - Remove an entry from the database
 
 Pending orders
-  Admin route only
-  View all pending orders
-  Navigate to order details
-  Approve order

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`