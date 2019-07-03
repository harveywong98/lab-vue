export default function formatHtml (strHtml) {
  // strHtml = strHtml.replace(/\style=\w+?\b/g, '')
  strHtml = splitLabel(strHtml, 'SPAN')
  strHtml = splitLabel(strHtml, 'P')
  strHtml = splitLabel(strHtml, 'B')
  strHtml = splitLabel(strHtml, 'FONT')
  strHtml = splitLabel(strHtml, 'TABLE')
  strHtml = splitLabel(strHtml, 'TD')
  strHtml = splitLabel(strHtml, 'TR')
  strHtml = strHtml.replace(/&nbsp;/ig, '')
  // 去除class
  strHtml = strHtml.replace(/\sclass=\w+?\b/g, '')
  // 去除<o:p>
  strHtml = strHtml.replace(/<o:p>(.*?)<\/o:p>/ig, '$1')
  // 去除<?xml.../>
  strHtml = strHtml.replace(/<\?xml.*?\/>/ig, '')
  strHtml = strHtml.replace(/<\w:*?\/>/ig, '')
  // 去除lang
  strHtml = strHtml.replace(/lang=\w+-\w+?\b/g, '')
  // 去除face
  strHtml = strHtml.replace(/face=.+?>/g, '>')
  // 去除vAlign
  strHtml = strHtml.replace(/vAlign=\w+?\b/ig, '')
  // 去掉<st1:>
  strHtml = strHtml.replace(/<st1:chsdate.*?>(.*?)<\/st1:chsdate>/ig, '$1')
  // 去掉多余的空格
  strHtml = strHtml.replace(/<(\w+?)\s+?>/ig, '<$1>')
  // 去掉<o:lock v:ext="edit" aspectratio="t"></o:lock>此类代码
  strHtml = strHtml.replace(/<o:.+?<\/o:\w+?>/ig, '')
  // 去掉<v:> <\v:>
  strHtml = strHtml.replace(/<v:.+?>/g, '')
  strHtml = strHtml.replace(/<\/v:.+?>/g, '')
  // 设置border=1
  strHtml = strHtml.replace(/border=[0-9]/ig, 'border=1')
  // 如果td或table里同时有style="width:.." 和width=21去掉style="width:.."
  // eslint-disable-next-line no-useless-escape
  strHtml = strHtml.replace(/<td(.+?)style=\"width:.+?\"(.+?)width=(.+?)>/ig, '<td$1$2width=$3>')
  // eslint-disable-next-line no-useless-escape
  strHtml = strHtml.replace(/<table(.+?)style=\"width:\s.+?\"(.+?)width=(.+?)>/ig, '<table$1$2width=$3>')
  // 去除size=+0
  strHtml = strHtml.replace(/size=\+\d/ig, '')
  // 多个空格合并一个空格
  strHtml = strHtml.replace(/\s{2,}/g, ' ')
  return strHtml
}

// 用<flag 分割字符串
function splitLabel (strHtml, flag) {
  var arr = strHtml.split('<' + flag + ' ')
  var strLabel = arr[0]
  for (var i = 1; i < arr.length; i++) {
    var temp = splitStyle(arr[i])
    strLabel = strLabel + '<' + flag + ' ' + temp
  }
  return strLabel
}
// 分割style
function splitStyle (strStyle) {
  var regStyle = /^style=/i
  if (!regStyle.test(strStyle)) return strStyle
  var arrStyle = strStyle.split('"')
  if (arrStyle.length > 1) {
    var strStyleRtn = splitChild(arrStyle[1])
    // alert(strStyleRtn);
    // 标记
    var tag = strStyleRtn
    if (tag !== '') {
      strStyleRtn = arrStyle[0] + '"' + strStyleRtn
    }
    for (var i = 2; i < arrStyle.length; i++) {
      strStyleRtn = strStyleRtn + '"' + arrStyle[i]
    }
    if (tag === '') {
      strStyleRtn = strStyleRtn.substr(1, strStyleRtn.length - 1)
    }
    return strStyleRtn
  } else {
    return strStyle
  }
}
// 把style中的每个属性都分割出来
function splitChild (strChild) {
  var regChild = /;/
  // 如果符合regChild则说明style里含有多个属性
  if (regChild.test(strChild)) {
    var arrChild = strChild.split('; ')
    var strRtn = ''
    var strColor = ''
    var strFontSize = ''
    var strFontWeight = ''
    var strWidth = ''
    for (var i = 0; i < arrChild.length; i++) {
      var regColor = /^COLOR:/i
      if (regColor.test(arrChild[i])) {
        strColor = arrChild[i]
      }
      var regFontSize = /^FONT-SIZE:/i
      if (regFontSize.test(arrChild[i])) {
        strFontSize = arrChild[i]
      }
      var regFontWeight = /^FONT-WEIGHT:/i
      if (regFontWeight.test(arrChild[i])) {
        strFontWeight = arrChild[i]
      }
      var regWidht = /^WIDTH:/i
      if (regWidht.test(arrChild[i])) {
        strWidth = arrChild[i]
      }
    }

    if (strColor !== '') {
      strRtn = strRtn + strColor + ';'
    }
    if (strFontSize !== '') {
      strRtn = strRtn + strFontSize + ';'
    }
    if (strFontWeight !== '') {
      strRtn = strRtn + strFontWeight + ';'
    }
    if (strWidth !== '') {
      strRtn = strRtn + strWidth + ';'
    }
    return strRtn
  } else {
    // eslint-disable-next-line no-redeclare
    var strRtn = ''
    // eslint-disable-next-line no-redeclare,no-redeclare
    var regColor = /^COLOR:/i
    // eslint-disable-next-line no-redeclare
    var regFontSize = /^FONT-SIZE:/i
    // eslint-disable-next-line no-redeclare
    var regFontWeight = /^FONT-WEIGHT:/i
    var regWidth = /^WIDTH:/i
    if (regColor.test(strChild)) {
      strRtn = strChild
    }
    if (regFontSize.test(strChild)) {
      strRtn = strChild
    }
    if (regFontWeight.test(strChild)) {
      strRtn = strChild
    }
    if (regWidth.test(strChild)) {
      strRtn = strChild
    }
    return strRtn
  }
}
