function getData(data) {

    function criteries(a) {
        let result = [];
        let criteriesArr = [];
        for (let i = 0; i < a.length; i++) {
            const element = a[i].length;
            if (!criteriesArr.includes(element)) {
                criteriesArr.push(element);
            }
        }
        criteriesArr
            .sort((a, b) => a - b)
            .forEach(el => result.push({ [el]: [] }));
        for (let i = 0; i < criteriesArr.length; i++) {
            const element = criteriesArr[i];
            for (const el of a) {
                if (el.length === element) {
                    result[i][element].push(el);
                }
            }
        }
        return result;
    }
    console.log(criteries(data));
}

const arrayData = [[1, 1, 2], [2, 3], [3, 5], [1, 4, 3]];
const stringData = ["elit", "lorem", "sit", "ipsum", "amet"];

getData(arrayData);
getData(stringData);