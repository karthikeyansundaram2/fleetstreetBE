import index from "./routes/index";
import userRoute from "./routes/userRoute";
import leedRoute from "./routes/leedRoute";
module.exports = [
    {
      path: "/",
      handler: index
    },
    {
      path:'/user',
      handler:userRoute
    },
    {
      path:'/leeds',
      handler:leedRoute
    }
]