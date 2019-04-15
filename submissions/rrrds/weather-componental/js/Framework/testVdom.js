const testVdom = [
  'String element',
  {
    tag: Temperature,
    props: { temperature: 123, unit: 'C', handleClick: this.handleOnClick },
    children: [
      {
        tag: Speed,
        props: { speed: 3 }
      }
    ],
    classList: ['temperature-component', 'second']
  },
  document.createElement('hr'),
  {
    tag: 'span',
    children: ['tag -span']
  },
  {
    tag: 'div',
    children: [
      'tag - div',
      {
        tag: Temperature,
        props: {
          temperature: 234234234,
          unit: 'rgfgfg',
          handleClick: this.handleOnClick
        }
      },
      {
        tag: Speed,
        props: { speed: 345345345 }
      }
    ]
  }
];

export default testVdom;
