// ---------------------------------
// 数据
// ---------------------------------
let DATA = []; // 棋盘的棋子信息
let curUser = 0; // 当前棋手（0和1）
const X = 20;
const Y = 20;
const ID = 'qipan';

// 初始化棋盘数组，x y是横向纵向的格子数量
// -1：无棋子 0：棋手0 1：棋手1
function initData() {
  for (let i = 0; i < X; i++) {
    // 构建二维数组
    DATA[i] = [];
    for (let j = 0; j < Y; j++) {
      DATA[i][j] = -1;
    }
  }
}


// -----------------------------------
// 绘制
// -----------------------------------

// 绘制棋盘
function draw() {
  let htmlStr = '';
  for (let i = 0; i < X; i++) {
    for (let j = 0; j < Y; j++) {
      htmlStr += '<div class="qige" onclick="xiaqi('+i+','+j+')">';
      if (DATA[i][j] == 0) {
        htmlStr += '<div class="qizi_white"></div>';
      } else if (DATA[i][j] == 1) {
        htmlStr += '<div class="qizi_black"></div>';
      }
      htmlStr += '</div>';
    }
    htmlStr += '<div class="clear">';
  }
  document.getElementById(ID).innerHTML = htmlStr;
}


// ------------------------------------
// 规则
// ------------------------------------

// 判断是否胜利
function isWin(x, y) {
  if(check1(x, y)) return;
  if(check2(x, y)) return;
  if(check3(x, y)) return;
  if(check4(x, y)) return;
}
// 检查横向
function check1(x, y) {
  const role = DATA[x][y];
  let count = 1;
  let i,j;
  // 判断横向是否连成5子
  j = y; // 向右搜寻
  while (true) {
    j++;
    if (j >= Y) { break; } // 数组越界，循环终止
    if (DATA[x][j] != role) { break; } // 发现对方棋子，循环终止
    count++;
  }
  j = y; // 向左搜寻
  while (true) {
    j--;
    if (j < 0) { break; } // 数组越界，循环终止
    if (DATA[x][j] != role) { break; } // 发现对方棋子，循环终止
    count++;
  }
  if (count >= 5) {
    if (role == 0) {
      alert('白旗胜，游戏结束！');
      initData();
    } else if (role == 1) {
      alert('黑旗胜，游戏结束！');
      initData();
    }
    return true;
  }
  return false;
}

// 检查纵向
function check2(x, y) {
  const role = DATA[x][y];
  let count = 1;
  let i,j;
  // 判断纵向是否连成5子
  count = 1; // 重新计数
  i = x; // 向下搜寻
  while (true) {
    i++;
    if (i >= X) { break; } // 数组越界，循环终止
    if (DATA[i][y] != role) { break; } // 发现对方棋子，循环终止
    count++;
  }
  i = x; // 向上搜寻
  while (true) {
    i--;
    if (i < 0) { break; } // 数组越界，循环终止
    if (DATA[i][y] != role) { break; } // 发现对方棋子，循环终止
    count++;
  }
  if (count >= 5) {
    if (role == 0) {
      alert('白旗胜，游戏结束！');
      initData();
    } else if (role == 1) {
      alert('黑旗胜，游戏结束！');
      initData();
    }
    return true;
  }
  return false;
}

// 检查左上-右下
function check3(x, y) {
  const role = DATA[x][y];
  let count = 1;
  let i,j;
  // 判断左上-右下是否连成5子
  count = 1; // 重新计数
  i = x; // 向右下搜寻
  j = y;
  while (true) {
    i++;j++;
    if (i >= X || j >= Y) { break; } // 数组越界，循环终止
    if (DATA[i][j] != role) { break; } // 发现对方棋子，循环终止
    count++;
  }
  i = x; // 向左上搜寻
  j = y;
  while (true) {
    i--;j--;
    if (i < 0 || j < 0) { break; } // 数组越界，循环终止
    if (DATA[i][j] != role) { break; } // 发现对方棋子，循环终止
    count++;
  }
  if (count >= 5) {
    if (role == 0) {
      alert('白旗胜，游戏结束！');
      initData();
    } else if (role == 1) {
      alert('黑旗胜，游戏结束！');
      initData();
    }
    return true;
  }
  return false;
}

// 检查右上-左下
function check4(x, y) {
  const role = DATA[x][y];
  let count = 1;
  let i,j;
  // 判断右上-左下是否连成5子
  count = 1; // 重新计数
  i = x; // 向左下搜寻
  j = y;
  while (true) {
    i--;j++;
    if (i < 0 || j >= Y) { break; } // 数组越界，循环终止
    if (DATA[i][j] != role) { break; } // 发现对方棋子，循环终止
    count++;
  }
  i = x; // 向右上搜寻
  j = y;
  while (true) {
    i++;j--;
    if (i >= X || j < 0) { break; } // 数组越界，循环终止
    if (DATA[i][j] != role) { break; } // 发现对方棋子，循环终止
    count++;
  }
  if (count >= 5) {
    if (role == 0) {
      alert('白旗胜，游戏结束！');
      initData();
    } else if (role == 1) {
      alert('黑旗胜，游戏结束！');
      initData();
    }
    return true;
  }
  return false;
}


function xiaqi(x, y) {
  // 下棋
  DATA[x][y] = curUser;
  // 棋手轮换
  curUser = (curUser + 1) % 2;
  isWin(x, y);
  // 重新绘制
  draw();

}
