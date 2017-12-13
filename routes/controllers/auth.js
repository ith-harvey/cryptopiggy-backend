const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');
const rp = require('request-promise')

const { Auth } = require('../../db')

const awsSesURL = 'https://email.us-west-2.amazonaws.com
?Action=SendEmail'



function signIn (req, res, next) {
  Auth.getUserByUsername(req.body.username).then( user => {
    user = user[0]
    console.log('what we get !!!!!!', user)
    if (!user) {
      res.status(401).json({
        error: true,
        message: 'Username or Password is Wrong'
      });
    }

    bcrypt.compare(req.body.password, user.hash_pass, function (err, valid) {
      if (!valid) {
       return res.status(404).json({
               error: true,
               message: 'Username or Password is Wrong'
         });
      }

      delete user.hash_pass, user.created_at, user.updated_at

      let data = {
        id: user.id,
        username: user.username
      }
      const token = jwt.sign(data, 'AKJOISDNFLKHALKNDSFIOHSLKJDSFLKHSDIOES');
      res.json({
         user: user,
         token: token
       });
     })
  }).catch( err => {
    console.log('what error we get !!!!!!', err)
    console.log(err);
  })
}

function signUp (req, res, next) {
  const body = req.body;
  const hash = bcrypt.hashSync(body.password.trim(), 10);
  const user = {
    username: body.username.trim(),
    hash_pass: hash,
  };

  Auth.getUserByUsername(user.username).then(response => {
    console.log('checking if username exists:  ', response)
    if (response.length) {
      res.status(401).json({
        error: true,
        message: 'Username already exists'
      });
    } else {
      Auth.createUser(user).then( response => {
        user.id = response[0].id
        delete user.hash_pass
        console.log('the user has successfully been created:  ', user)
        const token = jwt.sign(user, 'AKJOISDNFLKHALKNDSFIOHSLKJDSFLKHSDIOES');
        res.json({
           user: user,
           token: token
        });
      })
    }
  })
}


function PasswordReset(req,res,next) {
  console.log('hitting password reset')
  const body = req.body;
  const username = body.username.trim()

  Auth.getUserByUsername(username).then(response => {
    if (response.length) {

      function sendPasswordReset(awsSesURL,emailAddress,subject,bodyMessage) {
        // email is user%40example.com

        var options = {
          uri: `${awsSesURL}&Source=questions%40cryptopiggy.us
          &Message.Subject.Data=Crypto%20Piggy%20password%20reset%20
          &Message.Body.Text.Data=Hello.%20I%20hope%20you%20are%20having%20a%20good%20day.`,
          headers: {
              'User-Agent': 'Request-Promise'
          },
          json: true // Automatically parses the JSON string in the response
        };
        return rp(options)
      }

      var options = {
        uri: `${etherscanURL}module=account&action=balancemulti&address=${addressArr}&tag=latest&apikey=${eScanApiKey}`,
        headers: {
            'User-Agent': 'Request-Promise'
        },
        json: true // Automatically parses the JSON string in the response
      };

      awsSesURL

      '&Source=user%40example.com
      &Destination.ToAddresses.member.1=allan%40example.com
      &Message.Subject.Data=This%20is%20the%20subject%20line.
      &Message.Body.Text.Data=Hello.%20I%20hope%20you%20are%20having%20a%20good%20day.
      '

    } else {
      res.status(401).json({
        error: true,
        message: 'Username does not exist'
      });
    }


}

module.exports = {
  signIn,
  signUp
}
