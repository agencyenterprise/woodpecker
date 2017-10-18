if (!process.env.WOODPECKER_KEY) {
	throw new Exception('Tests require a woodpecker api key')
}

const
	assert = require('assert')
	WoodPecker = require('../woodpecker')(process.env.WOODPECKER_KEY)

describe('WoodPecker', () => {
	let time = 5000
	let slowDownTest = p => {
		return new Promise((resolve, reject) => {
			p
				.then(() => {
					setTimeout(resolve, time)
				})
				.catch(() => {
					setTimeout(reject, time)
				})
		})
	}

	describe('#campaigns', () => {
		it('should find a campaign', () => {
			return WoodPecker.campaigns().find()
		})

		it('should find running campaigns', () => {
			return WoodPecker.campaigns()
				.find({
					status: WoodPecker.cstatus.RUNNING
				})
		})

		it('should find by id', () => {
			return WoodPecker.campaigns()
				.find({
					id: 1
				})
		})

		it('should find by ids', () => {
			return WoodPecker.campaigns()
				.find({
					ids: [1, 2]
				})
		})

		it('should find by status', () => {
			return WoodPecker.campaigns()
				.find({
					status: WoodPecker.cstatus.RUNNING
				})
		})
	})

	describe('#prospects', () => {
		it('should find all prospects', () => {
			return WoodPecker.prospects().find()
		})

		it('should find a campaign prospect', () => {
			return WoodPecker.prospects().find({
				campaign: 1
			})
		})

		it('should find multiple campaigns prospect', () => {
			return WoodPecker.prospects().find({
				campaign: [1]
			})
		})

		it('should find multiple campaigns prospect with array plural', () => {
			return WoodPecker.prospects().find({
				campaigns: [1]
			})
		})

		it('should not allow id and ids', () => {
			return new Promise((resolve, reject) => {
				WoodPecker.prospects()
					.find({
						id: true,
						ids: true
					})
					.then(reject)
					.catch(resolve)
			})
		})

		it('should not allow campaign and campaigns', () => {
			return new Promise((resolve, reject) => {
				WoodPecker.prospects()
					.find({
						campaign: true,
						campaigns: true
					})
					.then(reject)
					.catch(resolve)
			})
		})

		it('should find replied status prospects', () => {
			return WoodPecker.prospects().find({
				status: WoodPecker.pstatus.REPLIED
			})
		})

		it('should find to check status', () => {
			return WoodPecker.prospects().find({
				campaign: 1,
				status: WoodPecker.pstatus['TO-CHECK']
			})
		})

		it('should find paused status', () => {
			return WoodPecker.prospects().find({
				campaign: 1,
				status: WoodPecker.pstatus['PAUSED']
			})
		})

		it('should find opened activity', () => {
			return WoodPecker.prospects().find({
				activity: WoodPecker.activity.OPENED
			})
		})

		it('should find opened and replied', () => {
			return WoodPecker.prospects().find({
				activity: WoodPecker.activity.OPENED,
				status: WoodPecker.pstatus.REPLIED
			})
		})

		it('should find opened in a campaign', () => {
			return WoodPecker.prospects().find({
				campaign: 1,
				interest: WoodPecker.interest.INTERESTED
			})
		})

		it('should find not contacted', () => {
			return WoodPecker.prospects().find({
				contacted: false
			})
		})

		it('should find by id', () => {
			return WoodPecker.prospects().find({
				id: 2225
			})
		})

		it('should find by ids', () => {
			return WoodPecker.prospects().find({
				ids: [1,2]
			})
		})

		it('should go to page 2', () => {
			return WoodPecker.prospects().find({
				$page: 2
			})
		})

		it('should go to page 2 with skip', () => {
			return WoodPecker.prospects().find({
				$skip: 10
			})
		})

		it('should not allow single limit with no query', () => {
			return new Promise((resolve, reject) => {
				WoodPecker.prospects()
					.find({
						$limit: 1
					})
					.then(reject)
					.catch(resolve)
			})
		})

		it('should not allow large limits', () => {
			return new Promise((resolve, reject) => {
				WoodPecker.prospects()
					.find({
						$limit: 501
					})
					.then(reject)
					.catch(resolve)
			})
		})

		it('should show replied on page 2 and only 20', () => {
			return WoodPecker.prospects().find({
				$page: 2,
				$limit: 20,
				status: WoodPecker.pstatus.REPLIED
			})
		})

		it('should show updated after today', () => {
			return WoodPecker.prospects().find({
				updated: {
					op: '>',
					date: new Date
				}
			})
		})

		it('should not allow invalid date operations', () => {
			return new Promise((resolve, reject) => {
				WoodPecker.prospects()
					.find({
						updated: {
							op: '-',
							date: new Date
						}
					})
					.then(reject)
					.catch(resolve)
			})
		})

		it('should show require activity when using opened', () => {
			return new Promise((resolve, reject) => {
				WoodPecker.prospects()
					.find({
						opened: '>2017-01-01'
					})
					.then(reject)
					.catch(resolve)
			})
		})

		it('should show opened after today using string', () => {
			return WoodPecker.prospects().find({
				opened: '>2017-01-01',
				activity: WoodPecker.activity.OPENED
			})
		})

		it('should show require activity when using opened', () => {
			return new Promise((resolve, reject) => {
				WoodPecker.prospects()
					.find({
						clicked: '>2017-01-01'
					})
					.then(reject)
					.catch(resolve)
			})
		})

		it('should show clicked after today using string', () => {
			return WoodPecker.prospects().find({
				clicked: '>2017-01-01',
				activity: WoodPecker.activity.CLICKED
			})
		})

		it('find devin smith', () => {
			return WoodPecker.prospects().find({
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
		})

		it('should not allow opened sort without opened activity', () => {
			return new Promise((resolve, reject) => {
				WoodPecker.prospects()
					.find({
						$sort: {
							opened: 1
						},
						activity: WoodPecker.activity.CLICKED
					})
					.then(reject)
					.catch(resolve)
			})
		})

		it('should not allow clicked sort without clicked activity', () => {
			return new Promise((resolve, reject) => {
				WoodPecker.prospects()
					.find({
						$sort: {
							clicked: 1
						},
						activity: WoodPecker.activity.OPENED
					})
					.then(reject)
					.catch(resolve)
			})
		})

		it('should allow opened sort with opened activity', () => {
			return WoodPecker.prospects()
				.find({
					$sort: {
						opened: 1
					},
					activity: WoodPecker.activity.OPENED
				})
		})

		it('should allow clicked sort with clicked activity', () => {
			return WoodPecker.prospects()
				.find({
					$sort: {
						clicked: 1
					},
					activity: WoodPecker.activity.CLICKED
				})
		})

		it('should find and sort using string', () => {
			return WoodPecker.prospects().find({
				firstName: 'devin',
				sort: '+first_name,+id,+country'
			})
		})

		it('should find and sort using all data', () => {
			return WoodPecker.prospects().find({
				firstName: 'devin',
				$sort: {
					id: 1,
					firstName: -1,
					lastName: 'ASC',
					replied: 'DESC',
					status: '+',
					updated: '-',
					email: true,
					company: false,
					industry: 1,
					website: 1,
					tags: 1,
					title: 1,
					phone: 1,
					address: 1,
					city: 1,
					state: 1,
					country: 1
				}
			})
		})

		it('should get newest', () => {
			return WoodPecker.prospects().newest()
		})

		it('should get replied', () => {
			return WoodPecker.prospects().replied()
		})

		it('should get opened', () => {
			return WoodPecker.prospects().opened()
		})

		it('should get clicked', () => {
			return WoodPecker.prospects().clicked()
		})

		it('should get notContacted', () => {
			return WoodPecker.prospects().notContacted()
		})
	})

	describe('#global', () => {
		it('should not allow request without key', () => {
			return new Promise((resolve, reject) => {
				WoodPecker.key = null
				WoodPecker.campaigns()
					.find()
					.then(reject)
					.catch(resolve)
			})
		})
	})
})
