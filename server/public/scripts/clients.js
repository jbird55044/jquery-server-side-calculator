console.log (`In client `);
buttonsArray=[];


$(document).ready(letsRoll);


function letsRoll () {
    console.log (`We are Rolling Vatti`);
    $('#calcButtonsId').on ('click', 'td input', calcButtonPushed);
    $('#clearButtonId').on ('click', clearButtonPushed);
    $('.tapeOrderedListClass').on ('click', 'li', reRunTapeLine);
    $('#submitButtonId').on ('click', function () {postInputs(buttonsArray)} );
    $('#equalsButtonId').on ('click', function () {postInputs(buttonsArray)} ); 
    $('#clearTapeId').on ('click', clearTape);
    getResponse();   //initial grab from server
    
}

// ----------- functions --------------

// repopulate keyboard array, and calc display upon selected tape line
function reRunTapeLine () {
    $('.highlight').removeClass('highlight')
    let selectedTapeLine = $(this).index();
    let selectedItem = $(this).text()
    selectedItem = selectedItem.slice(0, selectedItem.indexOf('='));
    buttonsArray.splice (0,buttonsArray.length)
    for ( element of selectedItem ) {
        buttonsArray.push(element)
    }
    $('#calcInputId').val(selectedItem);
    $(this).addClass('highlight')
} // end of reRunTapeLine fn


// keyboard managment
// allows for only one math function
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
} // end of calcButtonPushed fn

// user initiated keyboard entry wiping prior to sending to server
function clearButtonPushed () {
    buttonsArray.splice(0,buttonsArray.length)
    $('#calcInputId').val('');
    console.log (`but array`, buttonsArray);
} // end of clearButtonPushed fn


// DOM management for calc tape, creates strings from passed array
function updateAnswers (response) {
    $('.tapeOrderedListClass').empty()
    let numbersString = '';
    let lastAnswer = 0;
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
    if ( response.length === 0 ) {
        $('.tapeOrderedListClass').append (`<li>No Entries</li>`)
    }
    $('#calculatedAnswerId').empty();
    $('#calculatedAnswerId').append(lastAnswer);
    $('#calcInputId').val(lastAnswer);
} // end of updateAnswers fn


// empty local keyboard array, push to server requested calcs
// no entry is assumed to be a '0' by server saving user keying time
function postInputs (array) {
    array.push('=');
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
}  // end of postInputs


// get fresh DOM info for calc tape
function getResponse () {
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
}  // end of getResponse fn


// send server indicator to erase tape, respond w/ fresh DOM info
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
}  // end of clearTape fn
