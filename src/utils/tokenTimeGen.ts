const getTokenExpiryTime = () => {
     const expiredAtDate = new Date(
       new Date().getTime() + 1000 * 60 * 60 * 24 * 7
     ); // 7 days
     return expiredAtDate;
   };
   

  export default  getTokenExpiryTime;