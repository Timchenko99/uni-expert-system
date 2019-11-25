const csv = require('convert-csv-to-json')

exports.getDataFromFile = function(filePath, delimiter){
    return csv.fieldDelimiter(delimiter).getJsonFromCsv(filePath)
}

exports.getColumnFromJSONMatrix = function(data, columnName){    
    return data.map( obj => { return obj[columnName] })
}