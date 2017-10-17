const request = require('request-promise-any')
const api = 'https://api.woodpecker.co/'
const moment = require('moment')

class WoodPecker {
	constructor(key) {
		this.key = key
		this.pstatus = {
			REPLIED: 'REPLIED',
			ACTIVE: 'ACTIVE',
			BLACKLIST: 'BLACKLIST',
			AUTOREPLIED: 'AUTOREPLIED',
			'TO-CHECK': 'TO-CHECK',
			'TO-REVIEW': 'TO-REVIEW',
			BOUNCED: 'BOUNCED',
			INVALID: 'INVALID',
			REPLIED: 'REPLIED'
		}
		this.activity = {
			OPENED: 'OPENED',
			'NOT-OPENED': 'NOT-OPENED',
			CLICKED: 'CLICKED',
			'NOT-CLICKED': 'NOT-CLICKED'
		}
		this.interest = {
			INTERESTED: 'INTERESTED',
			'NOT-INTERESTED': 'NOT-INTERESTED',
			'MAYBE-LATER': 'MAYBE-LATER',
			'NOT-MARKED': 'NOT-MARKED'
		}
		this.cstatus = {
			RUNNING: 'RUNNING',
			PAUSED: 'PAUSED',
			COMPLETED: 'COMPLETED',
			DRAFT: 'DRAFT',
			EDITED: 'EDITED',
			STOPPED: 'STOPPED'
		}
	}
	req(url, data) {
		return new Promise((resolve, reject) => {
			request({
				url: api + url,
				headers: {
					'Authorization': 'Basic ' + new Buffer(this.key).toString('base64') + ':X'
				},
				qs: data
			}).then(resolve).catch(reject)
		})
	}

	prospects(s) {
		return {
			newest: () => {

			},
			find: (s) => {

				if (s.campaign && s.campaigns) {
					return Promise.reject('Only use `campaign` or `campaigns`, not both.')
				}

				if (s.campaign) {
					s.campaigns = s.campaign
					delete s.campaign
				}

				if (s.campaigns) {
					if (!(s.s instanceof Array)) {
						search.campaigns = [s.campaigns]
					}
					s.campaigns_id = s.campaigns.join(',')
					delete s.campaigns
				}

				if (s.campaign && s.campaigns) {
					return Promise.reject('Only use `id` or `ids`, not both.')
				}

				if (s.ids) {
					s.id = s.ids
					delete s.ids
				}

				if (s.id) {
					if (!(s.id instanceof Array)) {
						s.id = [s.id]
					}
					s.id = s.id.join(',')
				}

				if (s.interest) {
					s.interested = s.interest
					delete s.interest
				}

				if (s.contact) {
					s.contacted = s.contact ? '1' : '0'
					delete s.contact
				}

				if (s.updated) {
					s.diff = {
						data: s.updated,
						type: 'updated'
					}
					delete s.updated
				}

				if (s.opened) {
					s.diff = {
						data: s.opened,
						type: 'opened'
					}
					delete s.opened
				}

				if (s.clicked) {
					s.diff = {
						data: s.clicked,
						type: 'clicked'
					}
					delete s.clicked
				}

				if (s.diff && s.diff.type) {
					if (typeof s.diff.data == 'string') {
						s.diff = {
							op: s.diff.substr(0,1),
							date: s.diff(1),
							type: s.diff.type
						}
						if (s.diff.op != '<' && s.diff.op != '>') {
							return Promise.reject('Invalid date operation', s.diff.op)
						}
					}
					switch (s.diff) {
						case 'updated':
							s.diff.type = 'updated'
							break
						case 'opened':
							if (!s.activity != WoodPecker.activity.OPENED) {
								return Promise.reject('Opened activity requires the `activity` param')
							}
							s.diff.type = 'last_opened'
							break
						case 'clicked':
							if (!s.activity) {
								return Promise.reject('Opened activity requires the `activity` param')
							}
							s.diff.type = 'last_clicked'
							break
						default:
							return Promise.reject('Invalid diff type', s.diff.type)
							break
					}

					s.diff = s.diff.type + s.diff.op + moment(s.diff.date)
				}

				if (s.limit) {
					s.per_page = s.limit
					delete s.limit
				}

				s.per_page = parseInt(s.per_page, 10)
				s.page = parseInt(s.page, 10)

				if (parseInt(s.per_page, 10) > 500) {
					return Promise.reject('Maximum per page limit is 500. Default is 100.')
				}

				return this.req('rest/v1/prospects', s)
			},
			addToCampaign: () => {

			},
			addToList: () => {

			}
		}

	}

	campaigns(s) {
		return this.req('rest/v1/campaign_list', s)
	}

	prospect() {

	}
}

module.exports = key => {
	return new WoodPecker(key)
}
