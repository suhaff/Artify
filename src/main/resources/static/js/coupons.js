const coupons = [
  { code:"ARTIFY10", amount:200, type:"flat" },
  { code:"WELCOME15", amount:15, type:"percent" }
];

function getCoupon(code){
  return coupons.find(c=>c.code === code.toUpperCase());
}
