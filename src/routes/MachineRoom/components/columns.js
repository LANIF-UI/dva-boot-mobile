export default [
  {
    title: '用户姓名',
    name: 'userName',
    searchItem: {
      type: 'primary'
    },
  },
  {
    title: '单位名称',
    name: 'deptName',
    dict: [
      {code: '0', codeName: '城市1'},
      {code: '1', codeName: '乡村2'},
    ],
    searchItem: {
      type: 'select'
    },
  },
  {
    title: '配电网络',
    name: 'distributionNetwork',
    dict: [
      {code: '0', codeName: '城市'},
      {code: '1', codeName: '乡村'},
    ],
    searchItem: {
      type: 'select'
    },
  },
];