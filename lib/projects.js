var qs    = require('qs'),
    http  = require('http'),
    https = require('https');

// ProjectManager
//https://projectsapi.zoho.com/restapi/portal/[PORTALID]/projects/'
var Projects = function (options) {
  options = options || {};

  this.protocol = options.protocol || 'https';
  this.host = options.host || 'projectsapi.zoho.com';
  this.port = options.port || (this.protocol === 'https' ? 443 : 80);

  if (!options.authtoken) {
    return console.log('Error: Zoho Projects instance requires the parameter `authtoken` to be initialized correctly');
  }

  this.authtoken = options.authtoken;
  this.scope = options.scope || 'crmapi';
};


// Get Record
Projects.prototype.getPortals = function (callback) {
	params = {};

	var endpoint = this._endpointComposer('portal');

	if (typeof params === 'function') {
		this._request('GET', endpoint, {}, params);
	} else {
		this._request('GET', endpoint, params, callback);
	}
};

// Get Record
Projects.prototype.getProjects = function (portalId, params, callback) {
	params = params || {};

	//module = module.charAt(0).toUpperCase() + module.slice(1);

  var endpoint = this._endpointComposer('portal/'+portalId+'/projects');

	if (typeof params === 'function') {
		this._request('GET', endpoint, {}, params);
	} else {
		this._request('GET', endpoint, params, callback);
	}
};

// Get Record
Projects.prototype.getRecords = function (module, params, callback) {
  params = params || {};

  module = module.charAt(0).toUpperCase() + module.slice(1);

  var endpoint = module + '/getRecords';
	console.log(endpoint);

  if (typeof params === 'function') {
    this._request('GET', endpoint, {}, params);
  } else {
    this._request('GET', endpoint, params, callback);
  }
};

// Get Users
Projects.prototype.getUsers = function (module, params, callback) {
	params = params || {};

	module = module.charAt(0).toUpperCase() + module.slice(1);

	var endpoint = module + '/getUsers';

	if (typeof params === 'function') {
		this._requestUsers('GET', endpoint, {}, params);
	} else {
		this._requestUsers('GET', endpoint, params, callback);
	}
};


// Get Record By Id
Projects.prototype.getRecordById = function (module, params, callback) {
  params = params || {};

  if (typeof params !== 'object' || !params.id) {
    return callback({ message: 'Error: ID required parameter missing to get record' }, null);
  }

  module = module.charAt(0).toUpperCase() + module.slice(1);

  this._request('GET', module + '/getRecordById', params, callback);
};

// Create Record
Projects.prototype.createRecord = function (module, params, callback) {
  params = params || {};

  if (typeof params !== 'object' || Object.keys(params).length === 0) {
    return callback({ message: 'Error: params object required to create record' }, null);
  }

  var records = params instanceof Array ? params : [params];

  var xml = '<' + module + '>';
  records.forEach(function (params, index) {
    xml += '<row no="' + (index + 1) + '">';
    for (var param in params) {
      if (params.hasOwnProperty(param)) {
        xml += '<FL val="' + param + '">' + params[param] + '</FL>';
      }
    }
    xml += '</row>';
  });
  xml += '</' + module + '>';

  module = module.charAt(0).toUpperCase() + module.slice(1);

  this._request('GET', module + '/insertRecords', { xmlData: xml }, callback);
};

// Update Record
Projects.prototype.updateRecord = function (module, id, params, callback) {
  params = params || {};

  if (typeof params !== 'object' || Object.keys(params).length === 0) {
    return callback({ message: 'Error: params object required to update record' }, null);
  }

  if (typeof id === 'object' || typeof id === 'undefined') {
    return callback({ message: 'Error: ID required parameter missing to update a record' }, null);
  }

  var records = params instanceof Array ? params : [params];

  var xml = '<' + module + '>';
  records.forEach(function (params, index) {
    xml += '<row no="' + (index + 1) + '">';
    for (var param in params) {
      if (params.hasOwnProperty(param)) {
        xml += '<FL val="' + param + '">' + params[param] + '</FL>';
      }
    }
    xml += '</row>';
  });
  xml += '</' + module + '>';

  module = module.charAt(0).toUpperCase() + module.slice(1);

  this._request('POST', module + '/updateRecords', { id: id, xmlData: xml }, callback);
};

// Delete Record
Projects.prototype.deleteRecord = function (module, id, callback) {
  if (typeof id === 'object' || typeof id === 'undefined') {
    return callback({ message: 'Error: ID required parameter missing to delete a record' }, null);
  }

  module = module.charAt(0).toUpperCase() + module.slice(1);

  this._request('GET', module + '/deleteRecords', { id: id }, callback);
};

/* Private functions */

// RequestUsers
Projects.prototype._request = function (method, endpoint, params, callback) {
	params = params || {};

	params.authtoken = this.authtoken;
	params.scope = this.scope;

	var options = {
		host: this.host,
		port: this.port,
		//path: '/crm/private/json/' + endpoint + '?' + qs.stringify(params),
		path:  endpoint + '?' + qs.stringify(params),
		method: method,
		headers: {
			'Content-Length': JSON.stringify(params).length
		}
	};

	var protocol = this.protocol === 'https' ? https : http;

	var req = protocol.request(options, function (res) {
		var data = '';
		res .setEncoding('utf8');
		res.on('data', function (chunk) { data += chunk; });
		res.on('end', function () {
			if (data) {
				data = JSON.parse(data);
				if (data.response && data.response.error) {
					return callback(data, null);
				} else {
					return callback(null, data);
				}
			}

			return callback({ message: 'No content data' }, null);
		});
	});
	req.on('error', function (e) {
		return callback(e, null);
	});

	req.write(JSON.stringify(params));
	req.end();
};

Projects.prototype._endpointComposer = function (module) {
  return '/restapi/' + module.charAt(0).toUpperCase() + module.slice(1) + '/';;
}

/* Private functions */

// Request
//Projects.prototype._request = function (method, endpoint, params, callback) {
//  params = params || {};
//
//  params.authtoken = this.authtoken;
//  //params.scope = this.scope;
//
//  var options = {
//    host: this.host,
//    port: this.port,
//    path:  endpoint + '?' + qs.stringify(params),
//    method: method,
//    headers: {
//      'Content-Length': JSON.stringify(params).length
//    }
//  };
//
//  var protocol = this.protocol === 'https' ? https : http;
//
//  var req = protocol.request(options, function (res) {
//	  console.log(res);
//    var data = '';
//    res .setEncoding('utf8');
//    res.on('data', function (chunk) { data += chunk; });
//    res.on('end', function () {
//      if (data) {
//		  console.log(data);
//        data = JSON.parse(data);
//
//        if (data.response.error) {
//          return callback({
//            code: data.response.error.code,
//            message: data.response.error.message
//          }, null);
//        } else {
//          var object = {};
//
//          object.code = data.response.result.code || 0;
//          object.data = data.response.result.recorddetail;
//          object.data = object.data || data.response.result;
//
//          return callback(null, object);
//        }
//      }
//
//      return callback({ message: 'No content data' }, null);
//    });
//  });
//
//  req.on('error', function (e) {
//    return callback(e, null);
//  });
//
//  req.write(JSON.stringify(params));
//  req.end();
//};

module.exports = Projects;
