// This is an object array that helps us to translate the direction between numbers and strings
export enum DIRECTIONS {
    N = 'N',
    E = 'E',
    S = 'S',
    W = 'W'
}

const COMPASS = Object.freeze(
	[
		{character: DIRECTIONS.N, value: 0},
		
		// Clockwise movement
		{character: DIRECTIONS.E, value: 1},
		{character: DIRECTIONS.S, value: 2},
		{character: DIRECTIONS.W, value: 3},
		
		// Anti clockwise movement
		{character: DIRECTIONS.W, value: -1},
		{character: DIRECTIONS.S, value: -2},
		{character: DIRECTIONS.E, value: -3}
	]
);

// This interface defines what an robot object contains
interface Robot{
	direction: DIRECTIONS;
	coordinate: {x: number, y: number};
}

// This interface defines what a map object contains
interface Map{
	x: number;
	y: number;
}

// Abbreviation for type declaration in Typescript
type obj<T> 	= (arg: T) => number;
type predicate 	= (arg: number) => DIRECTIONS;

// Convert direction string to number
const convertStrToValue = (arg: Robot) 		=> COMPASS.filter(d => d.character === arg.direction)[0].value;
// Convert direction number to string
const convertValueToStr = (arg: number) 	=> COMPASS.filter(d => d.value === arg)[0].character;
// Higher order functions chain
// We don't treat the arg here as Robot, as higher order function in Typescript can't parse the type properly, so we treat the arg as generic here
const chain 			= <T>(f: predicate, g:obj<T>, d: number) => (arg: T) => f((g(arg) + d) % 4);

// List of actions that can be done by the robot
export const moveForward = (bot: Robot) => (map: Map) =>(
									bot.direction === DIRECTIONS.N && bot.coordinate.y < map.y 	? 	{x: bot.coordinate.x, 	y: bot.coordinate.y + 1}: 	
									bot.direction === DIRECTIONS.E && bot.coordinate.x < map.x 	? 	{x: bot.coordinate.x + 1, y: bot.coordinate.y}:
									bot.direction === DIRECTIONS.S && bot.coordinate.y > 0 		? 	{x: bot.coordinate.x, 	y: bot.coordinate.y - 1}: 	
									bot.direction === DIRECTIONS.W && bot.coordinate.x > 0 		? 	{x: bot.coordinate.x - 1, y: bot.coordinate.y}: {x: bot.coordinate.x, y: bot.coordinate.y}
									);											
export const turnLeft	= chain(convertValueToStr, convertStrToValue, -1);
export const turnRight	= chain(convertValueToStr, convertStrToValue, 1);