import { LotoModuleRouteType } from '@lotomic/core';

type RouteModuleName = 'Member' | string;

export const UCenterModuleRoutes: Record<RouteModuleName, LotoModuleRouteType> =
  {
    Member: {
      name: 'Member API',
      modulePath: 'member',
      desc: '客户、会员 API',
    },
  };
