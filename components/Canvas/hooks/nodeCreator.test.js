const firstelder = [
	{
		id: 1,
		firstName: "Jane",
		lastName: "Doe",
		age: 21,
	},
];

const newChild = {
	id: 2,
	firstName: "John",
	lastName: "Doe",
	age: 18,
};

function setTestNode() {
	return [...firstelder, newChild];
}

test("The Root Object should concat a new child", () => {
	const result = setTestNode();
	expect(result).toEqual([
		{
			id: 1,
			firstName: "Jane",
			lastName: "Doe",
			age: 21,
		},
		{
			id: 2,
			firstName: "John",
			lastName: "Doe",
			age: 18,
		},
	]);
});
