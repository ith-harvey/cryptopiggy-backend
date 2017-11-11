const bcrypt = require('bcrypt')
const moment = require('moment');

const { jwtUtils } = require('./utilfolder')
const { ethscan } = require('./utilfolder')
const { dataclean } = require('./utilfolder')
const { Time } = require('./utilfolder')

const { Performancehistory } = require('../../db')
const { Auth } = require('../../db')


function windowOfPerformance (req, res, next) {
  const id =  jwtUtils.parseToken(req.body.token).id.toString()
  Auth.getUserById(id).then( response => {
    const whenCreated = `'${moment(response.created_at, 'YYYY-MM-DD').format('MM/DD/YYYY')}'`

  Performancehistory.getWindow(id, whenCreated).then( result => {

    const returnObj = {
      twoWeeksAgo: dataclean.windowPerform(result, Time.twoWeeksAgo()),
      oneMonthAgo: dataclean.windowPerform(result, Time.oneMonthAgo()),
      sixMonthsAgo: dataclean.windowPerform(result, Time.oneMonthAgo()),
      oneYearAgo: dataclean.windowPerform(result, Time.aYearAgo()),
      whenCreated: dataclean.windowPerform(result, whenCreated)
    }

    res.send(returnObj)

    /*final returnObj = {
          twoWeeksAgo: {
            value: XXXX.XX / null,
            data: [[created_at, portfolio_value: 24333]]
          },
          oneMonthAgo: {
            value: XXXX.XX / null,
            data: [[created_at, portfolio_value: 24333]]
          }
          sixMonthsAgo: {
            value: XXXX.XX / null,
            data: [[created_at, portfolio_value: 24333]]
          }
          twelveMonthsAgo: {
            value: XXXX.XX / null,
            data: [[created_at, portfolio_value: 24333]]
          }
     }*/

    })
  })
}


module.exports = {
  windowOfPerformance
}
