const User = require( "../schema/user") ;
const {validationResult} = require('express-validator')
const sgMail = require('@sendgrid/mail');


const signup = async(req, res)=>{
    const errors = validationResult(req);
    
    if(!errors.isEmpty()){
        return res.status(422).json({
            error : errors.array()[0].msg
        })
    }

    const user = new User(req.body);
    user.save( (err , user)=>{
        if (err){
            return res.status(400).json({
                err : "NOT able to save Data in DB",
                error:err
            })
        };
      return  res.json( {
            name : user.name,
            email : user.email,
            pass : user.encry_password
        } ) ;


        
    } )
    const finalMessage = `Welcome ${user.name} from Your host Dhanam`;
 

    // const sender = sender_email;
    const sender = user.email;

    // emailLogic(sender, finalMessage);

    sgMail.setApiKey(process.env.SENDGRID_API_KEY)
    const msg = {
      to: sender, // Change to your recipient
      from: 'raphaelstryker110@gmail.com', 
      subject: 'A Sihnup Message From Dhanam',
      text: 'and easy to do anywhere, even with Node.js',
      html: finalMessage,
    }
    sgMail
      .send(msg)
      .then(() => {
       return  res.send ('Please check your email!')
      })
      .catch((error) => {
        return res.send(error)
      })
  


}

module.exports = signup