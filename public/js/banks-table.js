/* global $ */

$(document).ready(function () {
  $('#FuckingTable').jtable({
    title: 'Список банків',
    ajaxSettings: {
      dataType: 'json',
      beforeSend: function (xhr, options) {
        if (options.url.match(/^(GET|POST|PUT|DELETE)>(.*)$/i)) {
          options.type = RegExp.$1
          options.url = RegExp.$2
        }

        if (options.data) {
          var data = unescapeQueryString(options.data)
          if (data.id) options.url += data.id
          options.data = JSON.stringify(data)
        }

        var callback = options.success
        options.success = function (input) {
          var output = {
            Result: !input.errors ? 'OK' : 'ERROR'
          }
          output[input instanceof Array ? 'Records' : 'Record'] = input

          console.log(input)
          console.log(output)

          if (callback) {
            callback(output)
          }
        }
      }
    },
    actions: {
      listAction: 'GET>/banks/',
      createAction: 'POST>/banks/',
      updateAction: 'PUT>/banks/',
      deleteAction: 'DELETE>/banks/'
    },
    fields: {
      id: {
        key: true,
        list: false
      },
      name: {
        title: 'Назва банка',
        width: '100%'
      }
    }
  })
  $('#FuckingTable').jtable('load')
})

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
