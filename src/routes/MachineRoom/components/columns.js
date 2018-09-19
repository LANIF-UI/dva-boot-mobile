export default [
  {
    title: '单位名称',
    name: 'deptName',
    searchItem: {
      type: 'primary'
    },
  },
  {
    title: '设备状态',
    name: 'status',
    dict: [
      {code: '1', codeName: '正常'},
      {code: '0', codeName: '异常'},
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