# Smart Models

## Overview

Smart Models is an model layer for JavaScript applications. It enforces that the same instance of the object is used across the whole application.

Collection provides the same mechanism for the sets of SmartModels. Cache mechanism on Collections allows to persist the data on the client site and reuse them without redoing the API call again.

## Installation
You can install Smart Model from bower and npm.
### NPM
```npm install smart-model```
### Bower
```bower install smart-model```

## Usage
The library is written in ES6 and transpiled with Babel. If you use ES6 in your project you can use sources located in `src` folder. For ES5 version use files in `dist` - each class is available as separate file. You can also use `dist/smart-models.js` file where all the classes are combined and attached to `window` object.

### Basic Example
You can use Smart Model directly but I recomend to use your own class that extends the SmartModel (or one of it's inherited types).
#### ES6
```javascript
class User extends SmartModel {
	getFullname() {
		return [this.name, this.lastname].join(' ');
	}
}

let user1 = User.create({
	id: 1,
	name: 'Gwen',
	lastname: 'Cooper'
});

let user1_copy = User.create({
	id: 1,
	name: 'Gwen',
	lastname: 'Cooper',
	age: 28
});

console.log(user1.age); // 28 (!)
user1_copy.lastname = 'Williams';
console.log(user1.lastname); // Williams
```

#### ES5
```javascript
function User() {
	SmartModel.call(this);
}
User.prototype.getFullname = function() {
	return [this.name, this.lastname].join(' ');
}
User.prototype = Object.create(SmartModel.prototype);
User.prototype.constructor = User;

var user = User.create({
	id: 1,
	name: 'Gwen',
	lastname: 'Cooper'
});

var user1_copy = User.create({
	id: 1,
	name: 'Gwen',
	lastname: 'Cooper',
	age: 28
});

console.log(user1.age); // 28 (!)
user1_copy.lastname = 'Williams';
console.log(user1.lastname); // Williams
```

### Multiple classes

The IDs are resovled for each class separately so the following code works properly:
```javascript
class User extends SmartModel {
	
}

class Post extens SmartModel {
	constructor() {
		this.user = User.create(this.user);
	}	
}
let user = User.create({
	id: 1,
	name: 'Jack',
	lastname: 'Harkness'
});

let post = Post.create({
	id: 1 // the same number as the user id but they are in different classes.
	title: 'My First Post',
	user: {
		id: 1
	}
});

console.log(post.user.name); // Jack
```

### Change key
If you want to use different field name as the idetifier you can easily change it in the class definition:

```javascript
class User extends SmartModel {
	static getKey() {
		return '_id'; // we use _id, as in Mongo instead
	}
}

let user = User.create({
	_id: 1,
	name: 'Gwen',
	lastname: 'Cooper'
});
```

### Rollbackable Smart Model
The Rollbackable Smart Model is useful when working with models that are edited with user using forms. You can easily tell whether the values of the model has changed and rollback the changes.

```javascript
class Post extens RollbackableSmartModel {
	
}

let post = Post.create({
	id: 1,
	title: 'Post title from the server'
});

post.title = 'Post title changed on the frontend';
post.rollbackValue('title') // returns: 'Post title from the server';
post.isDirty(); // returns: true

post.rollback();

post.title; // returns: 'Post title from the server';
post.isDirty(); //returns false

// Or you can commit the value:
post.title = 'New';
post.isDirty(); // returns: true

post.commit();

post.title; // returns: New
post.rollbackValue('title'); // returns: New
post.isDirty(); // returns: false
post.isPristine() === !post.isDirty();
```

### Collections
Collections are basicly sets of the SmartModels. Each collection can have it's key so you can have multiple collections of the same type - for example you can have the collection of AllDocuments and collection of MyDocuments.
Using the key you can get the same instance of the Collection in different part of the application. Also, collections can be persisted (using LocalStorage) so you even after the page refresh Collection will be filled with the data.

```javascript
class User extends SmartModel { }

class Users extends Collection { }

let user1 = User.create({
	id: 1,
	name: 'Gwen',
	lastname: 'Cooper'
});

let user2 = User.create({
	id: 2,
	name: 'Jack',
	lastname: 'Harkness'
});

let user3 = User.create({
	id: 3,
	name: 'Toshiko',
	lastname: 'Sato'
});

let allUsers = Collection.create('AllUsers'); // AllUsers is the key we can refer to when we want to get the same instance
allUsers.push(user1);
allUsers.push(user2);
allUsers.push(user3);

let immportalUsers = Collection.create('ImmortalUsers'); // Another collection
immortalUsers.push(user2);

allUsers.length; // returns: 3
immportalUsers.length; // returns: 1

// You can iterate over the collection:
for(let user of allUsers) {
	console.log(user.name);
}

// The collection inherits from the Array prototype so you can use all Array methods:
allUsers.map((user) => user.name).join(' '); // returns: 'Gwen Jack Toshiko'

// If you'd like to save the Collection in the LocalStorage:
allUsers.saveCache();
```

## Tests
The code is covered with tests, you can run them using `npm test`.
