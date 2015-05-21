var v=(function(){
    var safeColors = ['00','33','66','99','cc','ff'];
    var rand = function() {
        return Math.floor(Math.random()*6);
    };
    var randomColor = function() {
        var r = safeColors[rand()];
        var g = safeColors[rand()];
        var b = safeColors[rand()];
        return "#"+r+g+b;
    };
    
    function addEvent(ele,type,cb,bubble){
        if (ele.addEventListener ) {
            ele.addEventListener( type,cb, bubble || true );
        // If IE event model is used
        } else if ( ele.attachEvent ) {
            ele.attachEvent(type, cb);
        }        
    }
    
    function ready(cb){
        if (document.addEventListener ) {
            document.addEventListener( "DOMContentLoaded", function(){
                cb();
                document.removeEventListener( "DOMContentLoaded", arguments.callee, false );
            }, false );

        // If IE event model is used
        } else if ( document.attachEvent ) {
            document.attachEvent("onreadystatechange", function(){
                if ( document.readyState === "complete" ) {
                    cb();
                    document.detachEvent( "onreadystatechange", arguments.callee );
                }
            });
        }
    }
    
    
    return {
        ready:ready,
        addEvent:addEvent,
        randomColor:randomColor
    };
})();




var timer=0;
var onLoadCallback = function(containerSize, childSize, numberOfChildren) {
    var cDiv = document.createElement('div');
    cDiv.className = 'container';
    cDiv.style.height = cDiv.style.width=containerSize+'px';    
    cDiv.style.overflow='auto';
    document.getElementsByTagName('body')[0].appendChild(cDiv);
    v.addEvent(cDiv,'mouseover',mOverHandler,false);
    v.addEvent(cDiv,'mouseout',mOutHandler,false);
    for(var i=0;i<numberOfChildren;i++){
        (function(){
            var iDiv=document.createElement('div');
            iDiv.className='child';
            iDiv.style.width = childSize+'px';
            iDiv.style.height = childSize+'px';
            iDiv.style.marginBottom='5px'
            iDiv.style.background = v.randomColor();
            cDiv.appendChild(iDiv);
        })();
    }
}
function hide(ele){
    ele.style.display='none';
}
function mOverHandler(event){
    if(event.target.className==='child'){
        timer = setTimeout( function(){
            hide(event.target);
        }, 3000 );
    }
}
function mOutHandler(event){
    if(event.target.className==='child')
        clearTimeout( timer );
}

v.ready(function(){
    onLoadCallback(300, 100, 10);
});