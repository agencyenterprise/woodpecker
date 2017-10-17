let WoodPecker = require('./woodpecker')(process.env.WOODPECKER_KEY)

let tests = () => {
	WoodPecker.prospects()
		.find()
		.then(res => {
			console.log(res)
		})

	WoodPecker.prospects()
		.find({
			campaign: 1
		})
		.then(res => {
			console.log(res)
		})

	WoodPecker.prospects()
		.find({
			campaigns: [1,2,3]
		})
		.then(res => {
			console.log(res)
		})

	WoodPecker.prospects()
		.find({
			status: WoodPecker.pstatus.REPLIED
		})
		.then(res => {
			console.log(res)
		})

	WoodPecker.prospects()
		.find({
			campaign: 22,
			status: WoodPecker.pstatus['TO-CHECK']
		})
		.then(res => {
			console.log(res)
		})

	WoodPecker.prospects()
		.find({
			campaign: 30112,
			status: WoodPecker.pstatus['PAUSED']
		})
		.then(res => {
			console.log(res)
		})

	WoodPecker.prospects()
		.find({
			activity: WoodPecker.activity.OPENED
		})
		.then(res => {
			console.log(res)
		})

	WoodPecker.prospects()
		.find({
			activity: WoodPecker.activity.OPENED,
			status: WoodPecker.status.REPLIED
		})
		.then(res => {
			console.log(res)
		})

	WoodPecker.prospects()
		.find({
			campaign: 10074,
			interest: WoodPecker.interest.INTERESTED
		})
		.then(res => {
			console.log(res)
		})

	WoodPecker.prospects()
		.find({
			contact: false
		})
		.then(res => {
			console.log(res)
		})

	WoodPecker.prospects()
		.find({
			search: 'search'
		})
		.then(res => {
			console.log(res)
		})

	WoodPecker.prospects()
		.find({
			id: 2225
		})
		.then(res => {
			console.log(res)
		})

	WoodPecker.prospects()
		.find({
			page: 2
		})
		.then(res => {
			console.log(res)
		})

	WoodPecker.prospects()
		.find({
			limit: 20
		})
		.then(res => {
			console.log(res)
		})

	WoodPecker.prospects()
		.find({
			page: 2,
			limit: 20,
			status: WoodPecker.pstatus.REPLIED
		})
		.then(res => {
			console.log(res)
		})

	WoodPecker.prospects()
		.find({
			updated: {
				op: '>'
				date: new Date
			}
		})
		.then(res => {
			console.log(res)
		})

	WoodPecker.prospects()
		.find({
			opened: '>2017-01-01'
		})
		.then(res => {
			console.log(res)
		})


	WoodPecker.campaigns()
		.find({
			status: WoodPecker.cstatus.RUNNING
		})
		.then(res => {
			console.log(res)
		})

	WoodPecker.campaigns()
		.find({
			id: 1
		})
		.then(res => {
			console.log(res)
		})

	WoodPecker.campaigns()
		.find({
			id: [1,2]
		})
		.then(res => {
			console.log(res)
		})
}
