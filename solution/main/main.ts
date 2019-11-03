import { moveForward, turnLeft, turnRight, DIRECTIONS } from '../modules/movement-control';
import * as readline from 'readline';
import * as process from 'process';

// initialize map and robot
let map = {x: 0, y: 0};
let robot = {coordinate:{x:0, y:0}, direction: DIRECTIONS.N};
let robots: any[] = [];

let rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout
});

// Get the input for map
const readMapSize = () => {
	return new Promise((resolve, reject) => {
		rl.question('Map Size: ', (answer) => {
			let coordinate = answer.split(" ");
			map.x = Number(coordinate[0]) || 5;
			map.y = Number(coordinate[1]) || 5;
			resolve();
		})
	});
}

const readDeployRobot = () =>{
	return new Promise((resolve, reject) => {
		rl.question('Deploying new robot? [y/n]: ', (answer) => {
			let decision = answer.split(" ");
			if(decision[0].indexOf('y') > -1){
				resolve();
			} else{
				reject();
			}
		})
	});
}

// Get the input for the position of first robot
const readBotPosition = () => {
	robot = {coordinate:{x:0, y:0}, direction: DIRECTIONS.N};
	return new Promise((resolve, reject) => {
		rl.question('New robot position: ', (answer) => {
			let info = answer.split(" ");
			// default value is set for safe fail mechanism
			robot.coordinate.x = Number(info[0]) || 0;
			robot.coordinate.y = Number(info[1]) || 0;
			robot.direction = info[2] || DIRECTIONS.N;
			resolve();
		})
	});
}

// Get the input for the moving instruction of first robot
const readBotAction = () => {
	return new Promise((resolve, reject) => {
		rl.question('New robot moving instruction: ', (answer) => {
			let movements = answer.split("");
			for (let movement of movements) {
				robot = moving(robot, movement, map);
			}
			robots = robots.concat(robot);
			resolve();
		})
	});
}

// Write final outputs
const writeBotsDestination = () => {
	for(let i in robots){
		console.log("Robot %d final destination: %d %d %s", i, robots[i].coordinate.x, robots[i].coordinate.y, robots[i].direction);
	}
}

// Determine which function to call according to the character
const moving = (robot: any, movement: string, map: any) => {
	if(movement === 'L'){
		robot.direction = turnLeft(robot);
	} else if(movement === 'R'){
		robot.direction = turnRight(robot);
	} else{
		// Pass the map info into the function as well using currying
		robot.coordinate = moveForward(robot)(map);
	}
	return robot;
}

const deployingRobots = async () => {
	await readDeployRobot()
	.then(async (res) => {
		await readBotPosition();
		await readBotAction();
		await deployingRobots();
	}).catch((err) => {
		return;
	});
}

const main = async () => {
	await readMapSize();
	await deployingRobots();
	await writeBotsDestination();
	rl.close();
}

main();