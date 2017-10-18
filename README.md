# Woodpecker.co API

[![npm package](https://nodei.co/npm/woodpecker-api.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/woodpecker-api/)

[![Build status](https://img.shields.io/travis/agencyenterprise/woodpecker/master.svg?style=flat-square)](https://travis-ci.org/agencyenterprise/woodpecker)
[![Coverage](https://img.shields.io/codecov/c/github/agencyenterprise/woodpecker.svg?style=flat-square)](https://codecov.io/github/agencyenterprise/woodpecker?branch=master)
[![Dependency Status](https://img.shields.io/david/agencyenterprise/woodpecker.svg?style=flat-square)](https://david-dm.org/agencyenterprise/woodpecker)

---

### Getting Started

You will first need a [Woodpecker](https://woodpecker.co/) account, and your API key. See the Woodpecker API docs here. http://help.woodpecker.co/article/16-api-docs.


### Installation
```sh
npm i woodpecker-api
```


### Usage

The API uses Promises for all interaction.

```js
const Woodpecker = require('woodpecker-api')('KEY')

Woodpecker.prospects()
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

---

## API Reference

### prospects().find({query})

- **id**: Find by id
- **ids**: Find by an array of ids
- **campaign**: Find by a specific `campaign_id`
- **campaigns**: Find by an array of `campaign_id`s
- **status**: Find by prospect status. Valid values: `ACTIVE` | `BLACKLIST` | `AUTOREPLIED` | `TO-CHECK` | `TO-REVIEW` | `BOUNCED` | `INVALID` | `REPLIED`
- **activity**: Find by prospect action. Valid values: `OPENED` | `NOT-OPENED` | `CLICKED` | `NOT-CLICKED`
- **interest**: Find by prospect interest. Valid values: `INTERESTED` | `NOT-INTERESTED` | `MAYBE-LATER` | `NOT-MARKED`
- **updated**: Find where dates are greater then or less than an updated date. Accepts a diff object `{op: '<', date: new Date}` or a string `>2017-01-01`.
- **opened**: Find where dates are greater then or less than an opened date. Accepts a diff object `{op: '<', date: new Date}` or a string `>2017-01-01`.
- **clicked**: Find where dates are greater then or less than a clicked date. Accepts a diff object `{op: '<', date: new Date}` or a string `>2017-01-01`.
- **contacted**: If the user has been contacted or not. `true` or `false`
- **firstName**: Search within the prospects `first_name`
- **lastName**: Search within the prospects `last_name`. *note that the Woodpecker docs are incorrect. `second_name` is invalid.*
- **email**: Search within the prospects `email`
- **company**: Search within the prospects `company`
- **industry**: Search within the prospects `industry`
- **website**: Search within the prospects `website`
- **tags**: Search within the prospects `tags`
- **title**: Search within the prospects `title`
- **phone**: Search within the prospects `phone`
- **address**: Search within the prospects `address`
- **city**: Search within the prospects `city`
- **state**: Search within the prospects `state`
- **country**: Search within the prospects `country`
- **snippet1**: Search within the prospects `snippet1`. Can use `snippet1` up to `snippet15`
- **$limit**: Sets the maximum results per page. Defaults to `100`, max of `500`
- **$page**: The page to display
- **$skip**: Amount of results to skip. To be used with `$limit` instead of `$page`
- **$sort**: Sort order object. Can be `1`, `ASC` | `true` | `+`, or `-1`, `DESC` | `false` | `-`. Defaults to `ASC`. Available fields:
  - `id`, `firstName`, `lastName`, `replied`, `status`, `updated`, `email`, `company`, `industry`, `website`, `tags`, `title`, `phone`, `address`, `city`, `state`, `country`, `opened` (requires activity.OPENED), `clicked` (requires activity.CLICKED)

### prospects().newest()
- 100 newest prospects

### prospects().replied()
- 100 latest prospects who replied to the email

### prospects().opened()
- 100 latest prospects who opened the email

### prospects().clicked()
- 100 latest prospects who clicked on the email`

### prospects().notContacted()
- 100 latest prospects marked as not contacted

### prospects().add(PROSPECT | [PROSPECT])
- Accepts either a single prospect or an array of prospects. Available fields: `firstName`, `lastName`, `email`, `company`, `industry`, `website`, `tags`, `title`, `phone`, `address`, `city`, `state`, `country`, `snippet[1-15]`

### prospects().edit(PROSPECT | [PROSPECT])
- Same as add, but will perform an update if they items exist. Requires `id` for each prospect. All fields mentioned in the request will be updated.



### prospects().delete(ID | EMAIL)
- Deletes a prospect by id or email

### prospects().blacklist(ID | EMAIL)
- Blacklists a prospect by id or email


### campaigns().find({query})

- **id**: Find by id
- **ids**: Find by an array of ids
- **status**: Find by specific status. Valid values: `RUNNING` | `PAUSED` | `COMPLETED` | `DRAFT` | `EDITED` | `STOPPED`

---

## Examples

### To get the list of prospects:
```js
Woodpecker.prospects().find()
```

### To browse prospects from specific campaigns:

```js
Woodpecker.prospects()
  .find({
    campaign: 1
  })

Woodpecker.prospects()
  .find({
    campaigns: [1,2,3]
  })
```

### To browse prospects of a specific status:

```js
Woodpecker.prospects()
  .find({
    status: Woodpecker.pstatus.REPLIED
  })

Woodpecker.prospects()
  .find({
    campaign: 22,
    status: Woodpecker.pstatus['TO-CHECK']
  })
```
### To browse prospects that performed a specific action:

```js
Woodpecker.prospects()
  .find({
    activity: Woodpecker.activity.OPENED
  })

Woodpecker.prospects()
  .find({
    activity: Woodpecker.activity.OPENED,
    status: Woodpecker.status.REPLIED
  })
```

### To browse interest rate:

```js
Woodpecker.prospects()
  .find({
    campaign: 10074,
    interest: Woodpecker.interest.INTERESTED
  })
```

### To browse a list of prospects who were or were not contacted:

```js
Woodpecker.prospects()
  .find({
    contacted: false
  })
```

### To browse results of prospects search:

```js
Woodpecker.prospects()
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
    country: ''
  })
```

### To browse data of a specific prospect:

```js
Woodpecker.prospects()
  .find({
    id: 2225
  })
```

### To browse a specific page of data search:

```js
Woodpecker.prospects()
  .find({
    $page: 2
  })
Woodpecker.prospects()
  .find({
    $limit: 20
  })
Woodpecker.prospects()
  .find({
    $skip: 100
  })
Woodpecker.prospects()
  .find({
    $page: 2,
    $limit: 20,
    status: Woodpecker.pstatus.REPLIED
  })
```

### To sort results:

```js
Woodpecker.prospects()
  .find({
    firstName: 'devin',
    sort: '+first_name,+id,+country',
  })

Woodpecker.prospects()
  .find({
    firstName: 'devin',
    $sort: {
      id: 1,
      firstName: -1,
      lastName: -1
    }
  })
```

### To browse only the data updated after specific date (diff):

```js
Woodpecker.prospects()
  .find({
    updated: {
      op: '>',
      date: new Date
    }
  })

Woodpecker.prospects()
  .find({
    opened: '>2017-01-01'
  })
```

### Aliases / Shortcuts

```js
Woodpecker.prospects().newest()

Woodpecker.prospects().replied()

Woodpecker.prospects().opened()

Woodpecker.prospects().clicked()

Woodpecker.prospects().notContacted()
```

### To get campaign list:

```js
Woodpecker.campaigns().find()
```

### To get campaign list filtered by status:

```js
Woodpecker.campaigns()
  .find({
    status: Woodpecker.cstatus.RUNNING
  })
```

### To get the details of a specific campaign:

```js
Woodpecker.campaigns()
  .find({
    id: 1
  })

Woodpecker.campaigns()
  .find({
    ids: [1,2]
  })
```

### To add prospects to the campaign:

```js
Woodpecker.prospects().add({
  firstName: 'mr',
  lastName: 'mr test',
  email: 'mrtest@somedomain.com'
}, 2034)
```


### To add prospects to the prospects list:
```js
Woodpecker.prospects().add([{
  firstName: 'mr',
  lastName: 'mr test',
  email: 'mrtest@somedomain.com'
},{
  firstName: 'mrs',
  lastName: 'mrs test',
  email: 'mrstest@somedomain.com'
}])
```

### To edit prospect data:

```js
Woodpecker.prospects().edit({
  firstName: 'mr',
  lastName: 'mr test',
  email: 'mrtest@somedomain.com'
})
```

### To delete the prospect data:

```js
Woodpecker.prospects().delete('mrtest@somedomain.com')
```

### To delete the prospect from a campaign:

```js
Woodpecker.prospects().delete('mrtest@somedomain.com', 2034)
```

### To change prospect status to BLACKLIST:

```js
Woodpecker.prospects().blacklist('mrtest@somedomain.com')
```
