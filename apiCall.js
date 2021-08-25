//callAPI: calls the API with given URL 
//changes HTML if call was valid, otherwise displays timeout request
async function callAPI(url){
    console.log("responseAPI")
    let response = await fetch(url)
    let responsebody = await response.text() // read response body 
    $('[name=response]').val(responsebody)
}

//createURL: create an API invoking URL 
//inputs is an array of 3 values that contains [letters, required, minlength]
//returns URL
async function createURL(letters, required, minlength){
    let preURL = `https://dfl5ygive1.execute-api.us-west-2.amazonaws.com/test/nytwordpuzzles?letters=${letters}&required=${required}&minlength=${minlength}&inputtype=serialized&inputsource=serialization`
    console.log(preURL)
    await callAPI(preURL)
    return preURL
}

function errorInput(isError, errorText, itemName){
    let errorEle = $(`[name=${itemName}Error]`)
    let errorDiv = $(`[name=${itemName}Field]`)
    if(isError){
        console.log("bad " + itemName)
        errorEle.text(errorText)
        errorEle.css('display', 'block')
        errorDiv.css('marginBottom', '-1px')
    }
    else{
        errorEle.css('display', 'none')
        errorDiv.css('marginBottom', '10px')
    }
    return isError
}

//getInputs: retrieves inputs from HTML objects and checks if they are valid
//calls createURL if the inputs are valid, otherwise displays error message on HTML
async function getInputs(){
    let [letters, required, minlength] = $('form').serializeArray().map(e => e.value)
    let nonAlpha = /^[^a-zA-Z]+$/

    if(fullAnd(errorInput(nonAlpha.test(letters), "*Please only use letters", "letters"),
               errorInput(nonAlpha.test(required), "*Please only use letters", "required"),
               !errorInput(!Number.isInteger(parseInt(minlength, 10)), "*Please input a valid integer 0-9", "minlength")))
        await createURL(letters, required, minlength)
}

function fullAnd() {
    return Array.from(arguments).every(e => e)
}

//Input handling, implement timeout request, deal with blank required field

// function readInputs(){
//     let form = document.forms.dicTrieInput
//     let preURL = "https://dfl5ygive1.execute-api.us-west-2.amazonaws.com/test/nytwordpuzzles?letters=abcedf&required=a&minlength=4&inputtype=serialized&inputsource=serialization"
//     preURL = preURL + "letters=" + form.elements.letters.value
//     preURL = preURL + "letters=" + form.elements.letters.value
//     "https://dfl5ygive1.execute-api.us-west-2.amazonaws.com/test/nytwordpuzzles?letters=abcedf&required=a&minlength=4&inputtype=serialized&inputsource=serialization"
//     console.log(preURL)
//     return preURL
// }