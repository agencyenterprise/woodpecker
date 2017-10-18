const WoodPecker = require('./woodpecker')(process.env.WOODPECKER_KEY)

/*WoodPecker.prospects().find({
	per_page: 1
})
.then(d => {
	console.log('good', d)
})
.catch(e => {
	console.log('error', e)
})*/


let tests = () => {
	// prospects
	WoodPecker.prospects()
		.find()
		.then(r => {
			console.log(r)
		})
		.catch(e => {
			console.log(e)
		})

	WoodPecker.prospects()
		.find({
			campaign: 1
		})
		.then(r => {
			console.log(r)
		})

	WoodPecker.prospects()
		.find({
			campaigns: [1,2,3]
		})
		.then(r => {
			console.log(r)
		})

	WoodPecker.prospects()
		.find({
			status: WoodPecker.pstatus.REPLIED
		})
		.then(r => {
			console.log(r)
		})

	WoodPecker.prospects()
		.find({
			campaign: 22,
			status: WoodPecker.pstatus['TO-CHECK']
		})
		.then(r => {
			console.log(r)
		})

	WoodPecker.prospects()
		.find({
			campaign: 30112,
			status: WoodPecker.pstatus['PAUSED']
		})
		.then(r => {
			console.log(r)
		})

	WoodPecker.prospects()
		.find({
			activity: WoodPecker.activity.OPENED
		})
		.then(r => {
			console.log(r)
		})

	WoodPecker.prospects()
		.find({
			activity: WoodPecker.activity.OPENED,
			status: WoodPecker.status.REPLIED
		})
		.then(r => {
			console.log(r)
		})

	WoodPecker.prospects()
		.find({
			campaign: 10074,
			interest: WoodPecker.interest.INTERESTED
		})
		.then(r => {
			console.log(r)
		})

	WoodPecker.prospects()
		.find({
			contact: false
		})
		.then(r => {
			console.log(r)
		})

	WoodPecker.prospects()
		.find({
			id: 2225
		})
		.then(r => {
			console.log(r)
		})

	WoodPecker.prospects()
		.find({
			page: 2
		})
		.then(r => {
			console.log(r)
		})

	WoodPecker.prospects()
		.find({
			limit: 20
		})
		.then(r => {
			console.log(r)
		})

	WoodPecker.prospects()
		.find({
			page: 2,
			limit: 20,
			status: WoodPecker.pstatus.REPLIED
		})
		.then(r => {
			console.log(r)
		})

	WoodPecker.prospects()
		.find({
			updated: {
				op: '>',
				date: new Date
			}
		})
		.then(r => {
			console.log(r)
		})

	WoodPecker.prospects()
		.find({
			opened: '>2017-01-01'
		})
		.then(r => {
			console.log(r)
		})

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
		.then(r => {
			console.log(r)
		})

	WoodPecker.prospects()
		.find({
			firstName: 'devin',
			// text based sort passes through
			// sort: '+first_name,+id,+country',
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
		.then(r => {
			console.log(r)
		})
		.catch(e => {
			console.log(e)
		})

	WoodPecker.newest()
		.then(r => {
			console.log(r)
		})

	WoodPecker.replied()
		.then(r => {
			console.log(r)
		})

	WoodPecker.opened()
		.then(r => {
			console.log(r)
		})

	WoodPecker.clicked()
		.then(r => {
			console.log(r)
		})

	WoodPecker.notContacted()
		.then(r => {
			console.log(r)
		})




	// campaigns
	WoodPecker.campaigns()
		.find({
			status: WoodPecker.cstatus.RUNNING
		})
		.then(r => {
			console.log(r)
		})

	WoodPecker.campaigns()
		.find({
			id: 1
		})
		.then(r => {
			console.log(r)
		})

	WoodPecker.campaigns()
		.find({
			ids: [1,2]
		})
		.then(r => {
			console.log(r)
		})
}
