# Woodpecker.co API

[![npm package](https://nodei.co/npm/woodpecker-api.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/woodpecker-api/)

[![Build status](https://img.shields.io/travis/agencyenterprise/woodpecker/master.svg?style=flat-square)](https://travis-ci.org/agencyenterprise/woodpecker)
[![Coverage](https://img.shields.io/codecov/c/github/agencyenterprise/woodpecker.svg?style=flat-square)](https://codecov.io/github/agencyenterprise/woodpecker?branch=master)
[![Dependency Status](https://img.shields.io/david/agencyenterprise/woodpecker.svg?style=flat-square)](https://david-dm.org/agencyenterprise/woodpecker)

### Getting Started

```sh
npm i woodpecker-api
```

You will first need a woodpecker account, and your API key. See the Woodpecker API docs here. http://help.woodpecker.co/article/16-api-docs.

**A basic request**

```js
const WoodPecker = require('./woodpecker')('KEY')

WoodPecker.prospects()
	.find({
		firstName: 'd',
		$limit: 1
	})
	.then(d => {
		console.log(d)
	})
	.catch(e => {
		console.log(e)
	})
```

## API Reference



## Examples

### To get the list of prospects:
```js
WoodPecker.prospects().find()
```

### To browse prospects from specific campaigns:

```js
WoodPecker.prospects()
	.find({
		campaign: 1
	})

WoodPecker.prospects()
	.find({
		campaigns: [1,2,3]
	})
```

### To browse prospects of a specific status:

```js
WoodPecker.prospects()
	.find({
		status: WoodPecker.pstatus.REPLIED
	})

WoodPecker.prospects()
	.find({
		campaign: 22,
		status: WoodPecker.pstatus['TO-CHECK']
	})
```
Valid prospect status are `ACTIVE` | `BLACKLIST` | `AUTOREPLIED` | `TO-CHECK` | `TO-REVIEW` | `BOUNCED` | `INVALID` | `REPLIED`.

### To browse prospects that performed a specific action:

```js
WoodPecker.prospects()
	.find({
		activity: WoodPecker.activity.OPENED
	})

WoodPecker.prospects()
	.find({
		activity: WoodPecker.activity.OPENED,
		status: WoodPecker.status.REPLIED
	})
```

Valid prospect actions are `OPENED` | `NOT-OPENED` | `CLICKED` | `NOT-CLICKED`.


### To browse interest rate:

```js
WoodPecker.prospects()
	.find({
		campaign: 10074,
		interest: WoodPecker.interest.INTERESTED
	})
```

Valid interest values are `INTERESTED` | `NOT-INTERESTED` | `MAYBE-LATER` | `NOT-MARKED`.

### To browse a list of prospects who were or were not contacted:

```js
WoodPecker.prospects()
	.find({
		contacted: false
	})
```
Contacted is a boolean value.

### To browse results of prospects search:

```js
WoodPecker.prospects()
	.find({
		firstName: 'devin',
		lastName: 'smith',
		email: '',
		company: '',
		industry: '',
		website: '',
		tags: '',
		title: '',
		phone: '',
		address: '',
		city: '',
		state: '',
		country: '',
		snippet1: '',
		snippet2: '',
		snippet3: '',
		snippet4: '',
		snippet5: '',
		snippet6: '',
		snippet7: '',
		snippet8: '',
		snippet9: '',
		snippet10: '',
		snippet11: '',
		snippet12: '',
		snippet13: '',
		snippet14: '',
		snippet15: ''
	})
```

### To browse data of a specific prospect:

```js
WoodPecker.prospects()
	.find({
		id: 2225
	})
```

### To browse a specific page of data search:

```js
WoodPecker.prospects()
	.find({
		$page: 2
	})
WoodPecker.prospects()
	.find({
		$limit: 20
	})
WoodPecker.prospects()
	.find({
		$skip: 100
	})
WoodPecker.prospects()
	.find({
		$page: 2,
		$limit: 20,
		status: WoodPecker.pstatus.REPLIED
	})
```
Limit defaults to 100, with a maximum of 500.


### To sort results:

```js
WoodPecker.prospects()
	.find({
		firstName: 'devin',
		sort: '+first_name,+id,+country',
	})

WoodPecker.prospects()
	.find({
		firstName: 'devin',
		$sort: {
			id: 1, // true, ASC, +, or anything else
			firstName: -1, // false, DESC, -
			lastName: 1,
			replied: 1,
			status: 1,
			updated: 1,
			email: 1,
			company: 1,
			industry: 1,
			website: 1,
			tags: 1,
			title: 1,
			phone: 1,
			address: 1,
			city: 1,
			state: 1,
			country: 1,
			// requires activity.OPENED
			//opened: 1
			// requires activity.CLICKED
			//clicked: 1
		}
	})
```

### To browse only the data updated after specific date (diff):

```js
WoodPecker.prospects()
	.find({
		updated: {
			op: '>',
			date: new Date
		}
	})

WoodPecker.prospects()
	.find({
		opened: '>2017-01-01'
	})
```

### Aliases / Shortcuts

100 newest prospects
```js
WoodPecker.newest()
```

100 latest prospects who replied to the email
```js
WoodPecker.replied()
```

100 latest prospects who opened the email
```js
WoodPecker.opened()
```

100 latest prospects who clicked on the email
```js
WoodPecker.clicked()
```

100 latest prospects marked as not contacted
```js
WoodPecker.notContacted()
```

### To get campaign list:

```js
WoodPecker.campaigns().find()
```

### To get campaign list filtered by status:

```js
WoodPecker.campaigns()
	.find({
		status: WoodPecker.cstatus.RUNNING
	})
```
Valid campaign status are `RUNNING` | `PAUSED` | `COMPLETED` | `DRAFT` | `EDITED` | `STOPPED`.

### To get the details of a specific campaign:

```js
WoodPecker.campaigns()
	.find({
		id: 1
	})

WoodPecker.campaigns()
	.find({
		ids: [1,2]
	})
```


#### Adding, editing, blacklisting
Coming soon...API doesnt seem to be responding like expected.
