import React, { useState, useEffect } from "react";
import { TextField, Paper, InputAdornment } from "@material-ui/core";
import { Context, Node } from "react-mathjax2";

const calculateDistance = (size, diameter) => (180 / Math.PI) * diameter / size;
const calculateDelay = (distance, velocity) => distance / (velocity * 1000 / 3600);

export const AngularSize = () => {
	const [diameter, setDiameter] = useState(2);
	const [angularSize, setAngularSize] = useState(2);
	const [distance, setDistance] = useState(0);
	const [velocity, setVelocity] = useState(100);
	const [delay, setDelay] = useState(0);

	useEffect(() => setDistance(calculateDistance(angularSize, diameter)), [angularSize, diameter]);
	useEffect(() => setDelay(calculateDelay(distance, velocity)), [velocity, distance]);

	return <Paper >
		<h1>You want to know your following distance</h1>
		<Context input='ascii'>
			<div>
				<p>We'll start with the classic equation. We're looking for `t` so we'll reorganize the equation</p>
				<Node block>v = d/t | t = d/v</Node>
				<p>Now, First question: how fast are you going?</p>
				<TextField
					id="velocity"
					label="How fast are you going"
					type="number"
					value={velocity}
					onChange={e => setVelocity(+e.target.value)}
					InputProps={{
						endAdornment: <InputAdornment position="end">km/h</InputAdornment>
					}}
					InputLabelProps={{
						shrink: true,
					}}
					variant="outlined"
				/>
				<p>This is in kilometers per hour so we'll need a bit of unit conversion.</p>
				<Node>{`{${velocity} km}/h * {1000 m}/{1 km} * {1 h}/{3600 s} = ${(velocity * 1000 / 3600).toFixed(1)} m/s`}</Node>
				<p>Plugging this into the formula above we get</p>
				<Node>{`t = d/{${(velocity * 1000 / 3600).toFixed(1)} m/s}`}</Node>
				<p>Onto the hard part. We need to find the distance. To do this we'll use angular diameter</p>
				<Node>{"sigma = 2arctan(d/{2D})"}</Node>
				<p>I'm going to be a bit cheeky and skip over the hardest part by using the small angle approximation . We're looking for distance so we'll rearrange.</p>
				<Node>{"sigma = d/D | D = d/sigma"}</Node>
				<p>The average width of a car is roughly 2 meters wide</p>
				<Node>{`D = ${diameter}/sigma`}</Node>
				<p>Plugging this in we now get</p>
				<TextField
					id="diameter"
					label="How big is it actually"
					type="number"
					value={diameter}
					onChange={e => setDiameter(+e.target.value)}
					InputProps={{
						endAdornment: <InputAdornment position="end">m</InputAdornment>
					}}
					InputLabelProps={{
						shrink: true,
					}}
					variant="outlined"
				/>
				<p>The missing bit is how big it looks. We can estimate the angular diameter by comparing what you see to the size of your thumb when your arm is outstretched. Your thumb is about 2º.</p>
				<TextField
					id="angular-size"
					label="How big does it look"
					type="number"
					value={angularSize}
					onChange={e => setAngularSize(+e.target.value)}
					InputProps={{
						endAdornment: <InputAdornment position="end">º</InputAdornment>
					}}
					InputLabelProps={{
						shrink: true,
					}}
					variant="outlined"
				/>
				<p>Into the formula and <Node>{`D = ${diameter}/${angularSize} = ${(diameter/angularSize).toFixed(1)}`}</Node></p>

				<p>This is in Radians so we need to do one last unit conversion</p>
				<Node>{`${(diameter/angularSize).toFixed(1)} rad * 180/pi = ${distance.toFixed(1)}`}</Node>
				<p>It is about {distance.toFixed(1)}m away</p>
				
				<p>Going back now we can plug this in.</p>
				<Node>{`t = {${distance.toFixed(1)} m}/{${(velocity * 1000 / 3600).toFixed(1)} m/s} = ${delay.toFixed(1)} s`}</Node>
				<p>You are following about {delay.toFixed(1)}s behind</p>
			</div>
		</Context>
	</Paper>;
}
