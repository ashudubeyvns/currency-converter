const URL = "https://api.exchangerate-api.com/v4/latest/USD";

const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");

// Populate dropdowns with currency options
for (let select of dropdowns) {
  for (currCode in countryList) {
    let newOption = document.createElement("option");
    newOption.innerText = currCode;
    newOption.value = currCode;
    if (select.name === "from" && currCode === "USD") {
      newOption.selected = "selected";
    } else if (select.name === "to" && currCode === "INR") {
      newOption.selected = "selected";
    }
    select.append(newOption);
  }
  select.addEventListener("change", (evt) => {
    updateFlag(evt.target);
  });
}

// Function to update the flag based on selected currency
const updateFlag = (element) => {
  let currCode = element.value;
  let countryCode = countryList[currCode];
  let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
  let img = element.parentElement.querySelector("img");
  img.src = newSrc;
};

// Function to update the exchange rate
const updateExchangeRate = async () => {
  let amount = document.querySelector(".amount input");
  let amtVal = amount.value;

  // Ensure amount is valid
  if (amtVal === "" || amtVal < 1) {
    amtVal = 1;
    amount.value = "1";
  }
    // Fetch the exchange rate
    let response = await fetch(URL);
    let data = await response.json();
    let rates = data.rates;
    let fromCurrency = fromCurr.value;
    let toCurrency = toCurr.value;
    
    // Calculate and display the exchange rate
    if (rates[toCurrency]) {
      let rate = rates[toCurrency] / rates[fromCurrency];
      let finalAmount = amtVal * rate;
      msg.innerText = `${amtVal} ${fromCurrency} = ${finalAmount.toFixed(2)} ${toCurrency}`;
  } 
};

// Button click event to trigger exchange rate update
btn.addEventListener("click", async (evt) => {
  evt.preventDefault();
  await updateExchangeRate(); // Ensure async function completes
});

// Update exchange rate on window load
window.addEventListener("load", async () => {
  await updateExchangeRate(); // Ensure async function completes
});