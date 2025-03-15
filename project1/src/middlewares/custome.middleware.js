export const logger = (req, res, next) => {
  console.log("Logger middleware is called !");
  console.log(` Method : ${req.method} , URL : ${req.url}`);
  next();
};
export const validationMiddleware = (req, res, next) => {
  const { title, author, publishingYear } = req.body;
  if (!title || !author || !publishingYear) {
    const error = new Error("Data is not  completed !");
    console.log(error.message);
    throw error;
  }
  next();
};
