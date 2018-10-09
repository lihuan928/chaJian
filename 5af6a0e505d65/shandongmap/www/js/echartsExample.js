var myChart;
//var domCode = document.getElementById('sidebar-code');
//var domGraphic = document.getElementById('graphic');
var domMain = document.getElementById('main');
var needRefresh = false;

var enVersion = location.hash.indexOf('-en') != -1;
var hash = location.hash.replace('-en','');
hash = hash.replace('#','') || (needMap() ? 'shine' : 'shine');
hash += enVersion ? '-en' : '';

var curTheme;
function requireCallback (ec, defaultTheme) {
    curTheme = themeSelector ? defaultTheme : {};
    echarts = ec;
    refresh();
    window.onresize = myChart.resize;
}

var themeSelector = $('#theme-select');
if (themeSelector) {
    themeSelector.html(
        '<option selected="true" name="shine">shine</option>'
    );
   
    
    
    if ($(themeSelector).val(hash.replace('-en', '')).val() != hash.replace('-en', '')) {
        $(themeSelector).val('macarons');
        hash = 'macarons' + enVersion ? '-en' : '';
        window.location.hash = hash;
    }
}


var editor = CodeMirror.fromTextArea(
    document.getElementById("code"),
    { lineNumbers:false }
);
function refresh(isBtnRefresh){
    
    myChart = echarts.init(domMain, curTheme);
//  window.onresize = myChart.resize;
    (new Function(editor.doc.getValue()))();
    myChart.setOption(option, true)
}

function needMap() {
    var href = location.href;
    return href.indexOf('map') != -1
           || href.indexOf('mix3') != -1
           || href.indexOf('mix5') != -1
           || href.indexOf('dataRange') != -1;

}

var echarts;
var developMode = false;

if (developMode) {
    window.esl = null;
    window.define = null;
    window.require = null;
    (function () {
        var script = document.createElement('script');
        script.async = true;

        var pathname = location.pathname;

        var pathSegs = pathname.slice(pathname.indexOf('doc')).split('/');
        var pathLevelArr = new Array(pathSegs.length - 1);
        script.src = pathLevelArr.join + 'asset/js/esl/esl.js';
        if (script.readyState) {
            script.onreadystatechange = fireLoad;
        }
        else {
            script.onload = fireLoad;
        }
        (document.getElementsByTagName('head')[0] || document.body).appendChild(script);
        
        function fireLoad() {
            script.onload = script.onreadystatechange = null;
            setTimeout(loadedListener,100);
        }
        function loadedListener() {
            // for develop
            require.config({
                packages: [
                    {
                        name: 'echarts',
                        location: '../../src',
                        main: 'echarts'
                    },
                    {
                        name: 'zrender',
                        // location: 'http://ecomfe.github.io/zrender/src',
                        location: '../../../zrender/src',
                        main: 'zrender'
                    }
                ]
            });
            launchExample();
        }
    })();
}
else {
    // for echarts online home page
    require.config({
        paths: {
            echarts: 'www/js'
        }
    });
    launchExample();
}

var isExampleLaunched;
function launchExample() {
    if (isExampleLaunched) {
        return;
    }

    // 按需加载
    isExampleLaunched = 1;
    require(
        [
            'echarts',
            'theme/' + hash.replace('-en', ''),
            'echarts/chart/line',
            'echarts/chart/bar',
            'echarts/chart/scatter',
            'echarts/chart/k',
            'echarts/chart/pie',
            'echarts/chart/radar',
            'echarts/chart/force',
            'echarts/chart/chord',
            'echarts/chart/gauge',
            'echarts/chart/funnel',
            'echarts/chart/eventRiver',
            'echarts/chart/venn',
            'echarts/chart/treemap',
            'echarts/chart/tree',
            'echarts/chart/wordCloud',
            'echarts/chart/heatmap',
            needMap() ? 'echarts/chart/map' : 'echarts'
        ],
        requireCallback
    );
}

