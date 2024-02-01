
// console.log('12123123');

let price = 33;
let unit = "USD";

const payload = {
  intent: "CAPTURE",
  purchase_units: [
    {
      amount: {
        currency_code: unit,
        value: price,
      },
    },
  ],
};

console.log(payload.purchase_units[0].amount.currency_code);
console.log(payload.purchase_units[0].amount.value);
