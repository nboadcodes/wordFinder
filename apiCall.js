//callAPI: calls the API with given URL 
//changes HTML if call was valid, otherwise displays timeout request
async function callAPI(url){
    console.log("responseAPI");
    let response = await fetch(url);
    let responsebody = await response.text(); // read response body 
    document.getElementsByName("response")[0].value = responsebody;
}

//createURL: create an API invoking URL 
//inputs is an array of 3 values that contains [letters, required, minlength]
//returns URL
function createURL(inputs){
    let preURL = "https://dfl5ygive1.execute-api.us-west-2.amazonaws.com/test/nytwordpuzzles?";
    preURL = preURL + "letters=" + inputs[0];
    preURL = preURL + "&required=" + inputs[1];
    preURL = preURL + "&minlength=" + inputs[2] + "&inputtype=serialized&inputsource=serialization";
    console.log(preURL);
    return preURL;
    //callAPI(preURL);
}

//getInputs: retrieves inputs from HTML objects and checks if they are valid
//calls createURL if the inputs are valid, otherwise displays error message on HTML
function getInputs(){
    let form = document.forms.dicTrieInput;
    let letters = form.elements.letters.value;
    let required = form.elements.required.value;
    let minlength = form.elements.minlength.value;

    let lettersRegex = /^[a-zA-Z]+$/;
    if(!lettersRegex.test(letters)){
        console.log("bad letters");
    }
    if(!lettersRegex.test(required)){
        console.log("bad required");
    }
    if(!Number.isInteger(parseInt(minlength, 10)) || parseInt(minlength, 10) < 0){
        console.log("bad number");   
    }
    if(!Number.isInteger(parseInt(minlength, 10))){
        console.log("bad number(integer)");   
    }
    if(parseInt(minlength, 10) < 0){
        console.log("bad number(negative)");
    }

    createURL([letters, required, minlength]);
}



//Input handling, implement timeout request, deal with blank required field

/*
function readInputs(){
    let form = document.forms.dicTrieInput;
    let preURL = "https://dfl5ygive1.execute-api.us-west-2.amazonaws.com/test/nytwordpuzzles?letters=abcedf&required=a&minlength=4&inputtype=serialized&inputsource=serialization"
    preURL = preURL + "letters=" + form.elements.letters.value;
    preURL = preURL + "letters=" + form.elements.letters.value;
    "https://dfl5ygive1.execute-api.us-west-2.amazonaws.com/test/nytwordpuzzles?letters=abcedf&required=a&minlength=4&inputtype=serialized&inputsource=serialization"
    console.log(preURL);
    return preURL;
}
*/