function closure(){
    let n = 0

    return function(){
        n++
        console.log(n)
    }
}

response = closure();
console.log(response)