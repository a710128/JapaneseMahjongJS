// bitset
"use strict";
var BitSetHelper = {};


//use bitset to speedup process (uglified)
/*
   https://github.com/lemire/FastBitSet.js
   Licensed under the Apache License, Version 2.0 (the "License");
   you may not use this file except in compliance with the License.
   You may obtain a copy of the License at

     http://www.apache.org/licenses/LICENSE-2.0

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.
*/
(function(r){function w(r){this.words=[];if(r){if(Symbol&&Symbol.iterator&&r[Symbol.iterator]!==undefined){var s=r[Symbol.iterator]();var t=s.next();while(!t.done){this.add(t.value);t=s.next()}}else{for(var o=0;o<r.length;o++){this.add(r[o])}}}}w.prototype.add=function(r){this.resize(r);this.words[r>>>5]|=1<<r};w.prototype.flip=function(r){this.resize(r);this.words[r>>>5]^=1<<r};w.prototype.clear=function(){this.words=[]};w.prototype.remove=function(r){this.resize(r);this.words[r>>>5]&=~(1<<r)};w.prototype.isEmpty=function(r){var s=this.words.length;for(var t=0;t<s;t++){if(this.words[t]!==0)return false}return true};w.prototype.has=function(r){return(this.words[r>>>5]&1<<r)!==0};w.prototype.checkedAdd=function(r){this.resize(r);var s=this.words[r>>>5];var t=s|1<<r;this.words[r>>>5]=t;return(t^s)>>>r};w.prototype.trim=function(r){var s=this.words.length;while(s>0&&this.words[s-1]===0){s--}this.words=this.words.slice(0,s)};w.prototype.resize=function(r){var s=r+32>>>5;for(var t=this.words.length;t<s;t++)this.words[t]=0};w.prototype.hammingWeight=function(r){r-=r>>>1&1431655765;r=(r&858993459)+(r>>>2&858993459);return(r+(r>>>4)&252645135)*16843009>>>24};w.prototype.hammingWeight4=function(r,s,t,o){r-=r>>>1&1431655765;s-=s>>>1&1431655765;t-=t>>>1&1431655765;o-=o>>>1&1431655765;r=(r&858993459)+(r>>>2&858993459);s=(s&858993459)+(s>>>2&858993459);t=(t&858993459)+(t>>>2&858993459);o=(o&858993459)+(o>>>2&858993459);r=r+(r>>>4)&252645135;s=s+(s>>>4)&252645135;t=t+(t>>>4)&252645135;o=o+(o>>>4)&252645135;return(r+s+t+o)*16843009>>>24};w.prototype.size=function(){var r=0;var s=this.words.length;var t=this.words;var o=0;for(;o<s;o++){r+=this.hammingWeight(t[o])}return r};w.prototype.array=function(){var r=new Array(this.size());var s=0|0;var t=this.words.length;for(var o=0;o<t;++o){var i=this.words[o];while(i!=0){var d=i&-i;r[s++]=(o<<5)+this.hammingWeight(d-1|0);i^=d}}return r};w.prototype.forEach=function(r){var s=this.words.length;for(var t=0;t<s;++t){var o=this.words[t];while(o!=0){var i=o&-o;r((t<<5)+this.hammingWeight(i-1|0));o^=i}}};w.prototype.clone=function(){var r=Object.create(w.prototype);r.words=this.words.slice();return r};w.prototype.intersects=function(r){var s=Math.min(this.words.length,r.words.length);for(var t=0|0;t<s;++t){if((this.words[t]&r.words[t])!==0)return true}return false};w.prototype.intersection=function(r){var s=Math.min(this.words.length,r.words.length);var t=0|0;for(;t+7<s;t+=8){this.words[t]&=r.words[t];this.words[t+1]&=r.words[t+1];this.words[t+2]&=r.words[t+2];this.words[t+3]&=r.words[t+3];this.words[t+4]&=r.words[t+4];this.words[t+5]&=r.words[t+5];this.words[t+6]&=r.words[t+6];this.words[t+7]&=r.words[t+7]}for(;t<s;++t){this.words[t]&=r.words[t]}var o=this.words.length;for(var t=s;t<o;++t){this.words[t]=0}return this};w.prototype.intersection_size=function(r){var s=Math.min(this.words.length,r.words.length);var t=0|0;for(var o=0|0;o<s;++o){t+=this.hammingWeight(this.words[o]&r.words[o])}return t};w.prototype.new_intersection=function(r){var s=Object.create(w.prototype);var t=Math.min(this.words.length,r.words.length);s.words=new Array(t);var o=t;var i=0|0;for(;i+7<o;i+=8){s.words[i]=this.words[i]&r.words[i];s.words[i+1]=this.words[i+1]&r.words[i+1];s.words[i+2]=this.words[i+2]&r.words[i+2];s.words[i+3]=this.words[i+3]&r.words[i+3];s.words[i+4]=this.words[i+4]&r.words[i+4];s.words[i+5]=this.words[i+5]&r.words[i+5];s.words[i+6]=this.words[i+6]&r.words[i+6];s.words[i+7]=this.words[i+7]&r.words[i+7]}for(;i<o;++i){s.words[i]=this.words[i]&r.words[i]}return s};w.prototype.equals=function(r){var s=Math.min(this.words.length,r.words.length);for(var t=0|0;t<s;++t){if(this.words[t]!=r.words[t])return false}if(this.words.length<r.words.length){var o=r.words.length;for(var t=this.words.length;t<o;++t){if(r.words[t]!=0)return false}}else if(r.words.length<this.words.length){var o=this.words.length;for(var t=r.words.length;t<o;++t){if(this.words[t]!=0)return false}}return true};w.prototype.difference=function(r){var s=Math.min(this.words.length,r.words.length);var t=0|0;for(;t+7<s;t+=8){this.words[t]&=~r.words[t];this.words[t+1]&=~r.words[t+1];this.words[t+2]&=~r.words[t+2];this.words[t+3]&=~r.words[t+3];this.words[t+4]&=~r.words[t+4];this.words[t+5]&=~r.words[t+5];this.words[t+6]&=~r.words[t+6];this.words[t+7]&=~r.words[t+7]}for(;t<s;++t){this.words[t]&=~r.words[t]}return this};w.prototype.difference_size=function(r){var s=Math.min(this.words.length,r.words.length);var t=0|0;var o=0|0;for(;o<s;++o){t+=this.hammingWeight(this.words[o]&~r.words[o])}var i=this.words.length;for(;o<i;++o){t+=this.hammingWeight(this.words[o])}return t};w.prototype.toString=function(){return"{"+this.array().join(",")+"}"};w.prototype.union=function(r){var s=Math.min(this.words.length,r.words.length);var t=0|0;for(;t+7<s;t+=8){this.words[t]|=r.words[t];this.words[t+1]|=r.words[t+1];this.words[t+2]|=r.words[t+2];this.words[t+3]|=r.words[t+3];this.words[t+4]|=r.words[t+4];this.words[t+5]|=r.words[t+5];this.words[t+6]|=r.words[t+6];this.words[t+7]|=r.words[t+7]}for(;t<s;++t){this.words[t]|=r.words[t]}if(this.words.length<r.words.length){this.resize((r.words.length<<5)-1);var o=r.words.length;for(var t=s;t<o;++t){this.words[t]=r.words[t]}}return this};w.prototype.new_union=function(r){var s=Object.create(w.prototype);var t=Math.max(this.words.length,r.words.length);s.words=new Array(t);var o=Math.min(this.words.length,r.words.length);var i=0;for(;i+7<o;i+=8){s.words[i]=this.words[i]|r.words[i];s.words[i+1]=this.words[i+1]|r.words[i+1];s.words[i+2]=this.words[i+2]|r.words[i+2];s.words[i+3]=this.words[i+3]|r.words[i+3];s.words[i+4]=this.words[i+4]|r.words[i+4];s.words[i+5]=this.words[i+5]|r.words[i+5];s.words[i+6]=this.words[i+6]|r.words[i+6];s.words[i+7]=this.words[i+7]|r.words[i+7]}for(;i<o;++i){s.words[i]=this.words[i]|r.words[i]}var d=this.words.length;for(var i=o;i<d;++i){s.words[i]=this.words[i]}var h=r.words.length;for(var i=o;i<h;++i){s.words[i]=r.words[i]}return s};w.prototype.new_difference=function(r){return this.clone().difference(r)};w.prototype.union_size=function(r){var s=Math.min(this.words.length,r.words.length);var t=0|0;for(var o=0|0;o<s;++o){t+=this.hammingWeight(this.words[o]|r.words[o])}if(this.words.length<r.words.length){var i=r.words.length;for(var o=this.words.length;o<i;++o){t+=this.hammingWeight(r.words[o]|0)}}else{var i=this.words.length;for(var o=r.words.length;o<i;++o){t+=this.hammingWeight(this.words[o]|0)}}return t};r.BitSet=w})(BitSetHelper);


