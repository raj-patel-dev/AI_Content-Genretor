export const calculateNextBillingDate = () => {
    const oneMonthFromNow = new Date();
    oneMonthFromNow.setMonth(oneMonthFromNow.getMonth()+1);
    return oneMonthFromNow;
};
