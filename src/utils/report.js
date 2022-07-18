import printJS from 'print-js'
import JSPDF from 'jspdf'
import 'jspdf-autotable'
import moment from 'moment'
import { parseTime, popupCenter } from './index'
import { exportJsonToExcel } from '@/vendor/Export2Excel'
import variables from '@/styles/variables.scss'
import store from '@/store'

/**
 * Exports data to either excel or csv file
 *
 * @param name
 * @param headers
 * @param columns
 * @param data
 * @param type
 * @param willReturnExcel
 * @param customName
 */
export function exportExcel(name, headers, columns, data, type, willReturnExcel, customName = false) {
  const collection = formatJson(columns, data)

  let fileName = typeof name === 'object' ? name.title : name
  if (!customName) {
    fileName = 'List_of_' + fileName.split('-').map(o => o.charAt(0).toUpperCase() + o.slice(1)).join('_') + '_' + moment().format('MM_DD_YYYY')
    fileName = fileName.split(' ').join('_')
  } else {
    const customFileName = fileName.replace(/ /g, '_')
    fileName = customFileName + '_' + moment().format('MM_DD_YYYY')
  }

  const file = exportJsonToExcel({
    header: headers,
    data: collection,
    filename: fileName,
    autoWidth: true,
    bookType: type,
    willReturnExcel: willReturnExcel
  })

  if (willReturnExcel) {
    return { file: file.url, fileName: file.fileName }
  }
}

export function formatJson(filterVal, jsonData) {
  return jsonData.map(v => filterVal.map(j => {
    if (j === 'timestamp') {
      return parseTime(v[j])
    } else {
      return v[j]
    }
  }))
}

/**
 * Exports data to a table-formatted PDF file
 *
 * @param name
 * @param columns
 * @param columnData
 * @param willReturnPDF
 * @param customHeader
 * @param columnStyles
 * @param cellStyles
 * @param customFileName
 */
export function exportPDF(name, columns, columnData, willReturnPDF = false, customHeader = false, columnStyles = null, cellStyles = null, customFileName = false) {
  const table = generateTable(name, columns, columnData, willReturnPDF, customHeader, columnStyles, cellStyles, customFileName)
  if (willReturnPDF) {
    return { file: table.url, fileName: table.pdfName }
  } else {
    popupCenter(table.url, table.pdfName, 1024, 768)
  }
}

/**
 * PrintJS Available Options
 * type: 'json'
 * printable: JSON|Object Array|Array
 * properties: { field, displayName, columnSize: % }
 * gridHeaderStyle: CSS
 * gridStyle: CSS
 * header: Raw HTML
 * style: Raw CSS
 *
 * @param type
 * @param title
 * @param data
 * @param properties
 */

export function print(type, title = '', data = [], properties = {}) {
  if (type === 'json') {
    printJS({
      type: 'json',
      printable: data,
      properties: properties,
      gridHeaderStyle: 'color: white; border-right: 1px solid white; background-color: #7E7E80; margin: 3px;',
      gridStyle: 'border: 1px solid black; text-align: center',
      header: '<h1 class="custom-h3">LIST OF ' + title.split('-').join(' ').toUpperCase() +
        '</h1><div class="record-count">Number of Records Found: ' + data.length + '</div>',
      style: '.custom-h3 { display: block; text-align: center; } ' +
        '.record-count { text-align: right; }' +
        '* { -webkit-print-color-adjust: exact; }'
    })
  } else if (type === 'pdf') {
    const column = properties.map(property => property.displayName)
    const columnData = data.map(elem => Object.values(elem))

    const table = generateTable(title, column, columnData)
    printJS(table.url, type)
  }
}

/**
 *
 * Documentation Here: https://artskydj.github.io/jsPDF/docs
 *
 * @param name -- String|Object
 * @param columns
 * @param columnData
 * @param willReturnPDF
 * @param customHeader
 * @param columnStyles
 * @param cellStyles
 * @param customFileName
 * @returns {{pdfName: *, url: *}}
 */