// algorithm
var mapping = {
	"0m": 4, "1m": 0, "2m": 1, "3m": 2, "4m": 3, "5m": 4, "6m": 5, "7m": 6, "8m": 7, "9m": 8,
	"0s": 13, "1s": 9, "2s": 10, "3s": 11, "4s": 12, "5s": 13, "6s": 14, "7s": 15, "8s": 16, "9s": 17,
	"0p": 22, "1p": 18, "2p": 19, "3p": 20, "4p": 21, "5p": 22, "6p": 23, "7p": 24, "8p": 25, "9p": 26,
	"1z": 27, "2z": 28, "3z": 29, "4z": 30, "5z": 31, "6z": 32, "7z": 33
};

var make_array = function(l) {
	var ret = [];
	if (l.length == 1) {
		for (var i = 0; i < l[0]; ++ i) {
			ret.push(new BitSetHelper.BitSet);
		}
	}
	else {
		for (var i = 0; i < l[0]; ++ i) {
			ret.push(make_array(l.slice(1)));
		}
	}
	return ret;
}


var calc_num = function(f, hand, rest, offset, recordDeal) {
	for (var i = 1; i <= 9; ++ i) {
		for (var j = 0; j < 10; ++ j) {
			for (var k = 0; k < 10; ++ k) {
				for (var l = 0; l < 3; ++ l) {
					for (var m = 0; m < 3; ++ m) {
						for (var n = 0; n < 2; ++ n) {
							for (var o = -Math.min(hand[i - 1 + offset], k); o <= Math.min(rest[i - 1 + offset], j); ++ o) {
								for (var r = 0; r <= n; ++ r) {
									if (hand[i - 1 + offset] + o - l - m - (n - r) * 2 < 0) continue;
									var frj = j;
									var frk = k;
									var frn = hand[i - 1 + offset] + o - (n - r) * 2;
									if (o < 0) {
										frk = k + o;
									}
									else {
										frj = j - o;
									}
									if (f[i - 1][frj][frk][m][(frn - l - m) % 3][r].has(0)) {
										f[i][j][k][l][m][n].union(f[i - 1][frj][frk][m][(frn - l - m) % 3][r]);
										if ((o < 0 && recordDeal == 0) || (o > 0 && recordDeal == 1)) {
											f[i][j][k][l][m][n].add(i + offset);
										}
									}
								}
							}
						}
					}
				}
			}
		}
	}
	return f;
}

