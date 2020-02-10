

import bcrypt from 'bcrypt';
import _ from 'lodash';
import models from "../models";
import dbHelper from "../helpers/dbHelper";

const Users=models.User;
const saltRounds = 10;

module.exports={
    login: {
        async post(req, res) {
          let user = await dbHelper.checkExistence({
            sequelize_obj: Users,
            query_options: { where: { email: req.body.email } },
            res: res,
            autosend: false,
            method: 'findOne'
          });
          if (user) {
            const decryptedPassword = await bcrypt.compare(req.body.password, user.password);
            if (decryptedPassword) {
              return res.send({
                username: user,
                
              })
            } else {
              return res.status(401).send({ message: "Incorrect Password." });
            }
          } else {
            return res.status(400).send({ message: "User Not Found." });
          }
        }
      },    
register: {
    async post(req, res) {
    
      try {
        let reqBody = req.body;
          let encryptedPassword = await bcrypt.hash(req&&req.body.password, saltRounds);
          let User = await Users.create({
            username: reqBody.username,
            password: encryptedPassword,
            email: reqBody.email,
            mobile_number:reqBody.mobile_number,
            is_admin: reqBody.is_admin ? reqBody.is_admin : 0,
            created_at: new Date(),
            updated_at: new Date()
          });
       
          if (User && User.id) {
            return res.send({ message: "Registration Successful", User });
          } else {
            return res.status(500).send({ message: "Unable to process your request, please try again later", User });
          }
       
      } catch (e) {
        return res.status(500).send({ message: "Unable to process your request, please try again later", e });
      }
    }
  }
}