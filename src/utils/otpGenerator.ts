import otpGenerator from 'otp-generator';

const generateOTP = () => {
  const OTP = otpGenerator.generate(6, {
    digits: true,
    upperCaseAlphabets: false,
    lowerCaseAlphabets: false,
    specialChars: false,
  });

  return OTP;
};

export default generateOTP;
