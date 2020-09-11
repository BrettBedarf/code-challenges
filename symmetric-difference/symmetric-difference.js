/*
https://www.freecodecamp.org/learn/coding-interview-prep/algorithms/find-the-symmetric-difference

Algorithms: Find the Symmetric Difference
The mathematical term symmetric difference (△ or ⊕) of two sets is the set of elements which are in either of the two sets but not in both. For example, for sets A = {1, 2, 3} and B = {2, 3, 4}, A △ B = {1, 4}.

Symmetric difference is a binary operation, which means it operates on only two elements. So to evaluate an expression involving symmetric differences among three elements (A △ B △ C), you must complete one operation at a time. Thus, for sets A and B above, and C = {2, 3}, A △ B △ C = (A △ B) △ C = {1, 4} △ {2, 3} = {1, 2, 3, 4}.

Create a function that takes two or more arrays and returns an array of their symmetric difference. The returned array must contain only unique values (no duplicates).
*/
"use strict"
function sym(...args)
{
    //remove duplicates within each array
    args = args.map(arr=> [...new Set(arr)]);
    //only comparing first two arrays at a time
    let firstArr = args[0];
    let secondArr = args[1];
    let remaining=[];//hold extra args
    let symDiff = [];

    if (args.length>2){
        remaining=args.slice(2);
    }
    //compare array values and push uniques to new first array
    while (firstArr.length)
    {
        let firstNum;firstArr[0];
        let isUnique;
        isUnique = !secondArr.some((secondNum) =>
                                       firstNum === secondNum)//some() returns true if it finds matching number
        if (isUnique) symDiff.push(firstNum);

        //filter out of both arrays either way
        firstArr=firstArr.filter(num=> num!==firstNum);
        secondArr=secondArr.filter(num=>num!==firstNum);

    }
    //add remaining from second array
    if(secondArr) symDiff=symDiff.concat(secondArr);
    //check if more arrays
    if (args.length > 2)
    {
        symDiff = [symDiff];
        symDiff=symDiff.concat(remaining);
        return sym(...symDiff);
    }

    return symDiff;
}


