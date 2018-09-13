const serviceModule = {
  getSell: {
    url: '/seller',
    method: 'get'
  },
  getGoods: {
    url: '/goods',
    method: 'get'
  },
  getRatings: {
    url: '/ratings',
    method: 'get'
  }
}

const apiModule = {...serviceModule}

export default apiModule