var calc_st = function(f, hand, rest, offset, recordDeal) {
	for(var i = 1; i <= 7; ++ i) {
		for (var j = 0; j < 10; ++ j) {
			for (var k = 0; k < 10; ++ k) {
				for (var n = 0; n < 2; ++ n) {
					for (var o = -Math.min(k, hand[i - 1 + offset]); o <= Math.min(rest[i - 1 + offset], j); ++ o) {
						for (var r = 0; r <= n; ++ r) {
							if (hand[i - 1 + offset] + o - (n - r) * 2 < 0) continue;
							var frn = hand[i - 1 + offset] + o - (n - r) * 2;
							if (frn % 3 != 0) continue;
							
							var frj = j;
							var frk = k;
							if (o < 0) {
								frk = k + o;
							}
							else {
								frj = j - o;
							}
							if (f[i - 1][frj][frk][r].has(0)) {
								f[i][j][k][n].union(f[i - 1][frj][frk][r]);
								if ((o < 0 && recordDeal == 0) || (o > 0 && recordDeal == 1)) {
									f[i][j][k][n].add(i + offset);
								}
							}
						}
					}
				}
			}
		}
	}
	return f;
}

var calc_xts = function(hand, rest) {

	var needP1 = 1, handSum = 0;
	for (var i = 0; i < hand.length; ++ i) {
		handSum += hand[i];
	}
	
	if (handSum == 1 || handSum == 4 || handSum == 7 || handSum == 10 || handSum == 13) needP1 = 1;
	else if (handSum == 2 || handSum == 5 || handSum == 8 || handSum == 11 || handSum == 14) needP1 = 0;
	else {
		return {"type": "error", "data": "Invalid input"}; // invalid
	}
	// check hand sum

	//  0~9  0~9  0~8 0~2 0~2 0~1
	// f[10] [10] [9] [3] [3] [2]
	var f = make_array([10, 10, 10, 3, 3, 2]);
	f[0][0][0][0][0][0].add(0); // set 0th bit to 1

	f = calc_num(f, hand, rest, 0, needP1); // m
	var g = make_array([10, 10, 10, 3, 3, 2]);
	for (var j = 0; j < 10; ++ j) {
		for (var k = 0; k < 10; ++ k) {
			for (var n = 0; n < 2; ++ n) {
				g[0][j][k][0][0][n] = f[9][j][k][0][0][n];
			}
		}
	}
	g = calc_num(g, hand, rest, 9, needP1); // s
	var h = make_array([10, 10, 10, 3, 3, 2]);
	for (var j = 0; j < 10; ++ j) {
		for (var k = 0; k < 10; ++ k) {
			for (var n = 0; n < 2; ++ n) {
				h[0][j][k][0][0][n] = g[9][j][k][0][0][n];
			}
		}
	}
	h = calc_num(h, hand, rest, 18, needP1); // p
	//   0~7  0~9 0~8 0~1
	// l [8] [10] [9] [2]
	var l = make_array([8, 10, 10, 2]);
	for (var j = 0; j < 10; ++ j) {
		for (var k = 0; k < 10; ++ k) {
			for (var n = 0; n < 2; ++n) {
				l[0][j][k][n] = h[9][j][k][0][0][n];
			}
		}
	}
	l = calc_st(l, hand, rest, 27, needP1);
	var xts = -1;
	for (var i = 1; i < 10; ++ i) {
		if (l[7][i][i - needP1][1].has(0)) {
			xts = i - 1;
			break;
		}
	}
	if (xts == -1) return {"type": "error", "data": "Invalid input"};
	var ret = {}, ans;
	if (needP1 == 0) {
		ret = {
			"xts": xts,
			"type": "discard",
			"data": []
		};

		for (var i = 0; i < 34; ++ i) {
			if (l[7][xts + 1][xts + 1][1].has(i + 1)) {
				ret.data.push(i);
			}
		}
	}
	else {
		ret = {
			"xts": xts,
			"type": "deal",
			"data": []
		};
		for (var i = 0; i < 34; ++ i) {
			if (l[7][xts + 1][xts][1].has(i + 1)) {
				ret.data.push(i);
			}
		}
	}
	return ret;
}

