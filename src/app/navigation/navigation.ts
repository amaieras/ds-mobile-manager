export const navigation = [
  {
    'id': 'applications',
    'title': 'Applications',
    'translate': 'NAV.APPLICATIONS',
    'type': 'group',
    'icon': 'apps',
    'children': [
      {
        'id': 'add-clients',
        'title': 'Adauga clienti',
        'translate': 'NAV.DASHBOARDS',
        'type': 'collapse',
        'icon': 'dashboard',
        'children': [
          {
            'id': 'pf',
            'title': 'PF',
            'type': 'item',
            'url': '/apps/clients/client-pf'
          },
          {
            'id': 'gsm',
            'title': 'GSM',
            'type': 'item',
            'url': '/apps/clients/client-gsm'
          }
        ]
      }
    ]
  }

];
