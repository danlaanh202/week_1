import * as yup from "yup";

async function productInputMiddleware(ctx, next) {
  try {
    const postData = ctx.request.body;
    let schema = yup.object({
      id: yup.number().positive().integer(),
      name: yup.string(),
      price: yup.number().positive(),
      description: yup.string(),
      product: yup.string(),
      color: yup.string(),
      image: yup.string(),
    });
    await schema.validate(postData);
    await next();
  } catch (error) {
    ctx.status = 400;
    ctx.body = {
      success: false,
      errors: error.errors,
      errorName: error.name,
    };
  }
}

export default productInputMiddleware;
