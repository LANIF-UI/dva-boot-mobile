// http://www.wheresrhys.co.uk/fetch-mock/api
import packMock from '@/utils/packMock';
import userInfo from './userInfo';
import crud from './crud';

packMock(
  userInfo,
  crud,
);