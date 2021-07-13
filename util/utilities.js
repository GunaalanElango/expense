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
