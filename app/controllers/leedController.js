import _ from 'lodash';
import models from "../models";
import dbHelper from "../helpers/dbHelper";


const leeds=models.Leeds;
const User=models.User;
module.exports={
    leeds:{
        async post(req,res){
            try{
                let reqBody = req.body;

                let user = await dbHelper.checkExistence({
                    sequelize_obj: User,
                    query_options: { where: { id: reqBody.user_id } },
                    res: res,
                    autosend: false,
                    method: 'findOne'
                  });
                  if (user) {
                let leed = await leeds.create({
                    user_id: reqBody.user_id,
                    leed_status:reqBody.leed_status,
                    type:reqBody.type,
                    leed_address:reqBody.leed_address,
                    created_at: new Date(),
                    updated_at: new Date()
                  });

                  if(leed&&leed.id){
                      res.send({message:"leed has been created successfully"})
                  }
                  else{
                    return res.status(500).send({ message: "Unable to process your request, please try again later", leed });

                  }
            }
            else{
                res.status(400).send({message:"No user found on given id"})
            }
        }
            catch(e)
            {
                res.status(500).send({message:e})
            }
        },
        async get(req,res){
            try{
                await dbHelper.checkExistence({
                    sequelize_obj: leeds,
                    query_options: { where: { user_id: req.query.user_id } },
                    res: res,
                    autosend: false,
                    method: 'findAll'
                  }).then(leeds=>{
                    if(leeds){
                        res.status(200).send(leeds)
                    }
                }).catch((e)=>{
                    res.status(500).send({message:e})
                })
            }
            catch(e){
                res.status(500).send({message:e})
            }
        },
        async puts(req,res){
            try{
                if(req&&req.query.id){
                    models.sequelize.query(
                        `UPDATE leeds set leed_status='${req.query.status} where id=${req.query.id}`
                    ).then(updatedLeed=>{
                        if(updatedLeed){
                            res.send({message:"leed updated"})
                        }
                        else{
                            res.status(400).send({message:"no id found"})
                        }
                    })
                }
                else{
                    res.status(400).send({message:'no id given'})
                }
            }
            catch(e){
                res.status(500).send({message:e})
            }
        }
    }
}