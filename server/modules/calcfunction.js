const { slice } = require("./tapedata");

module.exports = function (passedData) {
    let answer = 0;
    let cleanString = '';
    let cleanedArray = passedData.slice( 0, passedData.indexOf('='))
    for ( element of cleanedArray ) {
        cleanString += element
    }

    // for complex math, one can use this cool math library: mathjs
        // answer = math.evaluate(cleanString)
        // console.log (`cleaned String`, cleanString, "math", answer);

    if (cleanString.indexOf('*') >= 0 ) {
        let leftNumber = cleanString.slice(0, cleanString.indexOf('*'))
        let rightNumber = cleanString.slice(cleanString.indexOf('*') +1, cleanString.length)
        if ( leftNumber == '' ) leftNumber = '0';
        if ( rightNumber == '' ) rightNumber = '0';
        answer = parseFloat(leftNumber) * parseFloat(rightNumber)
        passedData.splice(0,passedData.length)
        passedData.push (leftNumber)
        passedData.push ('*')
        passedData.push (rightNumber)
        passedData.push ('=')
        passedData.push (answer)
    } else if (cleanString.indexOf('-') >= 0 ) {
        let leftNumber = cleanString.slice(0, cleanString.indexOf('-'))
        let rightNumber = cleanString.slice(cleanString.indexOf('-') +1, cleanString.length)
        if ( leftNumber == '' ) leftNumber = '0';
        if ( rightNumber == '' ) rightNumber = '0';
        answer = parseFloat(leftNumber) - parseFloat(rightNumber)
        passedData.splice(0,passedData.length)
        passedData.push (leftNumber)
        passedData.push ('-')
        passedData.push (rightNumber)
        passedData.push ('=')
        passedData.push (answer)
    } else if (cleanString.indexOf('/') >= 0 ) {
        let leftNumber = cleanString.slice(0, cleanString.indexOf('/'))
        let rightNumber = cleanString.slice(cleanString.indexOf('/') +1, cleanString.length)
        if ( leftNumber == '' ) leftNumber = '0';
        if ( rightNumber == '' || rightNumber == '0' ) {
            rightNumber = '0';
            answer = 'Divide By Zero'
        } else {
            answer = parseFloat(leftNumber) / parseFloat(rightNumber)
        }
        passedData.splice(0,passedData.length)
        passedData.push (leftNumber)
        passedData.push ('/')
        passedData.push (rightNumber)
        passedData.push ('=')
        passedData.push (answer)
    } else if (cleanString.indexOf('+') >= 0 ) {
        let leftNumber = cleanString.slice(0, cleanString.indexOf('+'))
        let rightNumber = cleanString.slice(cleanString.indexOf('+') +1, cleanString.length)
        if ( leftNumber == '' ) leftNumber = '0';
        if ( rightNumber == '' ) rightNumber = '0';
        answer = parseFloat(leftNumber) + parseFloat(rightNumber)
        passedData.splice(0,passedData.length)
        passedData.push (leftNumber)
        passedData.push ('+')
        passedData.push (rightNumber)
        passedData.push ('=')
        passedData.push (answer)
    } else {
        passedData.splice(0,passedData.length);
        answer = 'No Valid Calc Found';
        passedData.push (answer);
    }
} // end of performMath fn


