import fetch from '../util/fetch'
import moment from 'moment'

export const batch = async (query) => {
  let rt = await fetch('/api/orders:batch', query)
  rt.result = rt.result.map((order) => format(order))
  return rt
}

function format (order) {
  order.no = order.id.slice(-8)
  switch (order.status) {
    case 'SUCCESS':
      order.statusWord = '成功'
      break
    case 'PREPAY':
      order.statusWord = '预支付'
      break
    case 'REFUND':
      order.statusWord = '已退款'
      break
  }
  switch (order.serviceStatus) {
    case 'BEFORE':
      order.srvStatusWord = '未启动'
      break
    case 'STARTED':
      order.srvStatusWord = '已启动'
      break
  }
  order.created = moment(order.created).format('YYYY年MM月DD日 HH:MM:SS')
  return order
}
