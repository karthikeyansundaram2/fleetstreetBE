import cors from 'cors';
import path from 'path';
import createError from 'http-errors';
import models from "../app/models";
var bodyParser = require("body-parser");
export default function middleware(app, express) {
  // view engine setup
  // app.set('views', path.join(__dirname, '../app/views'));
  // app.set('view engine', 'jade');

  //cors
  // app.use(cors({ credentials: true, origin: ['http://localhost:5050','http://localhost:4000'] }));
  app.use(cors({origin: true, credentials: true}));

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));

  // catch 404 and forward to error handler
  // app.use(function (req, res, next) {
  //   next(createError(404));
  // });

  // // error handler
  // app.use(function (err, req, res, next) {
  //   // set locals, only providing error in development
  //   res.locals.message = err.message;
  //   res.locals.error = req.app.get('env') === 'development' ? err : {};

  //   // render the error page
  //   res.status(err.status || 500).send({ err });
  //   // res.render('error');
  // });
};