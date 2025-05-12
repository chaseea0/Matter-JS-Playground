const matterContainer = document.querySelector("#matter-container");
const shapeThickness = 60;

let interval;

// module aliases
let Engine = Matter.Engine,
    Render = Matter.Render,
    Runner = Matter.Runner,
    Bodies = Matter.Bodies,
    Composite = Matter.Composite;

// create an engine
let engine = Engine.create();

// create a renderer
let render = Render.create({
    element: matterContainer,
    engine: engine,
    options: {
        width: matterContainer.clientWidth,
        height: matterContainer.clientHeight,
        background: "rgb(143, 167, 168)",
        wireframes: false,
        showAngleIndicator: true
    }
});

let ground = Bodies.rectangle(
    matterContainer.clientWidth / 2,
    matterContainer.clientHeight + shapeThickness / 2,
    matterContainer.clientWidth * 2,
    shapeThickness,
    {
        isStatic: true
    }
);

let leftWall = Bodies.rectangle(
    0 - shapeThickness / 2,
    matterContainer.clientHeight / 2,
    shapeThickness,
    matterContainer.clientHeight * 5,
    {
        isStatic: true
    }
);

let rightWall = Bodies.rectangle(
    matterContainer.clientWidth + shapeThickness / 2,
    matterContainer.clientHeight / 2,
    shapeThickness,
    matterContainer.clientHeight * 5,
    {
        isStatic: true
    }
);

Composite.add(engine.world, [ground, leftWall, rightWall]);

let mouse = Matter.Mouse.create(render.canvas);
let mouseConstraint = Matter.MouseConstraint.create(engine, {
    mouse: mouse,
    constraint: {
        stiffness: 0.5,
        render: {
            visible: false
        }
    }
});

Composite.add(engine.world, mouseConstraint);

// run the renderer
Render.run(render);

// create runner
let runner = Runner.create();

// run the engine
Runner.run(runner, engine);

window.addEventListener("resize", () => handleResize(matterContainer));

// Different Demo functions below this line for use in index button click event

function rectangleDemo() {
    // create scene objects
    clearInterval(interval);
    let boxA = Bodies.rectangle(400, 200, shapeThickness, shapeThickness);
    let boxB = Bodies.rectangle(450, 50, shapeThickness, shapeThickness);

    // add all of the bodies to the world
    Composite.add(engine.world, [boxA, boxB]);
}

function fallingBoxes() {
    clearInterval(interval);
    // At a set interval, create new boxes at a random location above the frame
    interval = setInterval(spawnBox, 100);
}

function handleResize(matterContainer) {
    // upon resizing the window, resize the canvas
    render.canvas.width = matterContainer.clientWidth;
    render.canvas.height = matterContainer.clientHeight;

    // reposition the ground
    Matter.Body.setPosition(
        ground,
        Matter.Vector.create(
            matterContainer.clientWidth / 2,
            matterContainer.clientHeight + shapeThickness / 2
        )
    );

    // reposition the right wall
    Matter.Body.setPosition(
        rightWall,
        Matter.Vector.create(
            matterContainer.clientWidth + shapeThickness / 2,
            matterContainer.clientHeight / 2
        )
    );
}

function spawnBox() {
    let randomX = Math.random() * ((matterContainer.clientWidth - (2 * shapeThickness)) - (0 + (2 * shapeThickness)))
    let newBox = Bodies.rectangle(randomX, -100, shapeThickness, shapeThickness)
    Composite.add(engine.world, newBox);
}

function resetAll() {
    clearInterval(interval);
    const allBodies = engine.world.bodies.slice();

    Composite.clear(engine.world);
    Composite.add(engine.world, [ground, leftWall, rightWall]);
}