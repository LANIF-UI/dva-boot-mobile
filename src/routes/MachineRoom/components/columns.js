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
  {
    name: 'machineRoomCID',
    formItem: {
      type: 'hidden'
    }
  },
  {
    name: 'machineRoomId',
    formItem: {
      type: 'hidden'
    }
  },
  {
    title: '机房情况',
    formItem: {
      type: 'line'
    }
  },
  {
    title: '清洁情况',
    name: 'cleanStatus',
    formItem: {
      required: true,
    }
  },
  {
    title: '痕迹情况',
    name: 'traceStatus',
    formItem: {}
  },
  {
    title: '异响情况',
    name: 'soundStatus',
    formItem: {}
  },
  {
    title: '异味情况',
    name: 'smellStatus',
    formItem: {}
  },
  {
    title: '巡检状态',
    name: 'machineRoomCStatus',
    dict: [
      {code: '1070001', codeName: '正常'},
      {code: '1070002', codeName: '异常'},
    ],
    formItem: {
      type: 'select'
    }
  },
];