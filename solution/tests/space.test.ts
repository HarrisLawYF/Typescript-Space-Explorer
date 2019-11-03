import { expect } from 'chai';
import { moveForward, turnLeft, turnRight, DIRECTIONS} from '../modules/movement-control';

describe('direction', function() {
	it('turn_west', function() {
		let map = {x: 5, y: 5};
		let robot = {coordinate:{x:0, y:0}, direction: DIRECTIONS.N};
		let result = turnLeft(robot);
		// To ensure the function contains no mutable object or change state
		expect(robot.direction).equal(DIRECTIONS.N);
		// To ensure the actual output is what we expected
		expect(result).equal(DIRECTIONS.W);
	});

	it('turn_east', function() {
		let map = {x: 5, y: 5};
		let robot = {coordinate:{x:0, y:0}, direction: DIRECTIONS.N};
		let result = turnRight(robot);
		// To ensure the function contains no mutable object or change state
		expect(robot.direction).equal(DIRECTIONS.N);
		// To ensure the actual output is what we expected
		expect(result).equal(DIRECTIONS.E);
	});
	
	it('turn_south', function() {
		let map = {x: 5, y: 5};
		let robot = {coordinate:{x:0, y:0}, direction: DIRECTIONS.N};
		robot.direction = turnRight(robot);
		let result = turnRight(robot);
		// To ensure the function contains no mutable object or change state
		expect(robot.direction).equal(DIRECTIONS.E);
		// To ensure the actual output is what we expected
		expect(result).equal(DIRECTIONS.S);
	});
	
	it('move_forward', function() {
		let map = {x: 5, y: 5};
		let robot = {coordinate:{x:0, y:0}, direction: DIRECTIONS.N};
		let robot_sub = {coordinate:{x:0, y:0}, direction: DIRECTIONS.N};
		robot_sub.direction = turnRight(robot);
		robot_sub.coordinate = moveForward(robot_sub)(map);
		// To ensure the function contains no mutable object or change state
		expect(robot.coordinate.x).equal(0);
		// To ensure the actual output is what we expected
		expect(robot_sub.coordinate.x).equal(1);
	});
	
	it('move_forward_invalid', function() {
		let map = {x: 5, y: 5};
		let robot = {coordinate:{x:0, y:0}, direction: DIRECTIONS.N};
		robot.direction = turnRight(robot);
		robot.direction = turnRight(robot);
		robot.coordinate = moveForward(robot)(map);
		// To ensure the actual output is what we expected
		expect(robot.coordinate.y).equal(0);
	});
});