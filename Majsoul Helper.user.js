// ==UserScript==
// @name         Majsoul Helper
// @namespace    https://github.com/a710128
// @version      0.1
// @description  Majsoul 向听数计算器
// @author       a710128
// @match        https://majsoul.union-game.com/0/
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    var workerRunner = URL.createObjectURL(new Blob(['\
        var MahjongAPI = function(){var s={};!function(r){function n(r){if(this.words=[],r)if(Symbol&&Symbol.iterator&&void 0!==r[Symbol.iterator])for(var t=r[Symbol.iterator](),o=t.next();!o.done;)this.add(o.value),o=t.next();else for(var s=0;s<r.length;s++)this.add(r[s])}n.prototype.add=function(r){this.resize(r),this.words[r>>>5]|=1<<r},n.prototype.flip=function(r){this.resize(r),this.words[r>>>5]^=1<<r},n.prototype.clear=function(){this.words=[]},n.prototype.remove=function(r){this.resize(r),this.words[r>>>5]&=~(1<<r)},n.prototype.isEmpty=function(r){for(var t=this.words.length,o=0;o<t;o++)if(0!==this.words[o])return!1;return!0},n.prototype.has=function(r){return 0!=(this.words[r>>>5]&1<<r)},n.prototype.checkedAdd=function(r){this.resize(r);var t=this.words[r>>>5],o=t|1<<r;return((this.words[r>>>5]=o)^t)>>>r},n.prototype.trim=function(r){for(var t=this.words.length;0<t&&0===this.words[t-1];)t--;this.words=this.words.slice(0,t)},n.prototype.resize=function(r){for(var t=r+32>>>5,o=this.words.length;o<t;o++)this.words[o]=0},n.prototype.hammingWeight=function(r){return 16843009*((r=(858993459&(r-=r>>>1&1431655765))+(r>>>2&858993459))+(r>>>4)&252645135)>>>24},n.prototype.hammingWeight4=function(r,t,o,s){return 16843009*((r=(r=(858993459&(r-=r>>>1&1431655765))+(r>>>2&858993459))+(r>>>4)&252645135)+(t=(t=(858993459&(t-=t>>>1&1431655765))+(t>>>2&858993459))+(t>>>4)&252645135)+(o=(o=(858993459&(o-=o>>>1&1431655765))+(o>>>2&858993459))+(o>>>4)&252645135)+(s=(s=(858993459&(s-=s>>>1&1431655765))+(s>>>2&858993459))+(s>>>4)&252645135))>>>24},n.prototype.size=function(){for(var r=0,t=this.words.length,o=this.words,s=0;s<t;s++)r+=this.hammingWeight(o[s]);return r},n.prototype.array=function(){for(var r=new Array(this.size()),t=0,o=this.words.length,s=0;s<o;++s)for(var i=this.words[s];0!=i;){var d=i&-i;r[t++]=(s<<5)+this.hammingWeight(d-1|0),i^=d}return r},n.prototype.forEach=function(r){for(var t=this.words.length,o=0;o<t;++o)for(var s=this.words[o];0!=s;){var i=s&-s;r((o<<5)+this.hammingWeight(i-1|0)),s^=i}},n.prototype.clone=function(){var r=Object.create(n.prototype);return r.words=this.words.slice(),r},n.prototype.intersects=function(r){for(var t=Math.min(this.words.length,r.words.length),o=0;o<t;++o)if(0!=(this.words[o]&r.words[o]))return!0;return!1},n.prototype.intersection=function(r){for(var t=Math.min(this.words.length,r.words.length),o=0;o+7<t;o+=8)this.words[o]&=r.words[o],this.words[o+1]&=r.words[o+1],this.words[o+2]&=r.words[o+2],this.words[o+3]&=r.words[o+3],this.words[o+4]&=r.words[o+4],this.words[o+5]&=r.words[o+5],this.words[o+6]&=r.words[o+6],this.words[o+7]&=r.words[o+7];for(;o<t;++o)this.words[o]&=r.words[o];var s=this.words.length;for(o=t;o<s;++o)this.words[o]=0;return this},n.prototype.intersection_size=function(r){for(var t=Math.min(this.words.length,r.words.length),o=0,s=0;s<t;++s)o+=this.hammingWeight(this.words[s]&r.words[s]);return o},n.prototype.new_intersection=function(r){var t=Object.create(n.prototype),o=Math.min(this.words.length,r.words.length);t.words=new Array(o);for(var s=o,i=0;i+7<s;i+=8)t.words[i]=this.words[i]&r.words[i],t.words[i+1]=this.words[i+1]&r.words[i+1],t.words[i+2]=this.words[i+2]&r.words[i+2],t.words[i+3]=this.words[i+3]&r.words[i+3],t.words[i+4]=this.words[i+4]&r.words[i+4],t.words[i+5]=this.words[i+5]&r.words[i+5],t.words[i+6]=this.words[i+6]&r.words[i+6],t.words[i+7]=this.words[i+7]&r.words[i+7];for(;i<s;++i)t.words[i]=this.words[i]&r.words[i];return t},n.prototype.equals=function(r){for(var t=Math.min(this.words.length,r.words.length),o=0;o<t;++o)if(this.words[o]!=r.words[o])return!1;if(this.words.length<r.words.length){var s=r.words.length;for(o=this.words.length;o<s;++o)if(0!=r.words[o])return!1}else if(r.words.length<this.words.length)for(s=this.words.length,o=r.words.length;o<s;++o)if(0!=this.words[o])return!1;return!0},n.prototype.difference=function(r){for(var t=Math.min(this.words.length,r.words.length),o=0;o+7<t;o+=8)this.words[o]&=~r.words[o],this.words[o+1]&=~r.words[o+1],this.words[o+2]&=~r.words[o+2],this.words[o+3]&=~r.words[o+3],this.words[o+4]&=~r.words[o+4],this.words[o+5]&=~r.words[o+5],this.words[o+6]&=~r.words[o+6],this.words[o+7]&=~r.words[o+7];for(;o<t;++o)this.words[o]&=~r.words[o];return this},n.prototype.difference_size=function(r){for(var t=Math.min(this.words.length,r.words.length),o=0,s=0;s<t;++s)o+=this.hammingWeight(this.words[s]&~r.words[s]);for(var i=this.words.length;s<i;++s)o+=this.hammingWeight(this.words[s]);return o},n.prototype.toString=function(){return"{"+this.array().join(",")+"}"},n.prototype.union=function(r){for(var t=Math.min(this.words.length,r.words.length),o=0;o+7<t;o+=8)this.words[o]|=r.words[o],this.words[o+1]|=r.words[o+1],this.words[o+2]|=r.words[o+2],this.words[o+3]|=r.words[o+3],this.words[o+4]|=r.words[o+4],this.words[o+5]|=r.words[o+5],this.words[o+6]|=r.words[o+6],this.words[o+7]|=r.words[o+7];for(;o<t;++o)this.words[o]|=r.words[o];if(this.words.length<r.words.length){this.resize((r.words.length<<5)-1);var s=r.words.length;for(o=t;o<s;++o)this.words[o]=r.words[o]}return this},n.prototype.new_union=function(r){var t=Object.create(n.prototype),o=Math.max(this.words.length,r.words.length);t.words=new Array(o);for(var s=Math.min(this.words.length,r.words.length),i=0;i+7<s;i+=8)t.words[i]=this.words[i]|r.words[i],t.words[i+1]=this.words[i+1]|r.words[i+1],t.words[i+2]=this.words[i+2]|r.words[i+2],t.words[i+3]=this.words[i+3]|r.words[i+3],t.words[i+4]=this.words[i+4]|r.words[i+4],t.words[i+5]=this.words[i+5]|r.words[i+5],t.words[i+6]=this.words[i+6]|r.words[i+6],t.words[i+7]=this.words[i+7]|r.words[i+7];for(;i<s;++i)t.words[i]=this.words[i]|r.words[i];var d=this.words.length;for(i=s;i<d;++i)t.words[i]=this.words[i];var e=r.words.length;for(i=s;i<e;++i)t.words[i]=r.words[i];return t},n.prototype.new_difference=function(r){return this.clone().difference(r)},n.prototype.union_size=function(r){for(var t=Math.min(this.words.length,r.words.length),o=0,s=0;s<t;++s)o+=this.hammingWeight(this.words[s]|r.words[s]);if(this.words.length<r.words.length){var i=r.words.length;for(s=this.words.length;s<i;++s)o+=this.hammingWeight(0|r.words[s])}else for(i=this.words.length,s=r.words.length;s<i;++s)o+=this.hammingWeight(0|this.words[s]);return o},r.BitSet=n}(s);var p=function(r){var t=[];if(1==r.length)for(var o=0;o<r[0];++o)t.push(new s.BitSet);else for(o=0;o<r[0];++o)t.push(p(r.slice(1)));return t},g=function(r,t,o,s,i){for(var d=1;d<=9;++d)for(var e=0;e<10;++e)for(var n=0;n<10;++n)for(var h=0;h<3;++h)for(var w=0;w<3;++w)for(var a=0;a<2;++a)for(var f=-Math.min(t[d-1+s],n);f<=Math.min(o[d-1+s],e);++f)for(var u=0;u<=a;++u)if(!(t[d-1+s]+f-h-w-2*(a-u)<0)){var l=e,p=n,g=t[d-1+s]+f-2*(a-u);f<0?p=n+f:l=e-f,r[d-1][l][p][w][(g-h-w)%3][u].has(0)&&(r[d][e][n][h][w][a].union(r[d-1][l][p][w][(g-h-w)%3][u]),(f<0&&0==i||0<f&&1==i)&&r[d][e][n][h][w][a].add(d+s))}return r},n=function(r,t){for(var o=1,s=0,i=0;i<r.length;++i)s+=r[i];if(1==s||4==s||7==s||10==s||13==s)o=1;else{if(2!=s&&5!=s&&8!=s&&11!=s&&14!=s)return{type:"error",data:"Invalid input"};o=0}var d=p([10,10,10,3,3,2]);d[0][0][0][0][0][0].add(0),d=g(d,r,t,0,o);for(var e=p([10,10,10,3,3,2]),n=0;n<10;++n)for(var h=0;h<10;++h)for(var w=0;w<2;++w)e[0][n][h][0][0][w]=d[9][n][h][0][0][w];e=g(e,r,t,9,o);var a=p([10,10,10,3,3,2]);for(n=0;n<10;++n)for(h=0;h<10;++h)for(w=0;w<2;++w)a[0][n][h][0][0][w]=e[9][n][h][0][0][w];a=g(a,r,t,18,o);var f=p([8,10,10,2]);for(n=0;n<10;++n)for(h=0;h<10;++h)for(w=0;w<2;++w)f[0][n][h][w]=a[9][n][h][0][0][w];f=function(r,t,o,s,i){for(var d=1;d<=7;++d)for(var e=0;e<10;++e)for(var n=0;n<10;++n)for(var h=0;h<2;++h)for(var w=-Math.min(n,t[d-1+s]);w<=Math.min(o[d-1+s],e);++w)for(var a=0;a<=h;++a)if(!(t[d-1+s]+w-2*(h-a)<0)&&(t[d-1+s]+w-2*(h-a))%3==0){var f=e,u=n;w<0?u=n+w:f=e-w,r[d-1][f][u][a].has(0)&&(r[d][e][n][h].union(r[d-1][f][u][a]),(w<0&&0==i||0<w&&1==i)&&r[d][e][n][h].add(d+s))}return r}(f,r,t,27,o);var u=-1;for(i=1;i<10;++i)if(f[7][i][i-o][1].has(0)){u=i-1;break}if(-1==u)return{type:"error",data:"Invalid input"};var l={};if(0==o){l={xts:u,type:"discard",data:[]};for(i=0;i<34;++i)f[7][u+1][u+1][1].has(i+1)&&l.data.push(i)}else{l={xts:u,type:"deal",data:[]};for(i=0;i<34;++i)f[7][u+1][u][1].has(i+1)&&l.data.push(i)}return l};return function(r,o){var t={type:"",data:[],xts:-1},s=n(r,o);if("error"==s.type)t.type="error",t.data=s.data;else if("deal"==s.type)t.xts=s.xts,t.data=s.data,t.type="deal",t.count=s.data.reduce(function(r,t){return r+o[t]},0);else{t.xts=s.xts,t.type="discard";for(var i=[],d=0;d<s.data.length;++d){r[s.data[d]]-=1;var e=n(r,o);r[s.data[d]]+=1,i.push({discard:s.data[d],deal:e.data,count:e.data.reduce(function(r,t){return r+o[t]},0)})}t.data=i.sort(function(r,t){return t.count-r.count})}return t}}(); \
        self.onmessage = function(event) { \
            self.postMessage(MahjongAPI(event.data.hands, event.data.rest)); \
        }'
    ], {type: 'application/javascript'}));
    var panelDiv = document.createElement("div");
    var toolbar = document.createElement("div");
    var handDiv = document.createElement("div");
    var suginDiv = document.createElement("div");
    var sugsfDiv = document.createElement("div");

    var mapping = {
        "0m": 4, "1m": 0, "2m": 1, "3m": 2, "4m": 3, "5m": 4, "6m": 5, "7m": 6, "8m": 7, "9m": 8,
        "0s": 13, "1s": 9, "2s": 10, "3s": 11, "4s": 12, "5s": 13, "6s": 14, "7s": 15, "8s": 16, "9s": 17,
        "0p": 22, "1p": 18, "2p": 19, "3p": 20, "4p": 21, "5p": 22, "6p": 23, "7p": 24, "8p": 25, "9p": 26,
        "1z": 27, "2z": 28, "3z": 29, "4z": 30, "5z": 31, "6z": 32, "7z": 33
    };
    var hands;
    var rest_in; // 里剩余
    var rest_sf; // 表剩余
    var curr_status = {
        chang: 0,
        ju: 0,
        ben: 0,
        scores: [],
        tiles: [],
        myseat: 0,
        paishan: "",
        dora: ""
    };

    var tid2name = function(x) {
        return ((x % 9) + 1).toString() + ("mspz"[parseInt(x / 9)]);
    }


    var onSelfDiscard = function(tile_in) {
        handDiv.innerHTML = "<span style='font-size: 18px; position: relative; top: -18px;'>当前手牌</span>";
        for (var i = 0; i < 34; ++ i) {
            for (var j = (tile_in == i ? 1 : 0); j < hands[i]; ++ j) {
                var imgElem = document.createElement("div");
                var imgUrl = "https://majsoul.union-game.com/0/v0.4.1.w/scene/Assets/Resource/mjpai/mjp_default/" + tid2name(i) + ".png";
                imgElem.setAttribute("style", "width: 42px; height: 59px; display: inline-block; margin-left: 10px; background: url(" + imgUrl + "); background-size: cover; margin-top: 4px;");
                handDiv.append(imgElem);
            }
        }

        if (tile_in >= 0) {
            (function(){
                var imgElem = document.createElement("div");
                var imgUrl = "https://majsoul.union-game.com/0/v0.4.1.w/scene/Assets/Resource/mjpai/mjp_default/" + tid2name(tile_in) + ".png";
                imgElem.setAttribute("style", "width: 42px; height: 59px; display: inline-block; margin-left: 10px; background: url(" + imgUrl + "); background-size: cover; margin-top: 4px;");
                handDiv.append(imgElem);
            })();
        }

        var worker_in = new Worker(workerRunner);
        var worker_sf = new Worker(workerRunner);
        var worker_err = function (event) {
            console.error( "Worker Error\n" + [
                'ERROR: Line ', event.lineno, ' in ', event.filename, ': ', event.message
            ].join(''));
        };

        worker_in.onerror = worker_err;
        worker_sf.onerror = worker_err;

        worker_in.onmessage = function(event) {
            suginDiv.innerHTML = "<span style='font-size: 14px; position:relative'>" + event.data.xts + "向听</span>";
            for (var i = 0; i < event.data.data.length; ++ i) {
                var sugLine = document.createElement("div");
                sugLine.setAttribute("style", "width: 100%; height: 35px; margin-top: 5px; margin-bottom: 5px; padding-left: 10px; font-size: 14px;");
                sugLine.innerHTML = "<span style='position: relative; font-size: 16px;'>打</span>";
                var imgElem = document.createElement("div");
                var imgUrl = "https://majsoul.union-game.com/0/v0.4.1.w/scene/Assets/Resource/mjpai/mjp_default/" + tid2name(event.data.data[i].discard) + ".png";
                imgElem.setAttribute("style", "width: 21px; height: 30px; display: inline-block; margin-left: 10px; background: url(" + imgUrl + "); background-size: cover; margin-top: 4px;");
                sugLine.append(imgElem);
                sugLine.innerHTML += "<span style='position: relative; font-size: 16px; margin-left: 5px; margin-right: 5px;'>待</span>";
                for (var j = 0; j < event.data.data[i].deal.length; ++ j) {
                    imgElem = document.createElement("div");
                    imgUrl = "https://majsoul.union-game.com/0/v0.4.1.w/scene/Assets/Resource/mjpai/mjp_default/" + tid2name(event.data.data[i].deal[j]) + ".png";
                    imgElem.setAttribute("style", "width: 21px; height: 30px; display: inline-block; margin-left: 10px; background: url(" + imgUrl + "); background-size: cover; margin-top: 4px;");
                    sugLine.append(imgElem);
                }
                sugLine.innerHTML += "<span style='position: relative; font-size: 16px; margin-left: 5px; margin-right: 5px;'>共" + event.data.data[i].count + "枚</span>";
                suginDiv.append(sugLine);
            }
            worker_in.terminate();
        }

        worker_sf.onmessage = function(event) {
            sugsfDiv.innerHTML = "<span style='font-size: 14px; position:relative'>" + event.data.xts + "向听</span>";
            for (var i = 0; i < event.data.data.length; ++ i) {
                var sugLine = document.createElement("div");
                sugLine.setAttribute("style", "width: 100%; height: 35px; margin-top: 5px; margin-bottom: 5px; padding-left: 10px; font-size: 14px;");
                sugLine.innerHTML = "<span style='position: relative; font-size: 16px;'>打</span>";
                var imgElem = document.createElement("div");
                var imgUrl = "https://majsoul.union-game.com/0/v0.4.1.w/scene/Assets/Resource/mjpai/mjp_default/" + tid2name(event.data.data[i].discard) + ".png";
                imgElem.setAttribute("style", "width: 21px; height: 30px; display: inline-block; margin-left: 10px; background: url(" + imgUrl + "); background-size: cover; margin-top: 4px;");
                sugLine.append(imgElem);
                sugLine.innerHTML += "<span style='position: relative; font-size: 16px; margin-left: 5px; margin-right: 5px;'>待</span>";
                for (var j = 0; j < event.data.data[i].deal.length; ++ j) {
                    imgElem = document.createElement("div");
                    imgUrl = "https://majsoul.union-game.com/0/v0.4.1.w/scene/Assets/Resource/mjpai/mjp_default/" + tid2name(event.data.data[i].deal[j]) + ".png";
                    imgElem.setAttribute("style", "width: 21px; height: 30px; display: inline-block; margin-left: 10px; background: url(" + imgUrl + "); background-size: cover; margin-top: 4px;");
                    sugLine.append(imgElem);
                }
                sugLine.innerHTML += "<span style='position: relative; font-size: 16px; margin-left: 5px; margin-right: 5px;'>共" + event.data.data[i].count + "枚</span>";
                sugsfDiv.append(sugLine);
            }
            worker_sf.terminate();
        }


        worker_in.postMessage({"hands": hands, "rest": rest_in});
        worker_sf.postMessage({"hands": hands, "rest": rest_sf});
    }

    var onNewRound = function(data) {
        data = JSON.parse(data);
        curr_status.chang = data.chang;
        curr_status.ju = data.ju;
        curr_status.ben = data.ben;
        curr_status.scores = data.scores;
        curr_status.tiles = [];
        curr_status.paishan = data.paishan;
        curr_status.dora = data.dora;

        hands = [];
        rest_in = [];
        rest_sf = [];

        curr_status.tiles.push(data.tiles0);
        curr_status.tiles.push(data.tiles1);
        curr_status.tiles.push(data.tiles2);
        curr_status.tiles.push(data.tiles3);

    };

    var onHandsChange = function(data) {
        if (hands.length == 0) {
            var ss = data.replace(/\[[0-9|]+\]/g, "").replace(/[,\ ]/g, "");
            var i;
            for (i = 0; i < 4; ++ i) {
                if (curr_status.tiles[i].join("") == ss) {
                    curr_status.myseat = i;
                    break;
                }
            }

            for (i = 0; i < 34; ++ i) {
                hands.push(0);
                rest_in.push(0);
                rest_sf.push(0);
            }
            for (var j = 0; j < 4; ++ j) {
                for (i = 0; i < curr_status.tiles[j].length; ++ i) {
                    if (j == curr_status.myseat) {
                        hands[mapping[curr_status.tiles[j][i]]] += 1;
                    }
                    else {
                        rest_sf[mapping[curr_status.tiles[j][i]]] += 1;
                    }
                }
            }

            for (i = 0; i < curr_status.paishan.length; i += 2) {
                rest_in[mapping[curr_status.paishan.slice(i, i + 2)]] += 1;
            }
            rest_in[mapping[curr_status.dora]] -= 1;

            for (i = 0; i < 34; ++ i) {
                rest_sf[i] += rest_in[i];
            }

            if (curr_status.tiles[curr_status.myseat].length == 14) {
                onSelfDiscard();
            }

        }
    };

    var onDealTile = function(data) {
        data = JSON.parse(data);
        rest_in[mapping[data.tile]] -= 1;
        if (data.seat == curr_status.myseat) {
            rest_sf[mapping[data.tile]] -= 1;
            hands[mapping[data.tile]] += 1;
            onSelfDiscard(mapping[data.tile]);
        }
    };

    var onDealTileFast = function(data) {
        data = JSON.parse(data);
        rest_in[mapping[data.tile]] -= 1;
        if (data.seat == curr_status.myseat) {
            rest_sf[mapping[data.tile]] -= 1;
            hands[mapping[data.tile]] += 1;
        }
    }

    var onDiscardTile = function(data) {
        data = JSON.parse(data);
        if (data.seat == curr_status.myseat) {
            hands[mapping[data.tile]] -= 1;
        }
        else {
            rest_sf[mapping[data.tile]] -= 1;
        }
    };

    var onDiscardTileFast = function(data) {
        data = JSON.parse(data);
        if (data.seat == curr_status.myseat) {
            hands[mapping[data.tile]] -= 1;
        }
        else {
            rest_sf[mapping[data.tile]] -= 1;
        }
    };

    var onChiPengGang = function(data) {
        data = JSON.parse(data);
        var i;
        if (data.seat == curr_status.myseat) {
            for (i = 0; i < data.tiles.length; ++ i) {
                if (data.froms[i] == curr_status.myseat) {
                    hands[mapping[data.tiles[i]]] -= 1;
                }
            }
            onSelfDiscard(-1);
        }
        else {
            for (i = 0; i < data.tiles.length; ++ i) {
                if (data.froms[i] == data.seat) {
                    rest_sf[mapping[data.tiles[i]]] -= 1;
                }
            }
        }
    }

    var onChiPengGangFast = function(data) {
        data = JSON.parse(data);
        var i;
        if (data.seat == curr_status.myseat) {
            for (i = 0; i < data.tiles.length; ++ i) {
                if (data.froms[i] == curr_status.myseat) {
                    hands[mapping[data.tiles[i]]] -= 1;
                }
            }
        }
        else {
            for (i = 0; i < data.tiles.length; ++ i) {
                if (data.froms[i] == data.seat) {
                    rest_sf[mapping[data.tiles[i]]] -= 1;
                }
            }
        }
    }

    var onAnGangAddGang = function(data) {
        data = JSON.parse(data);
        if (data.seat != curr_status.myseat) {
            if (data.type == 3) {
                rest_sf[mapping[data.tiles]] -= 4;
            }
            else if (data.type == 2) {
                rest_sf[mapping[data.tiles]] -= 1;
            }
            else {
                console.log(data);
            }
        }
        else {
            if (data.type == 3) {
                hands[mapping[data.tiles]] -= 4;
            }
            else if (data.type == 2) {
                hands[mapping[data.tiles]] -= 1;
            }
            else {
                console.log(data);
            }
        }
    }

    var afterAppLoaded = function() {
        var oldLog = app.Log.log;

        panelDiv.setAttribute("style", "position: absolute; left: 0; right: 0; bottom: 0px; height: 300px; z-index: 123456; background-color: rgba(255, 255, 255, 0.95); display: none;");
        document.body.append(panelDiv);
        toolbar.setAttribute("style", "position: absolute; width: 30px; height: 30px; right: 15px; bottom: 15px; background-color: #1cbcec; font-size: 24px; text-align: center; z-index:123456;");
        toolbar.innerHTML = "+";
        document.body.append(toolbar);
        toolbar.addEventListener("click", function() {
            toolbar.style.display = "none";
            panelDiv.style.display = "block";
        });
        var closePanel = document.createElement("div");
        closePanel.setAttribute("style", "position: absolute; width: 30px; height: 30px; right: 15px; bottom: 15px; background-color: #1cbcec; font-size: 24px; text-align: center; z-index:123456;");
        closePanel.innerHTML = "-";
        closePanel.addEventListener("click", function() {
            toolbar.style.display = "block";
            panelDiv.style.display = "none";
        });
        panelDiv.append(closePanel);
        panelDiv.append(handDiv);
        panelDiv.append(suginDiv);
        panelDiv.append(sugsfDiv);

        document.body.style["overflowY"] = "hidden";
        handDiv.setAttribute("style", "height: 70px; width: 100%; border-bottom: 1px solid #555555;  font-size: 18px;");
        suginDiv.setAttribute("style", "height: 220px; width: 49%; display: inline-block; border-right: 1px solid #444444; overflow-x: hidden; overflow-y: auto; background-color: rgba(176, 77, 201, 0.2); font-size: 14px;");
        sugsfDiv.setAttribute("style", "height: 220px; width: 49%; display: inline-block; overflow-x: hidden; overflow-y: auto; font-size: 14px;");


        window.app.Log.log = function(e) {
            oldLog.call(window.app.Log, e);

            try {
                var binder = {
                    "ActionNewRound record data:": onNewRound,
                    "hands: ": onHandsChange,
                    "ActionAnGangAddGang record data:": onAnGangAddGang,
                    "ActionDealTile record data:": onDealTile,
                    "ActionDiscardTile record data:": onDiscardTile,
                    "ActionDealTile fastrecord data:": onDealTileFast,
                    "ActionDiscardTile fastrecord data:": onDiscardTileFast,
                    "ActionNewRound fastrecord data:" : onNewRound,
                    "ActionChiPengGang record data:": onChiPengGang,
                    "ActionChiPengGang fastrecord data:": onChiPengGangFast,
                };

                var fd = false;
                for (var key in binder) {
                    if (e.slice(0, key.length) == key) {
                        binder[key](e.slice(key.length));
                        fd = true;
                        break;
                    }
                }

            }catch(e) {
                console.error("Majsoul Helper Error!\n" + e + "\n" + e.stack);
            }
        };
    }

    var waitApp = function() {
        if ("app" in window) {
            afterAppLoaded();
        }
        else {
            setTimeout(waitApp, 500);
        }
    }

    waitApp();
})();