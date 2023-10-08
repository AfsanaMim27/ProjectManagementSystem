const connectToDatabase = async () => {
    var mysql = require('mysql2/promise');
    var connection = await mysql.createConnection({
      host     : 'localhost',
      user     : 'root',
      password : 'Pass5577!',
      database : 'projecttrackingsystem'
    });
    return connection;
}

const getPageNumberAndSize = (request) => {
  const { searchParams } = new URL(request.url);
  const page = parseInt(searchParams.get('page'));
  const size = parseInt(searchParams.get('size'));
  return { page, size };
}

const getParamValue = (request, name, type) => {
  const { searchParams } = new URL(request.url);
  const paramValue = searchParams.get(name);
  switch (type) {
    case "int":
      return parseInt(paramValue);      
    default:
      return paramValue;
  }
}

exports.connectToDatabase = connectToDatabase;
exports.getPageNumberAndSize = getPageNumberAndSize;
exports.getParamValue = getParamValue;