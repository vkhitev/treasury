/* eslint-disable */

(function ($) {
  'use strict'

  var ajaxSettings = {
    dataType: 'json',
    beforeSend: function (xhr, options) {
      if (options.url.match(/^(GET|POST|PUT|DELETE)>(.*)$/i)) {
        options.type = RegExp.$1
        options.url = RegExp.$2
      }

      if (options.data) {
        if (options.url.startsWith('/api/report/?')) {
          options.url += '&' + options.data.replace('end', '&end=')
        } else if (options.url.match(/\/api\/report\/\d+\?/)) {
          options.url += '&' + options.data.replace('end', '&end=')
        }
        options.data = ''
      }



      var callback = options.success
      options.success = function (input) {
        var output = {
          Result: !input.error ? 'OK' : 'ERROR'
        }
        output[input.data instanceof Array ? 'Records' : 'Record'] = input.data
        output['TotalRecordCount'] = input.count

        if (callback) {
          callback(output)
        }
      }
    }
  }

  $(document).ready(function () {
    $('#report').jtable({
      title: 'Звіт',
      ajaxSettings: ajaxSettings,
      paging: true,
      pageSize: 20,
      sorting: false,
      defaultSorting: 'name asc',
      actions: {
        listAction: 'GET>/api/report/'
      },
      fields: {
        id: {
          key: true,
          list: false
        },
        details: {
          width: '5%',
          title: '',
          sorting: false,
          edit: false,
          create: false,
          display: function (instData) {
            var $img = $('<img src="img/details.png" title="Деталі по роках" class="child-opener-image"/>')
            $img.click(function() {
              $('#report').jtable('openChildTable', $img.closest('tr'), {
                title: 'Деталі по роках',
                ajaxSettings: ajaxSettings,
                sorting: true,
                defaultSorting: 'year asc',
                actions: {
                  listAction: 'GET>/api/report/' + instData.record.id
                },
                fields: {
                  details: {
                    title: '',
                    width: '5%',
                    sorting: true,
                    edit: false,
                    create: false,
                    display: function (yearData) {
                      var $img = $('<img src="img/details.png" title="Деталі за рік *" class="child-opener-image"/>'
                                    .replace('*', yearData.record.year))
                      $img.click(function() {
                        $('#report').jtable('openChildTable', $img.closest('tr'), {
                          title: 'Деталі за ' + yearData.record.year + ' рік',
                          ajaxSettings: ajaxSettings,
                          sorting: true,
                          defaultSorting: 'order_date asc',
                          actions: {
                            listAction: 'GET>/api/report/' + instData.record.id + '/' + $('#start').val() + '&' + $('#end').val()
                          },
                          fields: {
                            order_date: {
                              title: 'Дата',
                              width: '30%',
                              display: function (data) {
                                return data.record.order_date.replace('T', ' ').replace(':00.000Z', '')
                              }
                            },
                            code: {
                              title: 'Кекв',
                              width: '20%'
                            },
                            money: {
                              title: 'Грошей видано',
                              width: '20%'
                            },
                            name: {
                              title: 'Банк',
                              width: '30%'
                            }
                          }
                        }, function (data) {
                          data.childTable.jtable('load')
                        })
                      })
                      return $img
                    }
                  },
                  year: {
                    title: 'Рік',
                    width: '31%'
                  },
                  count_orders: {
                    title: 'Доручень складено',
                    width: '31%'
                  },
                  total_money: {
                    title: 'Грошей видано',
                    width: '31%'
                  }
                }
              }, function (data) {
                data.childTable.jtable('load', {
                    start: $('#start').val() + 'end' + $('#end').val()
                })
              })
            })
            return $img
          }
        },
        name: {
          title: 'Назва установи',
          width: '45%'
        },
        total_payment_orders: {
          title: 'Доручень складено',
          width: '25%'
        },
        total_money: {
          title: 'Грошей видано',
          width: '25%'
        }
      }
    })

    $('#start').val('1991-01-01T00:00')
    $('#end').val('2017-01-01T00:00')

    $('#LoadRecordsButton').click(function (e) {
        e.preventDefault();
        $('#report').jtable('load', {
            start: $('#start').val() + 'end' + $('#end').val()
        });
    });
  })

}(jQuery))
