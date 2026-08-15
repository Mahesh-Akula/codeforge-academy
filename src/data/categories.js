// Categories data for Codeforge Academy
// Added Testing category (Functional / Manual Tester)

module.exports = [
  {
    id: 'testing',
    name: 'Testing',
    description: 'Manual and functional testing for applications',
    roles: [
      { id: 'functional-tester', name: 'Functional Tester' },
      { id: 'manual-tester', name: 'Manual Tester' }
    ],
    order: 99
  }
];
