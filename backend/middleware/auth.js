import jwt from "jsonwebtoken"

const authUser = async (req, res, next) => {
  const {token} = req.headers
  if(!token){
    return res.json({success: false, message: "Not Authorized Please Login Again"})
  }

  try {
    const token_decade = jwt.verify(token, process.env.JWT_SECRIT);
    req.body.userId = token_decade.id
    next();
  } catch (error) {
    console.log(error);
    res.json({success: false, message: error.message});
  }
}

export default authUser;
