if (!process.env.WOODPECKER_KEY) {
  throw 'Tests require a woodpecker api key'
}

const
  assert = require('assert')
  Woodpecker = require('../woodpecker')(process.env.WOODPECKER_KEY)

describe('Woodpecker', function() {
  this.timeout(10000)

  var campaign = 1
  before(() => {
    return new Promise((resolve, reject) => {
      Woodpecker.campaigns().find()
        .then(d => {
          console.log('campaign', d[0])
          campaign = d[0].id
          resolve()
        })
        .catch(reject)
    })
  })

  describe('#campaigns', () => {
    it('should find a campaign', () => {
      return Woodpecker.campaigns().find()
    })

    it('should find running campaigns', () => {
      return Woodpecker.campaigns()
        .find({
          status: Woodpecker.campaignStatus.RUNNING
        })
    })

    it('should find by id', () => {
      return Woodpecker.campaigns()
        .find({
          id: 1
        })
    })

    it('should find by ids', () => {
      return Woodpecker.campaigns()
        .find({
          ids: [1, 2]
        })
    })

    it('should find by status', () => {
      return Woodpecker.campaigns()
        .find({
          status: Woodpecker.campaignStatus.RUNNING
        })
    })
  })

  describe('#prospects', () => {
    it('should find all prospects', () => {
      return Woodpecker.prospects().find()
    })

    it('should find a campaign prospect', () => {
      return Woodpecker.prospects().find({
        campaign: 1
      })
    })

    it('should find multiple campaigns prospect', () => {
      return Woodpecker.prospects().find({
        campaign: [1]
      })
    })

    it('should find multiple campaigns prospect with array plural', () => {
      return Woodpecker.prospects().find({
        campaigns: [1]
      })
    })

    it('should not allow id and ids', () => {
      return new Promise((resolve, reject) => {
        Woodpecker.prospects()
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
        Woodpecker.prospects()
          .find({
            campaign: true,
            campaigns: true
          })
          .then(reject)
          .catch(resolve)
      })
    })

    it('should find replied status prospects', () => {
      return Woodpecker.prospects().find({
        status: Woodpecker.prospectStatus.REPLIED
      })
    })

    it('should find to check status', () => {
      return Woodpecker.prospects().find({
        campaign: 1,
        status: Woodpecker.prospectStatus['TO-CHECK']
      })
    })

    it('should find paused status', () => {
      return Woodpecker.prospects().find({
        campaign: 1,
        status: Woodpecker.prospectStatus['PAUSED']
      })
    })

    it('should find opened activity', () => {
      return Woodpecker.prospects().find({
        activity: Woodpecker.activity.OPENED
      })
    })

    it('should find opened and replied', () => {
      return Woodpecker.prospects().find({
        activity: Woodpecker.activity.OPENED,
        status: Woodpecker.prospectStatus.REPLIED
      })
    })

    it('should find opened in a campaign', () => {
      return Woodpecker.prospects().find({
        campaign: 1,
        interest: Woodpecker.interest.INTERESTED
      })
    })

    it('should find not contacted', () => {
      return Woodpecker.prospects().find({
        contacted: false
      })
    })

    it('should find by id', () => {
      return Woodpecker.prospects().find({
        id: 2225
      })
    })

    it('should find by ids', () => {
      return Woodpecker.prospects().find({
        ids: [1,2]
      })
    })

    it('should go to page 2', () => {
      return Woodpecker.prospects().find({
        $page: 2
      })
    })

    it('should go to page 2 with skip', () => {
      return Woodpecker.prospects().find({
        $skip: 10
      })
    })

    it('should not allow single limit with no query', () => {
      return new Promise((resolve, reject) => {
        Woodpecker.prospects()
          .find({
            $limit: 1
          })
          .then(reject)
          .catch(resolve)
      })
    })

    it('should not allow large limits', () => {
      return new Promise((resolve, reject) => {
        Woodpecker.prospects()
          .find({
            $limit: 501
          })
          .then(reject)
          .catch(resolve)
      })
    })

    it('should show replied on page 2 and only 20', () => {
      return Woodpecker.prospects().find({
        $page: 2,
        $limit: 20,
        status: Woodpecker.prospectStatus.REPLIED
      })
    })

    it('should show updated after today', () => {
      return Woodpecker.prospects().find({
        updated: {
          op: '>',
          date: new Date
        }
      })
    })

    it('should not allow invalid date operations', () => {
      return new Promise((resolve, reject) => {
        Woodpecker.prospects()
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
        Woodpecker.prospects()
          .find({
            opened: '>2017-01-01'
          })
          .then(reject)
          .catch(resolve)
      })
    })

    it('should show opened after today using string', () => {
      return Woodpecker.prospects().find({
        opened: '>2017-01-01',
        activity: Woodpecker.activity.OPENED
      })
    })

    it('should show require activity when using opened', () => {
      return new Promise((resolve, reject) => {
        Woodpecker.prospects()
          .find({
            clicked: '>2017-01-01'
          })
          .then(reject)
          .catch(resolve)
      })
    })

    it('should show clicked after today using string', () => {
      return Woodpecker.prospects().find({
        clicked: '>2017-01-01',
        activity: Woodpecker.activity.CLICKED
      })
    })

    it('find devin smith', () => {
      return Woodpecker.prospects().find({
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
        Woodpecker.prospects()
          .find({
            $sort: {
              opened: 1
            },
            activity: Woodpecker.activity.CLICKED
          })
          .then(reject)
          .catch(resolve)
      })
    })

    it('should not allow clicked sort without clicked activity', () => {
      return new Promise((resolve, reject) => {
        Woodpecker.prospects()
          .find({
            $sort: {
              clicked: 1
            },
            activity: Woodpecker.activity.OPENED
          })
          .then(reject)
          .catch(resolve)
      })
    })

    it('should allow opened sort with opened activity', () => {
      return Woodpecker.prospects()
        .find({
          $sort: {
            opened: 1
          },
          activity: Woodpecker.activity.OPENED
        })
    })

    it('should allow clicked sort with clicked activity', () => {
      return Woodpecker.prospects()
        .find({
          $sort: {
            clicked: 1
          },
          activity: Woodpecker.activity.CLICKED
        })
    })

    it('should find and sort using string', () => {
      return Woodpecker.prospects().find({
        firstName: 'devin',
        sort: '+first_name,+id,+country'
      })
    })

    it('should not allow id and limit', () => {
      return new Promise((resolve, reject) => {
          Woodpecker.prospects()
            .find({
              id: 1,
              $limit: 1
            })
            .then(reject)
            .catch(resolve)
      })
    })

    it('should find and sort using all data', () => {
      return Woodpecker.prospects().find({
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
      return Woodpecker.prospects().newest()
    })

    it('should get replied', () => {
      return Woodpecker.prospects().replied()
    })

    it('should get opened', () => {
      return Woodpecker.prospects().opened()
    })

    it('should get clicked', () => {
      return Woodpecker.prospects().clicked()
    })

    it('should get notContacted', () => {
      return Woodpecker.prospects().notContacted()
    })
  })

  describe('#editing', () => {

    it('should blacklist by id', () => {
      return new Promise((resolve, reject) => {
        Woodpecker.prospects()
        	.add({
        		firstName: 'mr',
        		lastName: 'mr test',
        		email: 'a' + Math.random() * 1000 + '@somedomain.com'
        	})
        	.then(d => {
            setTimeout(() => {
              Woodpecker.prospects()
              	.blacklist(d.prospects[0].id)
                .then(resolve)
                .catch(reject)
            }, 1000)
        	})
        	.catch(reject)
        })
    })

    it('should blacklist by email', () => {
      return new Promise((resolve, reject) => {
        Woodpecker.prospects()
          .add({
            firstName: 'mr',
            lastName: 'mr test',
            email: 'a' + Math.random() * 1000 + '@somedomain.com'
          })
          .then(d => {
            setTimeout(() => {
              Woodpecker.prospects()
                .blacklist(d.prospects[0].email)
                .then(resolve)
                .catch(reject)
            }, 1000)
          })
          .catch(reject)
        })
    })

    it('should add and then update prospect', () => {
      return new Promise((resolve, reject) => {
        Woodpecker.prospects()
          .add({
            firstName: 'mr',
            lastName: 'mr test',
            email: 'a' + Math.random() * 1000 + '@somedomain.com'
          })
          .then(d => {
            setTimeout(() => {
              Woodpecker.prospects()
                .edit({
                  id: d.prospects[0].id,
                  firstName: 'ms',
                  lastName: 'ms test',
                  email: d.prospects[0].email
                })
                .then(resolve)
                .catch(reject)
            }, 1000)
          })
          .catch(reject)
        })
    })

    it('should delete by email', () => {
      return new Promise((resolve, reject) => {
        Woodpecker.prospects()
          .add({
            firstName: 'mr',
            lastName: 'mr test',
            email: 'a' + Math.random() * 1000 + '@somedomain.com'
          })
          .then(d => {
            setTimeout(() => {
              Woodpecker.prospects()
                .delete(d.prospects[0].email)
                .then(resolve)
                .catch(reject)
            }, 1000)
          })
          .catch(reject)
        })
    })

    it('should delete by id', () => {
      return new Promise((resolve, reject) => {
        Woodpecker.prospects()
          .add({
            firstName: 'mr',
            lastName: 'mr test',
            email: 'a' + Math.random() * 1000 + '@somedomain.com'
          })
          .then(d => {
            setTimeout(() => {
              Woodpecker.prospects()
                .delete(d.prospects[0].id)
                .then(resolve)
                .catch(reject)
            }, 1000)
          })
          .catch(reject)
        })
    })

    it('should add or update', () => {
      return new Promise((resolve, reject) => {
        Woodpecker.prospects()
          .edit({
            firstName: 'mr',
            lastName: 'mr test',
            email: 'a' + Math.random() * 1000 + '@somedomain.com'
          })
          .then(d => {
            setTimeout(() => {
              Woodpecker.prospects()
                .delete(d.prospects[0].id)
                .then(resolve)
                .catch(reject)
            }, 1000)
          })
          .catch(reject)
        })
    })

    it('should add a prospect to a campaign', () => {
      return Woodpecker.prospects()
        .add({
          firstName: 'mr',
          lastName: 'mr test',
          email: 'a' + Math.random() * 1000 + '@somedomain.com'
        }, campaign)
    })

    it('should delete a prospect from a campaign', () => {
      return Woodpecker.prospects()
        .delete(1, campaign)
    })

    it('should add or update multiple', () => {
      return Woodpecker.prospects()
        .edit([
          {
            firstName: 'mr2',
            lastName: 'mr test2',
            email: 'a' + Math.random() * 1000 + '@somedomain.com'
          },
          {
            firstName: 'mr3',
            lastName: 'mr test3',
            email: 'a' + Math.random() * 1000 + '@somedomain.com'
          }
        ])
    })
  })

  describe('#webhooks', () => {
    it('should subscribe to a webhook event', () => {
      return Woodpecker.webhooks().subscribe('https://woodpecker-api-webhook-test.herokuapp.com/hook', Woodpecker.webhookEvent.REPLIED)
    })

    it('should unsubscribe to a webhook event', () => {
      return Woodpecker.webhooks().unsubscribe('https://woodpecker-api-webhook-test.herokuapp.com/hook', Woodpecker.webhookEvent.REPLIED)
    })
  })

  describe('#global', () => {
    it('should not allow request without key', () => {
      return new Promise((resolve, reject) => {
        Woodpecker.key = null
        Woodpecker.campaigns()
          .find()
          .then(reject)
          .catch(resolve)
      })
    })
  })
})
