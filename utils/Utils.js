const generateVerificationToken = () => {
  let size = 6;
  let digits = "0123456789";
  let otp = "";
  for (let i = 0; i < size; i++) {
    otp += digits[Math.floor(Math.random() * 10)];
  }
  return parseInt(otp);
};

module.exports = generateVerificationToken;
