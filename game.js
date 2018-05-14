/*
* 属性
*
*   字符  几个  速度  生命  分数
* 方法
*   产生  掉落  匹配  下一关  重新开始
* */

function Game() {
    this.chars = [
        {value:'Q',url:'char/Q.jpg'},
        {value:'W',url:'char/W.jpg'},
        {value:'E',url:'char/E.jpg'},
        {value:'R',url:'char/R.jpg'},
        {value:'T',url:'char/T.jpg'},
        {value:'Y',url:'char/Y.jpg'},
        {value:'U',url:'char/U.jpg'},
        {value:'I',url:'char/I.jpg'},
        {value:'O',url:'char/O.jpg'},
        {value:'P',url:'char/P.jpg'},
        {value:'A',url:'char/A.jpg'},
        {value:'S',url:'char/S.jpg'},
        {value:'D',url:'char/D.jpg'},
        {value:'F',url:'char/F.jpg'},
        {value:'G',url:'char/G.jpg'},
        {value:'H',url:'char/H.jpg'},
        {value:'J',url:'char/J.jpg'},
        {value:'K',url:'char/K.jpg'},
        {value:'L',url:'char/L.jpg'},
        {value:'Z',url:'char/Z.jpg'},
       ];
    this.length = 5;
    this.speed = 10;
    /* 生命 分值 */
    this.score = 0;
    this.scoreElement = document.querySelector('.score >span');
    this.life = 10;
    this.lifeElement = document.querySelector('.life >span');
    this.gk = 5;
    // 元素位置
    this.positionarr = [];
    // 视图  数据
    this.elementarr = [];
    // LiXingStar
}

Game.prototype = {
    play: function () {
        this.getChars();
        this.drop();
        this.key();
    },
    getChars: function () {
        for (let i = 0; i < this.length; i++) {
            this.getChar()
        }
    },
    getChar: function () {
        let divs = document.createElement('div');
        let tops = Math.round(Math.random() * 100),
            lefts = Math.round(Math.random() * (innerWidth - 400) + 200),
            number = Math.floor(Math.random() * this.chars.length);
        /* 判断 */
        // this.chars[number] =  {}
        // this.elementarr[i].innerText

        do{
           number =  Math.floor(Math.random() * this.chars.length);
        }while( this.checkRepeat(this.chars[number].value ,this.elementarr ));

        do{
            lefts = Math.round(Math.random() * (innerWidth - 400) + 200);
        }while( this.checkPosition(lefts ,this.positionarr ));

        divs.style.cssText = `
         width:50px;height:50px;background:url(${this.chars[number].url}) center / cover ;
         border-radius:5px;position:absolute;left:${lefts}px;top:${tops}px;
         text-align:center;line-height:50px;font-size:0;
       `;

        divs.innerText = this.chars[number].value;

        document.body.appendChild(divs);

        this.elementarr.push(divs);
        this.positionarr.push(lefts);
    },
    checkRepeat:function(value,arr){
        /*let flag = arr.some(function(element){
           return element.innerText == value
        });*/
         let flag = arr.some(element=>element.innerText === value);
        return flag;
    },
    checkPosition:function(value,arr){
        let flag = arr.some(element=> Math.abs(element - value) < 50);
        return flag;
    },
    drop: function () {
        let that = this;
        this.t = setInterval(function () {
            for (let i = 0; i < that.length; i++) {
                let tops = that.elementarr[i].offsetTop + that.speed;

                that.elementarr[i].style.top = tops + 'px';

                if (tops >= 500) {
                    document.body.removeChild(that.elementarr[i]);
                    that.elementarr.splice(i, 1);
                    that.positionarr.splice(i,1);
                    that.getChar();
                    that.life--;
                    that.lifeElement.innerText = that.life;
                    if(that.life === 0){
                        let flag = confirm('游戏结束，是否重新开始?');
                        if(flag){
                           that.restart();
                        }else{
                           window.close();
                        }
                    }
                }
            }
        }, 300)
    },
    key: function () {
        let that = this;
        document.onkeydown = function (e) {
            // e.keyCode
            for (let i = 0; i < that.length; i++) {
                // e.key.toUpperCase()
                if (String.fromCharCode(e.keyCode) == that.elementarr[i].innerText) {
                    document.body.removeChild(that.elementarr[i]);
                    that.elementarr.splice(i, 1);
                    that.positionarr.splice(i,1)
                    that.getChar();
                    that.score++;
                    that.scoreElement.innerText = that.score;
                    if (that.score == that.gk) {
                        that.next();
                    }
                }
            }
        }.bind(this);
    },
    restart: function () {
        /*
        * 初始状态
        */
        clearInterval(this.t);

        this.life = 10;
        this.lifeElement.innerText = this.life;

        this.score = 0;
        this.scoreElement = this.score;

        this.elementarr.forEach(function(value,index){
            document.body.removeChild(value);
        })

        this.elementarr = [];

        this.positionarr = [];

        this.play();
    },

    next:function(){
        this.length++;

        clearInterval(this.t);
        this.elementarr.forEach(function(value,index){
            document.body.removeChild(value);
        })

        this.elementarr = [];
        this.positionarr = [];
        this.gk +=5;
        this.play();
    }

}