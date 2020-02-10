document.addEventListener("DOMContentLoaded", main);

function main(){
loadCountries();
document.getElementById("btnDog").onclick = changeDog;
document.getElementById("btnProfile").onclick = changeProfile;
//document.getElementById("btnSubmit").onclick = submit;

}  
        function changeDog(){
            fetch('https://dog.ceo/api/breeds/image/random')
                .then(response => response.json())
                .then(data => {
                    let url = data.message;
                    let output = `<img src='${url}'/>`;
                   
                    document.getElementById("dog").innerHTML = output;
                });
        }


       

function changeProfile(){
    fetch('https://randomuser.me/api')
    .then(response => response.json())
    .then(data => {
        let info = data.results[0];
        let countryCode = info.nat;
        getCountry(countryCode);
        let url = info.picture.large;
        let firstName = info.name.first;
        let lastName = info.name.last;
        let robotSrc = `https://robohash.org/${firstName}${lastName}`;
        let output3 = `<img src='${robotSrc}' id="r"/>`;
        let output = `<img src='${url}'/>`;
        let output2 = `<h5> ${firstName} ${lastName}</h5>`;
        let output4 = `<img src='https://www.countryflags.io/${countryCode}/flat/64.png'/>`;
        document.getElementById("flag").innerHTML = output4;
        document.getElementById("idimg").innerHTML = output3;
        document.getElementById("person").innerHTML = output;
        document.getElementById("name").innerHTML = output2;
    });}

    function getCountry(param){
    let url2 = "https://restcountries.eu/rest/v2/alpha/" + param;
    fetch(url2)
    .then(response => response.json())
    .then(data => {
        let code = data.name;
        let output5 = `<p>${code}</p>`;
        document.getElementById("countryName").innerHTML = output5;
       
    }) 
    ;}
    
 function loadCountries(){
    fetch('https://restcountries.eu/rest/v2/all')
    .then(response => response.json())
    .then(data => {
      
        let select = document.getElementById("country");
        let non = document.getElementById("non");
        non.textContent = "Select country";
        for (i in data)
        {
          let n = data[i].name;
          let option = document.createElement("option");
          option.textContent = n;
          select.appendChild(option);
        }
           
 });}

function onChangeFunction(){
  
 fetchMoney();
 

}

 function myFunction() {

    const tripName = document.getElementById('nameTrip');
    const okButton = document.getElementById('btnSubmit');
    isValidName = tripName.checkValidity();
    const expenses = document.getElementById('expenses');
    isValidExpenses = expenses.checkValidity();
    const currency = document.getElementById('currency');
    isValidCurrency = currency.checkValidity();
    const budget = document.getElementById('budget');
    isValidBudget = budget.checkValidity();
    isValidExchange = false;
 
  
    
   let country = myFunction2();
    if(country == true){
        country = true;}
    else {
      country = false;
    }
       
    if ( isValidName && country && isValidExpenses && isValidCurrency && isValidBudget && isValidExchange) {
      okButton.disabled = false;
    } else {
      okButton.disabled = true;
    }
  }

 

    
  function myFunction2() {
    const country = document.getElementById('country');
    isValidCountry = country.checkValidity();
    
    if ( isValidCountry ) {
      return true;
    } else {
      return false;
    }
  }


  function buttonFunction() {
    const signUpForm = document.getElementById('budget-form');
    signUpForm.submit();
  }
  

 function blurFunction() {
    if (nameTrip.value == "") { 
      document.getElementById("nameHelp").innerHTML = "Write name!";
      return false;
    }
    if(nameTrip.value != "" && nameTrip.value.length < 3){
        document.getElementById("nameHelp").innerHTML = "Name is too short!";
        return false;
    }
   
   
  }

  function focusFunction(){
        // remove the "error" indication, because the user wants to re-enter something
        document.getElementById("nameHelp").innerHTML = "";
  }

  function blurCountry() {
    if (country.selectedIndex < 1) { 
      document.getElementById("countryHelp").innerHTML = "Select country!";
      return false;
    }
   
  }

  function focusCountry(){
        // remove the "error" indication, because the user wants to re-enter something
        document.getElementById("countryHelp").innerHTML = "";
  }


  function blurExpenses() {
    if (expenses.value == "") { 
      document.getElementById("expensesHelp").innerHTML = "Write expenses!";
    }
    if(expenses.value != "" && expenses.valueAsNumber < 0){
        document.getElementById("expensesHelp").innerHTML = "Expenses are too low!";
    }
    fetchMoney();

  }

  function focusExpenses(){
        // remove the "error" indication, because the user wants to re-enter something
        document.getElementById("expensesHelp").innerHTML = "";
        
        
  }

  function blurCurrency() {
    
    if (currency.value == "") { 
      document.getElementById("currencyHelp").innerHTML = "Write currency!";
    }
    else{
    validCurrency();
    }
  }

  function focusCurrency(){
        // remove the "error" indication, because the user wants to re-enter something
        document.getElementById("currencyHelp").innerHTML = "";
  }

  function blurBudget() {
    if (budget.value == "") { 
      document.getElementById("budgetHelp").innerHTML = "Write budget!";
    }
    fetchMoney();
   
  }

  function focusBudget(){
        // remove the "error" indication, because the user wants to re-enter something
        document.getElementById("budgetHelp").innerHTML = "";
  }

 

  function validCurrency(){
    fetch('https://api.exchangeratesapi.io/latest')
    .then(response => response.json())
    .then(data => { 
      let currency = document.getElementById("currency").value;
      let currency2 = currency.toUpperCase();
      let result = data.rates;
      let valid = false;
      let sek = data.rates.SEK;
      
      for (let i in result){
          if(i === currency2 || currency2 === "EUR"){
              valid = true;
          }
      }
     if(valid == false){
      document.getElementById("currencyHelp").innerHTML = "Wrong currency!";
      }
     
});
}

function fetchMoney(){
    fetch('https://api.exchangeratesapi.io/latest')
    .then(response => response.json())
    .then(data => { 

        if(currency.value != ""){
        let result = data.rates;
        let sek = data.rates.SEK;
        let currency = document.getElementById("currency").value;
        let currency2 = currency.toUpperCase();
        let exchange;
        let valid = false;
        for (let j in result){
          if(j === currency2 || currency2 === "EUR"){
              valid = true;
          }
      }
        if(valid == true){
        
        for (let i in result){
            if(i === currency2){
            exchange = result[i];
            }
        }
        if(expenses.value != "" && budget.value != ""){
            if(currency2 == "SEK"){
            if(expenses.value >= budget.value) {
              document.getElementById("budgetHelp").innerHTML = "Expanses are too big!";
              return false;
            }
            else if(budget.value > expenses.value){
              document.getElementById("budgetHelp").innerHTML = "";
              return true;
            }
          }
            else{
            let exchangeToSek = (parseFloat(expenses.value) * parseFloat(sek)) / parseFloat(exchange);
            if(exchangeToSek >= budget.value){
              document.getElementById("budgetHelp").innerHTML = "Expanses are too big!";
              return false;
            }
            if(budget.value > exchangeToSek){
              document.getElementById("budgetHelp").innerHTML = "";
              return true;
            }
          }
        }
        else{
          return false;
        }
      }
      else {
       
        return false;
      }
    }
    else{
      
      return false;
    }
    
        });}

       

      
       