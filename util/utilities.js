export const initCaps = (string) => {
  return string.replace(/^\w/, (firstChar) => firstChar.toUpperCase());
};

export const indianCurrency = (amt) => {
  amt = amt.toString();

  if (amt.includes(".")) {
    let amountArr = amt.split(".");
    let amount = amountArr[0];
    let decimal = "." + amountArr[1];

    let lastThreeDigit = amount.substring(amount.length - 3);
    let otherNumbers = amount.substring(0, amount.length - 3);

    if (otherNumbers != "") {
      lastThreeDigit = "," + lastThreeDigit;
    }

    return (
      otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ",") +
      lastThreeDigit +
      decimal
    );
  } else {
    let lastThreeDigit = amt.substring(amt.length - 3);
    let otherNumbers = amt.substring(0, amt.length - 3);

    if (otherNumbers != "") {
      lastThreeDigit = "," + lastThreeDigit;
    }

    return otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ",") + lastThreeDigit;
  }
};

export const getDateByTimestamp = (timestamp) => {
  const date = new Date(timestamp);

  const day = date.getDate();
  const month = date.getMonth();
  const year = date.getFullYear();

  const hours = date.getHours() > 12 ? date.getHours() - 12 : date.getHours();
  const minutes =
    date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
  const a = date.getHours() >= 12 ? "PM" : "AM";

  let isToday = false;
  const todayDate = new Date();
  if (
    day == todayDate.getDate() &&
    month == todayDate.getMonth() &&
    year == todayDate.getFullYear()
  ) {
    isToday = true;
  }

  if (isToday) {
    return `Today, ${hours}:${minutes} ${a}`;
  }

  return `${day}/${month}/${year}, ${hours}:${minutes} ${a}`;
};
