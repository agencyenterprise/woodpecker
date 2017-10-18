## Woodpecker.co API

### Getting Started
You will first need a woodpecker account, and your API key. See the Woodpecker API docs here. http://help.woodpecker.co/article/16-api-docs

A basic request

```
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

### API Reference



### Examples


#### Browsing prospects

##### To get the list of prospects:
```
WoodPecker.prospects().find()
```

##### To browse prospects from specific campaigns:

```
WoodPecker.prospects()
	.find({
		campaign: 1
	})

WoodPecker.prospects()
	.find({
		campaigns: [1,2,3]
	})
```

##### To browse prospects of a specific status:

```
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

##### To browse prospects that performed a specific action:

```
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


##### To browse interest rate:

```
WoodPecker.prospects()
	.find({
		campaign: 10074,
		interest: WoodPecker.interest.INTERESTED
	})
```

Valid interest values are `INTERESTED` | `NOT-INTERESTED` | `MAYBE-LATER` | `NOT-MARKED`.

##### To browse a list of prospects who were or were not contacted:

```
WoodPecker.prospects()
	.find({
		contacted: false
	})
```
Contacted is a boolean value.

##### To browse results of prospects search:

```
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

##### To browse data of a specific prospect:

```
WoodPecker.prospects()
	.find({
		id: 2225
	})
```

##### To browse a specific page of data search:

```
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


##### To sort results:

```
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

##### To browse only the data updated after specific date (diff):

```
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

##### Aliases / Shortcuts

100 newest prospects
```
WoodPecker.newest()
```

100 latest prospects who replied to the email
```
WoodPecker.replied()
```

100 latest prospects who opened the email
```
WoodPecker.opened()
```

100 latest prospects who clicked on the email
```
WoodPecker.clicked()
```

100 latest prospects marked as not contacted
```
WoodPecker.notContacted()
```


#### Browsing prospects

##### To get campaign list:

```
WoodPecker.campaigns().find()
```

##### To get campaign list filtered by status:

```
WoodPecker.campaigns()
	.find({
		status: WoodPecker.cstatus.RUNNING
	})
```
Valid campaign status are `RUNNING` | `PAUSED` | `COMPLETED` | `DRAFT` | `EDITED` | `STOPPED`.

##### To get the details of a specific campaign:

```
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