function generateTable(name, columns, columnData, willReturnPDF = false, customHeader = false, columnStyles = null, cellStyles = null, customFileName = false) {
  // let client = process.env.VUE_APP_CLIENT
  const clientTemplate = process.env.VUE_APP_CLIENT

  const logo = require('@/assets/' + clientTemplate + '/logo.png')
  const imgLogo = new Image()
  imgLogo.src = logo

  const doc = new JSPDF()
  const totalPagesExp = '{total_pages_count_string}'

  var pdfName, header, splitHeader, subHeader
  if (name && typeof name === 'object') {
    pdfName = !customFileName ? 'List_of_' + name.title.split('-').map(o => o.charAt(0).toUpperCase() + o.slice(1)).join('_') + '_' + moment().format('MM_DD_YYYY') + '.pdf'
      : name.file_name + '_' + moment().format('MM_DD_YYYY') + '.pdf'
    header = customHeader ? ('List of ' + name.title).toUpperCase() : ('List of ' + name.title.split('-').join(' ')).toUpperCase()
    splitHeader = doc.splitTextToSize(header, 140)
    subHeader = name.subTitle.toUpperCase()
  } else {
    pdfName = !customFileName ? 'List_of_' + name.split('-').map(o => o.charAt(0).toUpperCase() + o.slice(1)).join('_') + '_' + moment().format('MM_DD_YYYY') + '.pdf'
      : name + '_' + moment().format('MM_DD_YYYY') + '.pdf'
    pdfName = pdfName.split((/[\s/]+/)).join('_')
    header = customHeader ? ('List of ' + name).toUpperCase() : ('List of ' + name.split('-').join(' ')).toUpperCase()
    splitHeader = doc.splitTextToSize(header, 140)
  }

  let additionalTopMargin = 0
  if (splitHeader.length > 1) {
    additionalTopMargin = (8 * splitHeader.length) - 8
  }
  // Number of Records label
  // let xOffset = columnData.length.toString().length * 2
  doc.setFont('helvetica')
  doc.setFontSize(9)
  // lol :)
  // var setWidth = 0
  // if (columnData.length < 1000) {
  //   setWidth = 158
  // }
  // if (columnData.length < 100) {
  //   setWidth = 160
  // }
  // if (columnData.length < 10) {
  //   setWidth = 160
  // }
  const numberOfRecords = 'Number of Records Found: ' + columnData.length.toString()
  const numberOfRecordsOffset = doc.getTextWidth(numberOfRecords)
  doc.text(numberOfRecords, doc.internal.pageSize.width - (numberOfRecordsOffset + 10), 57 + additionalTopMargin)

  doc.autoTable(columns, columnData, {
    title: pdfName,
    margin: { top: 60 + additionalTopMargin, left: 10, right: 10 },
    theme: 'grid',
    didDrawPage: function(data) {
      doc.addImage(imgLogo, 'PNG', data.settings.margin.left, 10, 75, 15)
      doc.line(data.settings.margin.left, 25, 195, 25)
      // doc.text('Date: ' + moment().format('MM/DD/YYYY'), 167, 30)

      // Header
      doc.setFontSize(16)
      doc.setTextColor(40)
      doc.setFontStyle('normal')

      // align header to center
      if (splitHeader.length > 1) {
        let topOffset = 45
        splitHeader.forEach((header) => {
          var textWidth = doc.getTextWidth(header)
          var textOffset = (doc.internal.pageSize.width - textWidth) / 2

          doc.text(header.toUpperCase(), textOffset, topOffset)
          topOffset += 8
        })
      } else {
        var textWidth = doc.getTextWidth(header.toUpperCase())
        var textOffset = (doc.internal.pageSize.width - textWidth) / 2

        doc.text(header.toUpperCase(), textOffset, 45)
      }

      if (subHeader) {
        // align subheader to center
        doc.setFontSize(10)
        doc.setTextColor(40)

        const topOffset = 50
        var subHeaderTextWidth = doc.getTextWidth(subHeader)
        var subHeaderTextOffset = (doc.internal.pageSize.width - subHeaderTextWidth) / 2

        doc.text(subHeader, subHeaderTextOffset, topOffset)
      }

      // Footer
      let str = 'Page ' + doc.internal.getNumberOfPages()
      if (typeof doc.putTotalPages === 'function') {
        str = str + ' of ' + totalPagesExp
      }
      const pageSize = doc.internal.pageSize
      const pageHeight = pageSize.height ? pageSize.height : pageSize.getHeight()
      doc.setFontSize(8)
      var dt = new Date()
      var h = dt.getHours()
      var m = dt.getMinutes() < 10 ? '0' + dt.getMinutes() : dt.getMinutes()
      var ampm = h >= 12 ? 'PM' : 'AM'
      var time = (h > 12) ? (h - 12 + ':' + m + ' ' + ampm) : (h + ':' + m + ' ' + ampm)
      doc.text(`Generated by: ${store.getters.email} on ${moment().format('MM/DD/YYYY')} ${time}`, data.settings.margin.left, pageHeight - 10)
      doc.text(str, doc.internal.pageSize.width - (data.settings.margin.left + 16), pageHeight - 10)
    },
    didParseCell({ doc, cell, column }) {
      if (cell === undefined) {
        return
      }

      const hasCustomWidth = (typeof cell.styles.cellWidth === 'number')

      if (hasCustomWidth || cell.raw == null || cell.colSpan > 1) {
        return
      }

      let text

      if (cell.raw instanceof Node) {
        text = cell.raw.innerText
      } else {
        if (typeof cell.raw === 'object') {
          // not implemented yet
          // when a cell contains other cells (colSpan)
          return
        } else {
          text = '' + cell.raw
        }
      }

      // split cell string by spaces
      const words = text.split(/\s+/)

      // calculate longest word width
      const maxWordUnitWidth = words.map(s => Math.floor(doc.getStringUnitWidth(s) * 100) / 100).reduce((a, b) => Math.max(a, b), 0)
      const maxWordWidth = maxWordUnitWidth * (cell.styles.fontSize / doc.internal.scaleFactor)

      const minWidth = cell.padding('horizontal') + maxWordWidth

      // update minWidth for cell & column
      if (minWidth > cell.minWidth) {
        cell.minWidth = minWidth
      }

      if (cell.minWidth > cell.wrappedWidth) {
        cell.wrappedWidth = cell.minWidth
      }

      if (cell.minWidth > column.minWidth) {
        column.minWidth = cell.minWidth
      }

      if (column.minWidth > column.wrappedWidth) {
        column.wrappedWidth = column.minWidth
      }
    },
    styles: cellStyles != null ? cellStyles : {
      fontSize: 9,
      halign: 'left',
      valign: 'middle'
    },
    headStyles: {
      fillColor: variables.headerBg,
      textColor: variables.headerText,
      halign: 'center'
    },
    columnStyles: columnStyles != null ? columnStyles : { 0: { halign: 'center', cellWidth: '100%', cellPadding: 0 }}
  })

  if (typeof doc.putTotalPages === 'function') {
    doc.putTotalPages(totalPagesExp)
  }

  doc.setProperties({
    title: pdfName
  })

  return { url: doc.output(willReturnPDF ? 'blob' : 'bloburl'), pdfName: pdfName }
}
