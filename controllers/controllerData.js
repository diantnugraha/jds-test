const axios = require("axios");

class Controller {
  static async getDataRoleUser(req, res, next) {
    try {
      let { data: products } = await axios.get(
        "https://60c18de74f7e880017dbfd51.mockapi.io/api/v1/jabar-digital-services/product"
      );
      let limitProducts = products.slice(0, 10);

      let convert = await Promise.all(
        limitProducts.map(async (product) => {
          let { data: convertIDR } = await axios.get(
            `https://api.apilayer.com/exchangerates_data/convert?to=IDR&from=USD&amount=${product.price}`,
            {
              headers: {
                apikey: "vyePKBaDFhrxttJwvgPdsPcgU0Q5BaPO",
              },
            }
          );
          let objData = {
            id: product.id,
            priceUSD: product.price,
            priceIDR: `Rp ${convertIDR.result}`,
            department: product.department,
            product: product.product,
            createdAt: product.createdAt,
          };
          return objData;
        })
      );
      res.status(201).json(convert);
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  static async getDataRoleAdmin(req, res, next) {
    try {
      let { data: products } = await axios.get(
        "https://60c18de74f7e880017dbfd51.mockapi.io/api/v1/jabar-digital-services/product"
      );
      let limitProducts = products.slice(0, 10);

      limitProducts.map((product) => {
        let ascIDR = product.price.sort(function (a, b) {
          return a - b;
        });
        console.log(ascIDR, "ini dari sort");
      });
    } catch (error) {}
  }
}

module.exports = Controller;
