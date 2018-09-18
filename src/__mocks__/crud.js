/**
 * 模拟CRUD数据
 */
export default ({fetchMock, delay, mock, toSuccess, toError}) => {
  return {
    // 表格带分页
    '/api/crud/getList': (options) => {
      const body = JSON.parse(options.body);
      const currentPage = body.currentPage;
      const idbase = (currentPage - 1) * body.showCount + 1;
      const paramMap = body.paramMap;
      const deptName = paramMap.deptName;

      return toSuccess(mock({
        'currentPage': currentPage,
        'showCount': body.showCount,
        'totalResult': 100,
        'totalPage': 100 / body.showCount,
        [`dataList|${body.showCount}`]: [{
          'id|+1': idbase,
          'deptName': deptName ? deptName : '@cword(3, 5)',      
          'distributionNetwork|1': ['0', '1'],
          'address': '@county()',
          'type': '@cword(3)',  
          'planBeginTime': '@date',
          'planEndTime': '@date',
          'workEmployee|1-3': [{
            'key|+1': 1,
            'title': '@cname',
          }],
          'content': '@csentence',
        }],
      }), 1400)
    },
    '/api/crud/bathDelete': (options) => toSuccess({options}, 400),
    '/api/crud/getWorkEmployee': (options) => mock({
      'status': true,
      'data|10': [{
        'key|+1': 1,
        'title': '@cname',
      }]
    }),
    '/api/crud/save': (options) => toSuccess({options}, 800),
  }
}