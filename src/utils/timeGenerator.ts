const getOtpExpiryTime = () => {
  const expiredAtDate = new Date(new Date().getTime() + 1000 * 60 * 10); // 10 minutes
  return expiredAtDate;
};

export default getOtpExpiryTime;
