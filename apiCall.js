//callAPI: calls the API with given URL 
//changes HTML if call was valid, otherwise displays timeout request
async function callAPI(url){
    console.log("responseAPI");
    let response = await fetch(url);
    let responsebody = await response.text(); // read response body 
    $('[id=response]').val(responsebody);
}

//createURL: create an API invoking URL 
//inputs is an array of 3 values that contains [letters, required, minlength]
//returns URL
async function createURL(letters, required, minlength){
    let preURL = `https://dfl5ygive1.execute-api.us-west-2.amazonaws.com/test/nytwordpuzzles?
                    letters=${letters}&required=${required}&minlength=${minlength}&
                    inputtype=serialized&inputsource=serialization`;
    console.log(preURL);
    await callAPI(preURL);
    return preURL; //return is not used
}

function errorInput(isError, errorText, itemName){
    let errorEle = $(`[id=${itemName}Error]`);
    let errorDiv = $(`[id=${itemName}Field]`);
    if(isError){
        console.log("bad " + itemName);
        errorEle.text(errorText);
        errorEle.css("display", "block");
        errorEle.css("marginBottom", "-1px");
    }
    else{
        errorEle.css("display", "none");
        errorEle.css("marginBottom", "10px");
    }
    return isError;
}

//getInputs: retrieves inputs from HTML objects and checks if they are valid
//calls createURL if the inputs are valid, otherwise displays error message on HTML
async function getInputs(){
    let form = document.forms.dicTrieInput;
    let letters = form.elements.letters.value;
    let required = form.elements.required.value;
    let minlength = form.elements.minlength.value;

    let goodInputs = true;
    let alphaRegex = /^[a-zA-Z]+$/;

    if(errorInput(!alphaRegex.test(letters), "*Please only use letters", "letters")) goodInputs = false;
    if(errorInput(!alphaRegex.test(required), "*Please only use letters", "required")) goodInputs = false;
    if(errorInput(!Number.isInteger(parseInt(minlength, 10)) || 
        parseInt(minlength, 10) < 0 , "*Please input a valid integer 0-9", "minlength")) goodInputs = false;

    if(goodInputs) await createURL([letters, required, minlength]);
}

//Input handling, implement timeout request, deal with blank required field