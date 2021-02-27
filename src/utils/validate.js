const VALIDATE = {
  // 字符长度限制，支持min和max，1汉字或汉字字符=3字符
  charLength: function (rule, value, callback) {
    let chineseLength = 0
    const regStr = /[\u3002\uff1b\uff0c\uff1a\u201c\u201d\uff08\uff09\u3001\uff1f\u300a\u300b\u4e00-\u9fa5]/g
    if (value && value.match(regStr)) chineseLength = value.match(regStr).length
    const len = chineseLength * 2 + (value ? value.length : 0)
    if ((rule.min && len < rule.min) || (rule.max && len > rule.max)) {
      if (rule.message) {
        callback(new Error(rule.message))
      } else {
        callback(new Error('长度不合法'))
      }
    } else {
      callback()
    }
  },
  // 中文字母数字下划线
  normalStr_: function (rule, value, callback) {
    if (/(^$)|(^[\u4e00-\u9fa5_a-zA-Z0-9]+$)/.test(value)) {
      callback()
    } else {
      if (rule.message) {
        callback(new Error(rule.message))
      } else {
        callback(new Error('只能是中文、字母、数字、下划线'))
      }
    }
  },
  // 只能是中文或字母
  chineseOrChar: function (rule, value, callback) {
    if (/^[\u4e00-\u9fa5a-zA-Z]+$/.test(value)) {
      callback()
    } else {
      if (rule.message) {
        callback(new Error(rule.message))
      } else {
        callback(new Error('只能是中文或字母'))
      }
    }
  },
  // 中文字母数字下划线
  normalStr_: function (rule, value, callback) {
    if (/(^$)|(^[\u4e00-\u9fa5_a-zA-Z0-9]+$)/.test(value)) {
      callback()
    } else {
      if (rule.message) {
        callback(new Error(rule.message))
      } else {
        callback(new Error('只能是中文、字母、数字、下划线'))
      }
    }
  },
  // 只能是中文或字母
  chineseOrChar: function (rule, value, callback) {
    if (/^[\u4e00-\u9fa5a-zA-Z]+$/.test(value)) {
      callback()
    } else {
      if (rule.message) {
        callback(new Error(rule.message))
      } else {
        callback(new Error('只能是中文或字母'))
      }
    }
  },
  // 检查邮箱
  checkEmail: function (rule, value, callback) {
    if (/(^$)/.test(value)) callback()
    if (/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(value)) {
      callback()
    } else {
      callback(new Error('邮箱有误'))
    }
  },
  // 检查手机号
  checkPhone: function (rule, value, callback) {
    if (/(^$)/.test(value)) callback()
    if (/^1[34578]\d{9}$/.test(value)) {
      callback()
    } else {
      callback(new Error('手机号码有误'))
    }
  },
  // 检查手机号或固定电话号码
  checkPhoneOrTel: function (rule, value, callback) {
    if (/(^$)/.test(value)) callback()
    if (/^1[345789]\d{9}$/.test(value) || /^((0\d{2,3})[\s-])(\d{7,8})([-\s](\d{3,}))?$/.test(value)) {
      callback()
    } else {
      if (rule.message) {
        callback(new Error(rule.message))
      } else {
        callback(new Error('号码有误，请重填'))
      }
    }
  },
  // 文件类型验证,返回文件类型
  validateFileType (filename, fileTypes) {
    let fileType
    if (/^.*\.[zZ][iI][pP]$/.test(filename)) {
      fileType = 'zip'
    } else if (/^.*\.[pP][nN][gG]$/.test(filename)) {
      fileType = 'png'
    } else if (/^.*\.[jJ][pP][gG]$/.test(filename)) {
      fileType = 'jpg'
    } else if (/^.*\.[jJ][pP][eE][gG]$/.test(filename)) {
      fileType = 'jpeg'
    } else if (/^.*\.[tT][xX][tT]$/.test(filename)) {
      fileType = 'txt'
    } else {
      fileType = ''
    }
    return fileTypes && fileTypes.indexOf(fileType) > -1 ?
      (fileType === 'png' || fileType === 'jpg' || fileType === 'jpeg' ? 'img' : fileType) : ''
  },
  // 上传文件文件名验证,中文、字母、数字、下划线、空格符或“_”、“-”、“.”,首字母为中文字母数字或下划线
  validateFileName (filename) {
    if (/^[\u4e00-\u9fa5a-zA-Z0-9_][\u4e00-\u9fa5a-zA-Z0-9\. _-]*$/.test(filename)) {
      return true
    } else {
      return false
    }
  }
}

export default VALIDATE
