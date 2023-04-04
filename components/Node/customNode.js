import React, {memo, useRef, useState} from "react";
import {Handle, Position} from "reactflow";
import styled from "styled-components";
import TripOriginOutlinedIcon from "@mui/icons-material/TripOriginOutlined";

const Node = styled.div`
	padding: 10px 20px;
	border-radius: 5px;
	min-width: 200px;
	background: ${(props) => props.background};
	color: black;
	border: 1px solid
		${(props) =>
			props.selected
				? "var(--color-node-border--selected)"
				: "var(--color-node-border)"};

	.react-flow__handle {
		background: var(--color-node-border);
		width: 15px;
		height: 7px;
		border-radius: 0px;
	}
	.icon_label {
		display: flex;
		justify-content: flex-end;
		align-items: center;
	}

	p {
		background: rgba(255, 255, 255, 0.8);
		border-radius: 4px;
		padding: 5px;
	}
`;

const MainNode = ({selected, data}) => {
	return (
		<>
			<Node background={data.background} selected={selected}>
				<h3>{data.label}</h3>
				<Handle type="source" position={Position.Bottom} />
			</Node>
		</>
	);
};

const ChildNode = ({selected, data}) => {
	return (
		<>
			<Node background={data.background} selected={selected}>
				<Handle type="target" position={Position.Top} />
				<p>{data.label}</p>
				<div className="icon_label">
					<i>{data.status}</i>
					<TripOriginOutlinedIcon fontSize="8px" color="secondary" />
				</div>
				<Handle type="source" position={Position.Bottom} />
			</Node>
		</>
	);
};

const CreatedNode = ({selected, data, id}) => {
	function handleInput(event) {
		if (event.key === "Enter") {
			data.onChange(event?.target?.value, id);
		}
	}

	return (
		<>
			<Node background={data.background} selected={selected}>
				<Handle type="target" position={Position.Top} />
				{selected ? (
					<input onKeyUp={handleInput} />
				) : (
					<p>{data.label}</p>
				)}

				<div className="icon_label">
					<select name="typenode" id="select__type">
						<option value="">Issue</option>
						<option value="">Branch</option>
					</select>
				</div>
				<Handle type="source" position={Position.Bottom} />
			</Node>
		</>
	);
};

export const nodeTypes = {
	parent: memo(MainNode),
	child: memo(ChildNode),
	unbound: memo(CreatedNode),
};