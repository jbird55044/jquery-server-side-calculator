module.exports = function (passedData) {
    let answer = 0;
    let cleanString = '';
    let cleanedArray = passedData.slice( 0, passedData.indexOf('='))
    console.log (`cleaned Array`, cleanedArray);
    for ( element of cleanedArray ) {
        cleanString += element
    }
    console.log (`Cleaned String`, cleanString);

    // for complex math, one can use this cool math library: mathjs
        // answer = math.evaluate(cleanString)
        // console.log (`cleaned String`, cleanString, "math", answer);

    if (cleanString.indexOf('*') > 0 ) {
        let leftNumber = cleanString.slice(0, cleanString.indexOf('*'))
        let rightNumber = cleanString.slice(cleanString.indexOf('*') +1, cleanString.length)
        console.log (`left right`, leftNumber, rightNumber);
        answer = leftNumber * rightNumber
    }
    if (cleanString.indexOf('-') > 0 ) {
        let leftNumber = cleanString.slice(0, cleanString.indexOf('-'))
        let rightNumber = cleanString.slice(cleanString.indexOf('-') +1, cleanString.length)
        console.log (`left right`, leftNumber, rightNumber);
        answer = leftNumber - rightNumber
    }
    if (cleanString.indexOf('/') > 0 ) {
        let leftNumber = cleanString.slice(0, cleanString.indexOf('/'))
        let rightNumber = cleanString.slice(cleanString.indexOf('/') +1, cleanString.length)
        console.log (`left right`, leftNumber, rightNumber);
        answer = leftNumber / rightNumber
    }
    if (cleanString.indexOf('+') > 0 ) {
        let leftNumber = cleanString.slice(0, cleanString.indexOf('+'))
        let rightNumber = cleanString.slice(cleanString.indexOf('+') +1, cleanString.length)
        console.log (`left right`, leftNumber, rightNumber);
        answer = +leftNumber + +rightNumber
    }
    passedData.push (answer)
    console.log (`last passed data before push`, passedData);
    

} // end of performMath fn