var simple_xts = function(s) {
	var buffer = [];
	var hand = [];
	var rest = [];
	for (var i = 0; i < 34; ++ i) {
		hand.push(0);
		rest.push(0);
	}
	for (var j = 0; j < s.length; ++ j) {
		switch(s[j]) {
			case "m":
				for (var i = 0; i < buffer.length; ++ i) {
					hand[buffer[i]] += 1;
				}
				buffer = [];
				break;
			case "s":
			for (var i = 0; i < buffer.length; ++ i) {
					hand[buffer[i] + 9] += 1;
				}
				buffer = [];
				break;
			case "p":
			for (var i = 0; i < buffer.length; ++ i) {
					hand[buffer[i] + 18] += 1;
				}
				buffer = [];
				break;
			case "z":
				for (var i = 0; i < buffer.length; ++ i) {
					hand[buffer[i] + 27] += 1;
				}
				buffer = [];
				break;
			case "1":
				buffer.push(0);
				break;
			case "2":
				buffer.push(1);
				break;
			case "3":
				buffer.push(2);
				break;
			case "4":
				buffer.push(3);
				break;
			case "5":
			case "0":
				buffer.push(4);
				break;
			case "6":
				buffer.push(5);
				break;
			case "7":
				buffer.push(6);
				break;
			case "8":
				buffer.push(7);
				break;
			case "9":
				buffer.push(8);
				break;
			default:
				break;
		}
	}
	for (var i = 0; i < 34; ++ i) {
		rest[i] = 4 - hand[i];
		if (rest[i] < 0) {
			console.log(i, rest);
			console.log("Invalid");
			return;
		}
	}

	var tid2name = function(x) {
		return ((x % 9) + 1).toString() + ("mspz"[parseInt(x / 9)]);
	}

	var xts = calc_xts(hand, rest);
	if (xts["type"] == "error")  {
		console.error(xts["data"]);
	}
	else if (xts["type"] == "deal") {
		console.log( xts["xts"].toString() + "向听");
		console.log("待 " + xts["data"].map(tid2name).join(" "));
	}
	else {
		console.log( xts["xts"].toString() + "向听");
		for (var i = 0; i < xts["data"].length; ++ i) {
			hand[xts["data"][i]] -= 1;
			var res = calc_xts(hand, rest);
			hand[xts["data"][i]] += 1;
			console.log("打 " + tid2name(xts["data"][i]) + " 待 " + res["data"].map(tid2name).join(" ") + " 共 " + res["data"].reduce(function(sum, x) { return sum + rest[x]; }, 0));
		}
	}
}

simple_xts("13889m236p1679s1z6m");

