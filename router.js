const path = require('path');
const fs = require('fs');
const send = require('koa-send');

function Router(config) {

  if (!(this instanceof Router)) {
    return new Router(config);
  }

  this.config = Object.assign({
    api: 'api',
    filter: [],
    resources: []
  }, config);

  // construct resources directory to check regexp
  let routeRegexp = this.config.resources.reduce((previousValue, currentValue) => {
    return previousValue + currentValue.replace('/', '\/') + '|';
  }, '^\/(').slice(0, -1);
  this.config.resourceRegExp = new RegExp(routeRegexp + ')');

  // construct route table
  this.Routers = this.buildRouter(path.resolve(__dirname, config.api));
}

/**
 * build route table
 */
Router.prototype.buildRouter = function (dir) {

  let routes = {};

  // search all files of current directory 
  let subDirs = fs.readdirSync(dir);
  subDirs.forEach(value => {

    // load file
    let targetdir = path.resolve(dir, value);

    if (!fs.statSync(targetdir).isFile()) {
      routes[value] = this.buildRouter(targetdir);
    } else {
      let globalFilter = this.config.filter;

      // load files
      let handle = require(targetdir);

      // record route info
      routes[value.substring(0, value.indexOf('.'))] = (method, routeParams) => {

        // convert method 
        if (method === 'delete') {
          method = 'del'
        }

        // find method
        if (!handle.hasOwnProperty(method)) {
          return null;
        }

        // collect all ignore filter
        let ignoreFilterFlag = 'ignorefilter';
        let ignoreFilter = [].concat(handle[ignoreFilterFlag], handle[method][ignoreFilterFlag]);

        // collect all filter include gloabl/file/method
        let filterFlag = 'filter';
        let filter = [].concat(globalFilter, handle[filterFlag], handle[method][filterFlag]).filter(value => {
          return value && ignoreFilter.indexOf(value.name) < 0;
        });

        // return matched handle
        return function () {

          // excute filter
          let length = filter.length;
          let index = 0;
          while (index < length) {
            // stop to excute when return false value
            if (filter[index].call(this, filter) === false) {
              return;
            }
            index++;
          }

          // excute handle
          return handle[method].apply(this, routeParams);
        }
      }
    }
  })
  return routes;
}

/**
 * find match handle function
 */
Router.prototype.match = function (router, method, url) {

  // get current route node
  let index = url.indexOf('/');
  let routeNode = url;
  let surplusRoute = '';
  if (index > 0) {
    routeNode = url.substring(0, index);
    surplusRoute = url.substring(index + 1);
  }

  // find specify route
  if (router.hasOwnProperty(routeNode)) {
    let route = router[routeNode];
    if (typeof route === 'function') {
      return route(method, surplusRoute.split('/'));
    }
    return this.match(route, method, surplusRoute);
  }

  // not found route
  return null;
}

/**
 * get match handle function
 */
Router.prototype.route = function (method, url) {
  return this.match(this.Routers, method.toLowerCase(), url.substring(1));
}

/**
 * excute route handle function
 */
Router.prototype.routes = function () {

  let router = this;

  return function* (next) {

    let urlPath = this.path;
    if (urlPath.startsWith('/' + router.config.api)) {
      let handle = router.route(this.method, urlPath.replace('/' + router.config.api, ''));
      if (handle) {
        try {
          this.body = handle.call(this);
          this.set('Content-Type', 'application/json;charset=UTF-8');
        } catch (err) {
          this.status = '500';
          this.body = err;
        }
      } else {
        this.status = '404';
        this.body = 'not found';
      }
    } else if (router.config.resourceRegExp.test(urlPath)) {
      // send specify resouce of path
      yield send(this, urlPath, {})
    }
    else {
      // default return index.html
      yield send(this, '/index.html', {})
    }
    yield next;
  }
}

module.exports = Router;
