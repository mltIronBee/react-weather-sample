import React, { cloneElement } from "react";

interface IContainerMockProps {
	children: React.ReactElement;
}

const ResponsiveContainerMock: React.FC<IContainerMockProps> = (props) => {
	const chart = cloneElement(props.children, {
		width: 300,
		height: 300,
	});

	return <div style={{ width: 300, height: 300 }}>{chart}</div>;
};

module.exports = {
	...jest.requireActual("recharts"),
	ResponsiveContainer: ResponsiveContainerMock,
};
