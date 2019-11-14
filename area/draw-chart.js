import {getRandomDataTimed} from './random-data.js';

export default function (canvas) {

    const context = canvas.getContext("2d");
    const margin = {top: 15, right: 10, bottom: 25, left: 30},
        width = canvas.width - margin.left - margin.right,
        height = canvas.height - margin.top - margin.bottom;

    const x = d3.scaleTime()
        .range([0, width]);

    const y = d3.scaleLinear()
        .range([height, 0]);

    const area = d3.area()
        .curve(d3.curveBasisOpen)
        .x(function(d) { return x(d.date); })
        .y0(height)
        .y1(function(d) { return y(d.close); })
        .context(context);

    context.translate(margin.left, margin.top);

    let c = 100;
    let stop = false;
    getRandomDataTimed(500, stop, data => {
        if (--c <= 0) {
            stop = true;
            return;
        }

        context.clearRect(-100, -100, canvas.width + 100, canvas.height + 100);
        context.beginPath();

        context.fillStyle = "white";
        context.fillRect(-100, -100, canvas.width + 100, canvas.height + 100);

        x.domain(d3.extent(data, function(d) { return d.date; }));
        y.domain(d3.extent(data, function(d) { return d.close; }));

        xAxis();
        yAxis();

        context.beginPath();
        area(data);
        context.fillStyle = 'red';
        // context.strokeStyle = 'green';
        // context.stroke();
        context.fill();
    });


    function xAxis() {
        let tickCount = 10,
            tickSize = 6,
            ticks = x.ticks(tickCount),
            tickFormat = x.tickFormat();

        context.beginPath();
        ticks.forEach(function(d) {
            context.moveTo(x(d), height);
            context.lineTo(x(d), height + tickSize);
        });
        context.strokeStyle = "black";
        context.stroke();
        // context.closePath();

        context.textAlign = "center";
        context.textBaseline = "top";
        context.fillStyle = 'black';
        context.strokeStyle = "black";
        ticks.forEach(function(d) {
            context.fillText(tickFormat(d), x(d), height + tickSize);
        });

    }

    function yAxis() {
        let tickCount = 10,
            tickSize = 6,
            tickPadding = 3,
            ticks = y.ticks(tickCount),
            tickFormat = y.tickFormat(tickCount);

        context.beginPath();
        ticks.forEach(function(d) {
            context.moveTo(0, y(d));
            context.lineTo(-6, y(d));
        });
        context.strokeStyle = "black";
        context.stroke();

        context.beginPath();
        context.moveTo(-tickSize, 0);
        context.lineTo(0.5, 0);
        context.lineTo(0.5, height);
        context.lineTo(-tickSize, height);
        context.strokeStyle = "black";
        context.stroke();

        context.textAlign = "right";
        context.textBaseline = "middle";
        ticks.forEach(function(d) {
            context.fillText(tickFormat(d), -tickSize - tickPadding, y(d));
        });

    }
}

