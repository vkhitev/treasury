/* eslint-disable */

(function ($) {
  'use strict'

  function normalizeSort (query) {
    var resultQuery = 'sort='
    var sort = query.match(/jtSorting.+&?/)
    if (!sort) {
      return query
    }
    var params = sort[0].replace('jtSorting=', '')
    var splitted = params.split(',')
    splitted.forEach(function (str) {
      var keyval = str.split(' ')
      var key = keyval[0]
      var val = keyval[1]
      if (val.match(/asc/i)) {
        resultQuery += key + ','
      } else {
        resultQuery += '-' + key + ','
      }
    })
    return query.replace(/jtSorting.+&?/, resultQuery.slice(0, -1))
  }

  function normalizeQuery (query) {
    return normalizeSort(query)
      .replace('jtPageSize=', 'count=')
      .replace('jtStartIndex=', 'offset=')
      .replace('jtSearch=', 'q=')
  }

  var ajaxSettings = {
    dataType: 'json',
    beforeSend: function (xhr, options) {
      if (options.url.match(/^(GET|POST|PUT|DELETE)>(.*)$/i)) {
        options.type = RegExp.$1
        options.url = RegExp.$2
      }

      var path = options.url.replace(/\?.+$/, '?')
      var query = options.url.replace(/.+\/\??/, '')
      var changedQuery = normalizeQuery(query)

      options.url = path + changedQuery

      if (options.data) {
        var data = unescapeQueryString(options.data)
        if (data.id) options.url += data.id
        options.data = ''
        for (var key in data) {
          options.data += key + '=' + data[key] + '&'
        }
        options.data = options.data.slice(0, -1)
      }

      var callback = options.success
      options.success = function (input) {

        if (options.type === 'GET') {
          var set = {
            async: true,
            crossDomain: false,
            url: path.replace('?', '') + '?count=1000',
            method: 'GET',
            headers: {
              'content-type': 'application/x-www-form-urlencoded',
              'cache-control': 'no-cache'
            }
          }
          $.ajax(set).done(function (response) {
            var len = response.length
            var output = {
              Result: !input.errors ? 'OK' : 'ERROR'
            }
            output[input instanceof Array ? 'Records' : 'Record'] = input

            if ('Records' in output) {
              output['TotalRecordCount'] = len
            }

            if (callback) {
              callback(output)
            }
          })
        } else {
          var output = {
            Result: !input.errors ? 'OK' : 'ERROR'
          }
          output[input instanceof Array ? 'Records' : 'Record'] = input

          if (callback) {
            callback(output)
          }
        }
      }
    }
  }

  function unescapeQueryString (s) {
    var i = 0
    var obj = {}
    if (s.length) {
      var pairs = s.replace(/[+]/g, '%20').split('&')
      for (i = 0; i < pairs.length; i++) {
        var pair = pairs[i].split('=')
        if (pair[0]) {
          obj[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1])
        }
      }
    }
    return obj
  }

  var opts = {
    institutions: {
      id: '#institutions_table',
      title: 'Список бюджетних установ',
      ajaxSettings: ajaxSettings,
      paging: true,
      pageSize: 20,
      sorting: true,
      defaultSorting: 'name asc',
      selecting: true,
      multiselect: true,
      selectingCheckboxes: true,
      actions: {
        listAction: 'GET>/api/institutions/',
        createAction: 'POST>/api/institutions/',
        updateAction: 'PUT>/api/institutions/',
        deleteAction: 'DELETE>/api/institutions/'
      },
      fields: {
        id: {
          key: true,
          list: false
        },
        code: {
          title: 'Код установи',
          width: '20%'
        },
        name: {
          title: 'Назва',
          width: '60%'
        },
        address: {
          title: 'Адреса',
          width: '20%'
        }
      }
    },
    banks: {
      id: '#banks_table',
      title: 'Список банків',
      ajaxSettings: ajaxSettings,
      paging: true,
      pageSize: 20,
      sorting: true,
      defaultSorting: 'name asc',
      selecting: true,
      multiselect: true,
      selectingCheckboxes: true,
      actions: {
        listAction: 'GET>/api/banks/',
        createAction: 'POST>/api/banks/',
        updateAction: 'PUT>/api/banks/',
        deleteAction: 'DELETE>/api/banks/'
      },
      fields: {
        id: {
          key: true,
          list: false
        },
        name: {
          title: 'Назва'
        }
      }
    },
    kekvs: {
      id: '#kekvs_table',
      title: 'Список КЕКВів',
      ajaxSettings: ajaxSettings,
      paging: true,
      pageSize: 20,
      sorting: true,
      defaultSorting: 'code asc',
      selecting: true,
      multiselect: true,
      selectingCheckboxes: true,
      actions: {
        listAction: 'GET>/api/kekvs/',
        createAction: 'POST>/api/kekvs/',
        updateAction: 'PUT>/api/kekvs/',
        deleteAction: 'DELETE>/api/kekvs/'
      },
      fields: {
        id: {
          key: true,
          list: false
        },
        code: {
          title: 'Код',
          width: '20%'
        },
        description: {
          title: 'Опис',
          width: '80%'
        }
      }
    },
    estimates: {
      id: '#estimates_table',
      title: 'Список кошторисів',
      ajaxSettings: ajaxSettings,
      paging: true,
      pageSize: 20,
      sorting: true,
      defaultSorting: 'institution_id asc',
      selecting: true,
      multiselect: true,
      selectingCheckboxes: true,
      actions: {
        listAction: 'GET>/api/estimates/',
        createAction: 'POST>/api/estimates/',
        updateAction: 'PUT>/api/estimates/',
        deleteAction: 'DELETE>/api/estimates/'
      },
      fields: {
        id: {
          key: true,
          list: false
        },
        kekv_id: {
          title: 'ID КЕКву',
          width: '20%'
        },
        institution_id: {
          title: 'ID закладу',
          width: '20%'
        },
        money_limit: {
          title: 'Ліміт грошей',
          width: '30%'
        },
        year: {
          title: 'Рік',
          width: '30%'
        }
      }
    },
    payment_orders: {
      id: '#payment_orders_table',
      title: 'Список платіжних доручень',
      ajaxSettings: ajaxSettings,
      paging: true,
      pageSize: 20,
      sorting: true,
      defaultSorting: 'order_date desc',
      selecting: true,
      multiselect: true,
      selectingCheckboxes: true,
      actions: {
        listAction: 'GET>/api/payment_orders/',
        createAction: 'POST>/api/payment_orders/',
        updateAction: 'PUT>/api/payment_orders/',
        deleteAction: 'DELETE>/api/payment_orders/'
      },
      fields: {
        id: {
          key: true,
          list: false
        },
        kekv_id: {
          title: 'ID КЕКву',
          width: '15%'
        },
        institution_id: {
          title: 'ID закладу',
          width: '15%'
        },
        bank_id: {
          title: 'ID банку',
          width: '15%'
        },
        money: {
          title: 'Грошей витрачено',
          width: '27.5%'
        },
        order_date: {
          title: 'Дата складання',
          width: '27.5%'
        }
      }
    }
  }

  $(document).ready(function () {
    for (var key in opts) {
      $(opts[key].id).jtable(opts[key])
    }
  })
}(jQuery))

function loadTable (name) {
  $(name).jtable('load')
}
