const data = [];
let _date = new Date();

const getRandomFloat = () => +(Math.random() * 100).toFixed(2);
const getNextDate = (date) => new Date(date.getTime() + 1000);
const setNextDate = () => _date = getNextDate(_date);

class Node {
    constructor(date, close) {
        this.date = date;
        this.close = close;
    }
}

const getRandomNode = () => {
    setNextDate();
    return new Node(
        _date,
        getRandomFloat()
    );
};

const generate = () => {
    for(let i = 0; i < 100; i++) {
        data.unshift(getRandomNode())
    }
    return data;
};

const append = () => {
    data.pop();
    data.unshift(getRandomNode());
};

export const getRandomDataTimed = (interval, stop, callback) => {
    generate();

    (function run() {
        append();
        callback(data.slice());
        if (!stop)
            setTimeout(run, interval);
    }());
};
