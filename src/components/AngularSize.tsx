import React, { ReactElement, useState, useEffect } from "react";
import { TextField, Paper, InputAdornment } from "@material-ui/core";

const calculateDistance = (size: number, diameter: number): number => (180 / Math.PI) * diameter / size;
const calculateDelay = (distance: number, velocity: number): number => distance / (velocity * 1000 / 3600);


export const AngularSize = (): ReactElement => {
	const [diameter, setDiameter] = useState(2);
	const [angularSize, setAngularSize] = useState(2);
	const [distance, setDistance] = useState(0);
	const [velocity, setVelocity] = useState(100);
	const [delay, setDelay] = useState(0);

	useEffect(() => setDistance(calculateDistance(angularSize, diameter)), [angularSize, diameter]);
	useEffect(() => setDelay(calculateDelay(distance, velocity)), [velocity, distance]);

	return <Paper >
		<p>You want to know your following distance</p>

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

		<p>It is about {distance.toFixed(1)}m away</p>

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
		<p>You are travelling at {(velocity * 1000 / 3600).toFixed(1)}m/s</p>

		<p>You are following about {delay.toFixed(1)}s behind</p>

	</Paper>;
}
