const addDateSuffix = (date) => {
    let dateStr = date.toString();
// returns the last character of the date string
    const lastChar = dateStr.charAt(dateStr.length - 1);

    if (lastChar === "1" && dateStr !== "11") {
        dateStr = `${dateStr}st`;
    } else if (lastChar === "2" && dateStr !== "12") {
        dateStr = `${dateStr}nd`;
    } else if (lastChar === "3" && dateStr !== "13") {
        dateStr = `${dateStr}rd`;
    } else {
        dateStr = `${dateStr}th`;
    }

    return dateStr;
};
// creates the shortened months
module.exports = (
    timestamp,
    { monthLength = "short", dateSuffix = true } = {}
) => {
    let months;

    if (monthLength === "short") {
        months = {
            0: "Jan",
            1: "Feb",
            2: "Mar",
            3: "Apr",
            4: "May",
            5: "Jun",
            6: "Jul",
            7: "Aug",
            8: "Sep",
            9: "Oct",
            10: "Nov",
            11: "Dec",
        };
    } else {
        months = {
            0: "January",
            1: "February",
            2: "March",
            3: "April",
            4: "May",
            5: "June",
            6: "July",
            7: "August",
            8: "September",
            9: "October",
            10: "November",
            11: "December",
        };
    }

    const dateObj = new Date(timestamp);
    const formattedMonth = months[dateObj.getMonth()];

    let dayOfMonth;

    if (dateSuffix) {
        dayOfMonth = addDateSuffix(dateObj.getDate());
    } else {
        dayOfMonth = dateObj.getDate();
    }

    const year = dateObj.getFullYear();
// allows the time to be in either 12 hr or 24 hr format
    let hour;
    
    if (dateObj.getHours > 12) {
        hour = Math.floor(dateObj.getHours() / 2);
    } else {
        hour = dateObj.getHours();
    }
    
    if (hour === 12) {
        hour = 0;
    }

    const minutes = dateObj.getMinutes();
// adds am or pm to the end of the timestamp
    let periodOfDay;

    if (dateObj.getHours() >= 12) {
        periodOfDay = "pm";
    } else {
        periodOfDay = "am";
    }
// puts the date and time in the order we select
    const formattedTimeStamp = `${formattedMonth} ${dayOfMonth}, ${year} at ${hour}:${minutes} ${periodOfDay}`;

    return formattedTimeStamp;
};