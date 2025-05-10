const matterContainer = document.querySelector("#matter-container");
const shapeThickness = 60;

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

// create scene objects
let boxA = Bodies.rectangle(400, 200, 80, 80);
let boxB = Bodies.rectangle(450, 50, 80, 80);
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

// add all of the bodies to the world
Composite.add(engine.world, [boxA, boxB, ground, leftWall, rightWall]);

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

window.addEventListener("resize", () => handleResize(matterContainer));