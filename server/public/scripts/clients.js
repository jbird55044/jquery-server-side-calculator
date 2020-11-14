console.log (`In client `);
buttonsArray=[];


$(document).ready(letsRoll);


function letsRoll () {

    console.log (`We are Rolling`);
    $('#calcButtonsId').on ('click', 'td input', calcButtonPushed);
    $('#clearButtonId').on ('click', clearButtonPushed);
    $('#submitButtonId').on ('click', function () {postInputs(buttonsArray)} )
    $('#equalsButtonId').on ('click', function () {postInputs(buttonsArray)} ) 
    $('#clearTapeId').on ('click', clearTape)
    
}

// ----------- functions --------------

function calcButtonPushed () {
    let mathFunctionSet = false
    let numbersString = '';
    buttonPushed = $(this).val();
    for (let element of buttonsArray) {
        numbersString += element;
        if (element === '+' || element === '-'|| element === '/'|| element === '*') {
            mathFunctionSet = true
        }
    };
    if ( mathFunctionSet && (buttonPushed === '+' || buttonPushed === '-'|| buttonPushed === '/'|| buttonPushed === '*') ) {
        return;
    } else {
        numbersString += buttonPushed;
        buttonsArray.push(buttonPushed);
        $('#calcInputId').val(numbersString);
    };
}
 
function clearButtonPushed () {
    buttonsArray.splice(0,buttonsArray.length)
    $('#calcInputId').val('');
    console.log (`but array`, buttonsArray);
} // end of clearButtonPushed fn


function updateAnswers (response) {
    $('.tapeOrderedListClass').empty()
    let numbersString = '';
    console.log (`response`, response);
    for ( let i = 0; i < response.length; i += 1 ) {
        for (let j = 0; j < response[i].length; j += 1 ){
            numbersString += response[i][j]
            lastAnswer=response[i][j]
        }
        console.log (`numberString`, numbersString);
        let html = `<li>${numbersString}</li>`;
        numbersString = '';
        $('.tapeOrderedListClass').append (html)
    }
    console.log (`last answer`, lastAnswer);
    $('#calculatedAnswerId').val (lastAnswer);
    $('#calcInputId').val(lastAnswer);
}


function postInputs (array) {
    array.push('=');
    console.log (`Post Array Passed`, array);
    $.ajax({
        method: 'POST',
        url: '/calcexchange',
        data: {
            inputArray: array
        }
    }).then( function (response){
        console.log (`POST Sucessfully`);
        clearButtonPushed();
        getResponse();

    }).catch( function(error){
        console.log (`Error In POST`, error);
        alert ('Error in Submitting')
    })
    console.log (`End of POST`);
}



function getResponse () {
    // making a GET request top our server
    // returns back a Promise
    $.ajax({
        method: 'GET',
        url: '/calcexchange'
    }).then( function (response){
        console.log (`response:`, response);
        updateAnswers(response);
    }).catch( function(error){
        console.log (`Error In GET`, error);
        alert ('Error in Submitting')
    })
    console.log (`End of GET Response`);
}

function clearTape () {
    $.ajax({
        method: 'POST',
        url: '/cleartape',
        data: {
        }
    }).then( function (response){
        console.log (`POST Sucessfully`);
        getResponse();
    }).catch( function(error){
        console.log (`Error In POST`, error);
        alert ('Error in Submitting')
    })
    console.log (`End of clearTape POST`);
}
