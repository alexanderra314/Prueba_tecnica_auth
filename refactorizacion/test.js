// test.js
const original = require("./original").getOrderNotification;
const refactorizado = require("./refactorizado").getOrderNotification;

const testCases = [
  {
    name: "Caso con PAYPAL por defecto (FR, id<745)",
    order: { id: 100, country: "FR", provider: "X", locator: "123", associated: false, productStatus: "PENDING" },
  },
  {
    name: "Caso confirmado con reseller X",
    order: {
      id: 999,
      country: "ES",
      provider: "X",
      locator: "ABC",
      associated: true,
      productStatus: "PENDING",
      status: "RESERVED",
      reseller: "RESELLER_X",
      payment: { type: "PAYPAL" },
    },
  },
  {
    name: "Caso con error de proveedor",
    order: { id: 200, country: "ES", provider: "PROVIDER_1", productStatus: "ERROR" },
  },
];

testCases.forEach(({ name, order }, i) => {
  //const resultOriginal = original(order);
  //console.log(`Test ${i + 1} – ${name}:`);
  //console.log("Resultado Original:", resultOriginal);


  const resultRefactor = refactorizado(order);
  console.log(`Test ${i + 1} – ${name}:`);
  console.log("Resultado Original:", resultRefactor);


  console.log("------");
});
