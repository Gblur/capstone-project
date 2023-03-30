const firstelder = [
  {
    id: 1,
    firstName: "Jane",
    lastName: "Doe",
    age: 21,
  },
];

const elderChilds = [
  {
    id: 2,
    firstName: "John",
    lastName: "Doe",
    age: 18,
  },
  {
    id: 3,
    firstName: "Max",
    lastName: "Mustermann",
    age: 32,
  },
  {
    id: 4,
    firstName: "Erika",
    lastName: "Musterfrau",
    age: 38,
  },
  {
    id: 5,
    firstName: "Luke",
    lastName: "Skywalker",
    age: 23,
  },
]

function setTestNode(){
  return [
    ...firstelder,
    ...elderChilds.map(item => {
      return ({
        id: item.id,
        firstName: item.firstName,
        lastName: item.lastName,
        age: item.age
      })
    })
  ]
}

test("The parent elder shall be persistent, while the elder childs shall be added as siblings", () => {
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
    {
      id: 3,
      firstName: "Max",
      lastName: "Mustermann",
      age: 32,
    },
    {
      id: 4,
      firstName: "Erika",
      lastName: "Musterfrau",
      age: 38,
    },
    {
      id: 5,
      firstName: "Luke",
      lastName: "Skywalker",
      age: 23,
    }
  ]);
});