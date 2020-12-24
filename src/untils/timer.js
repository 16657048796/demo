import moment from 'moment'


export const formatDate= (value)=> {
    return moment(value*1000).format('YYYY-MM-DD, h:mm:ss');
    // return moment(Number(value)*1000).format('LLLL');
  }

