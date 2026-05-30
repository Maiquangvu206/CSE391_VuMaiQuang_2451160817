// =========================
// Version 1: Classic FizzBuzz
// =========================

console.log("=== Classic FizzBuzz (1-100) ===");

for (var i = 1; i <= 100; i++) {
    if (i % 3 === 0 && i % 5 === 0) {
        console.log(i + " = FizzBuzz");
    } else if (i % 3 === 0) {
        console.log(i + " = Fizz");
    } else if (i % 5 === 0) {
        console.log(i + " = Buzz");
    } else {
        console.log(i);
    }
}


// =========================
// Version 2: Custom FizzBuzz
// =========================

function customFizzBuzz(n, rules) {
    console.log("\n=== Custom FizzBuzz ===");

    for (var i = 1; i <= n; i++) {
        var result = "";

        // duyệt qua rules
        for (var j = 0; j < rules.length; j++) {
            var rule = rules[j];

            if (i % rule.divisor === 0) {
                result += rule.word;
            }
        }

        // nếu không khớp rule nào → in số
        if (result === "") {
            console.log(i);
        } else {
            console.log(i + " = " + result);
        }
    }
}


// =========================
// TEST
// =========================

customFizzBuzz(30, [
    { divisor: 3, word: "Fizz" },
    { divisor: 5, word: "Buzz" },
    { divisor: 7, word: "Jazz" }
]);