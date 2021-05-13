var moment = require('moment');
module.exports = {
  book: {
    assets: './assets',
    css: [
      'footer.css'
    ],
  },
  hooks: {
    'page:before': function(page) {
      var _label = 'File Modify: ',
          _format = 'YYYY-MM-DD HH:mm:ss',
          _copy = ''
      if(this.options.pluginsConfig['tbfed-pagefooter']) {
        _label = this.options.pluginsConfig['tbfed-pagefooter']['modify_label'] || '';
        _format = this.options.pluginsConfig['tbfed-pagefooter']['modify_format'] || '';

        var _c = this.options.pluginsConfig['tbfed-pagefooter']['copyright'];
        _copy = _c ? _c + ' all right reserved' + _copy : _copy;
      }
      var _copy = '<span class="copyright">'+_copy+'</span>'
      var str = ' \n\n<footer class="page-footer">' + _copy +
                '</footer>'

      var strComment = '\n\n<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/gitalk@1.6.2/dist/gitalk.css">'+
      '\n\n<script src="https://cdn.jsdelivr.net/npm/gitalk@1.6.2/dist/gitalk.min.js"></script>'+
	  '\n\n<script src="https://wangwei1237.gitee.io/md5.min.js"></script>' +
	  '\n\n<div id="gitalk-container" class="page-footer"></div>' + 
      '\n\n<script src="https://wangwei1237.gitee.io/gittalk-config.js"></script>';  

      page.content = page.content + strComment + str;
      return page;
    }
  },
  filters: {
    date: function(d, format) {
      return moment(d).format(format)
    }
  }
};

