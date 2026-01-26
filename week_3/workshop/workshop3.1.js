let sumEven = 0;
let productOdd = 1;

for (let i = 1; i <= 50; i++) {
    if (i % 2 == 0) {
        sumEven += i;
        i++;
    }
    if (i % 2 != 0 && i <= 10) {
        productOdd *= i;
    }
};

console.log(`ผลรวมเลขคู่ 2-50 = ${sumEven}`);
console.log(`ผลคูรเลขคี่ 1-10 = ${productOdd}`);