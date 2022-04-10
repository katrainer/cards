export const formatDate = (dates: string) => {
    const date1: Date = new Date(dates);
    let date = String(date1.getDate());
    if (+date < 10) date = '0' + date;
    let month = String(date1.getMonth());
    if (+month < 10) month = '0' + month;
    let year = date1.getFullYear();
    let result = date + '.' + month + '.' + year;
    return result
}