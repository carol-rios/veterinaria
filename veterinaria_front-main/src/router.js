
import other from './views/other'

import admin1 from './views/admin1'


export const routes = [
    {
      path: "/",
      name: 'other',
      component: other
    },
       {
        path: "/admin1",
        name: 'admin1',
        component: admin1
      }


]
