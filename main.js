var mapping = {
	"1m": 0,
	"2m": 1,
	"3m": 2,
	"4m": 3,
	"5m": 4,
	"6m": 5,
	"7m": 6,
	"8m": 7,
	"9m": 8,
	"1s": 9,
	"2s": 10,
	"3s": 11,
	"4s": 12,
	"5s": 13,
	"6s": 14,
	"7s": 15,
	"8s": 16,
	"9s": 17,
	"1p": 18,
	"2p": 19,
	"3p": 20,
	"4p": 21,
	"5p": 22,
	"6p": 23,
	"7p": 24,
	"8p": 25,
	"9p": 26,
	"1z": 27,
	"2z": 28,
	"3z": 29,
	"4z": 30,
	"5z": 31,
	"6z": 32,
	"7z": 33
};

var make_array = function(l) {
	var ret = [];
	if (l.length == 1) {
		for (var i = 0; i < l[0]; ++ i) {
			ret.push(0);
		}
	}
	else {
		for (var i = 0; i < l[0]; ++ i) {
			ret.push(make_array(l.slice(1)));
		}
	}
	return ret;
}


var calc_num = function(f, hand, rest, offset) {
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
									f[i][j][k][l][m][n] += f[i - 1][frj][frk][m][(frn - l - m) % 3][r];
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

var calc_st = function(f, hand, rest, offset) {
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
							f[i][j][k][n] += f[i - 1][frj][frk][r];
						}
					}
				}
			}
		}
	}
	return f;
}

var calc_xts = function(hand, rest) {
	//  0~9  0~9  0~8 0~2 0~2 0~1
	// f[10] [10] [9] [3] [3] [2]
	var f = make_array([10, 10, 10, 3, 3, 2]);
	f[0][0][0][0][0][0] = 1;
	f = calc_num(f, hand, rest, 0); // m
	var g = make_array([10, 10, 10, 3, 3, 2]);
	for (var j = 0; j < 10; ++ j) {
		for (var k = 0; k < 10; ++ k) {
			for (var n = 0; n < 2; ++ n) {
				g[0][j][k][0][0][n] = f[9][j][k][0][0][n];
			}
		}
	}
	g = calc_num(g, hand, rest, 9); // s
	var h = make_array([10, 10, 10, 3, 3, 2]);
	for (var j = 0; j < 10; ++ j) {
		for (var k = 0; k < 10; ++ k) {
			for (var n = 0; n < 2; ++ n) {
				h[0][j][k][0][0][n] = g[9][j][k][0][0][n];
			}
		}
	}
	h = calc_num(h, hand, rest, 18); // p
	
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
	l = calc_st(l, hand, rest, 27);
	
	
	
	var needP1 = 1, handSum = 0;
	for (var i = 0; i < hand.length; ++ i) {
		handSum += hand[i];
	}
	
	if (handSum == 1 || handSum == 4 || handSum == 7 || handSum == 10 || handSum == 13) needP1 = 1;
	else if (handSum == 2 || handSum == 5 || handSum == 8 || handSum == 11 || handSum == 14) needP1 = 0;
	else {
		return -1; // invalid
	}
	
	var ret = -1;
	for (var i = 1; i < 10; ++ i) {
		if (l[7][i][i - needP1][1] > 0) {
			ret = i - 1;
			break;
		}
	}
	return ret;
}

var simple_xts = function(s) {
	var buffer = [];
	var hand = make_array([34]);
	var rest = make_array([34]);
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
			console.log("Invalid");
			return;
		}
	}
	var xts = calc_xts(hand, rest);
	if (xts < 0) {
		console.log("Invalid");
	}
	else {
		console.log(xts);
	}
}

simple_xts("1235568m23466p7z6p");

