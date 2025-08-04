let capacity = document.getElementById('capacity')
let holded = document.getElementById('hold')
let output = document.getElementById('opt')
let require = document.getElementById('require_num')
let success = document.getElementById('success')
let startbutton = document.getElementById('start')

function refreshopt(){
    cap = Number(capacity.value)

    if (cap == 10 || cap == 7){
        output.value = 3
    }else if (cap == 8 || cap == 11){
        output.value = 4
    }
}
capacity.addEventListener('change', refreshopt)

function refresh(){
    

    cap = Number(capacity.value)
    hod = Number(holded.value)
    req = Number(require.value)
    console.log(cap)
    console.log(hod)
    console.log(req)
    /*
    if (cap == 10 || cap == 7){
        output.textContent = 3
    }else if (cap == 8 || cap == 11){
        output.textContent = 4
    }else{
        alert('钱盒容量不合法')
        console.log(cap)
        return

    }
        */
    opt = Number(output.value)
    console.log(opt)
    if (hod>cap){
        alert('持有通宝数量不可大于钱盒容量')
        return
    }
    if (opt>hod){
        alert('投出数量不可大于钱盒容量')
        return
    }
    /*
    if (req>4){
        alert('需求通宝数量过高')
        return
    }
        */
    if (cap < 0 || hod<0 || req<0 || opt<0){
        alert('禁止输入负值')
        return
    }
    let result = calc(cap, hod, opt, req)
    success.textContent = (result * 100).toFixed(3)+'%'
    console.log(success)
}
function start(){
    refresh()
    let Independents = [holded, require]
    Independents.forEach((item) =>{item.addEventListener("input", refresh)})
    capacity.addEventListener('change', refresh)
    startbutton.innerText ='计算开始'
}


function fact(num){
    let result = 1
    for (let i = 1; i<num+1; i++){
        result *= i
    }
    return result
}

function a_choose_b(a, b){
    if (a<b){
        return 0
    }
    return fact(a)/(fact(b)*fact(a-b))
}

function calc(cap, hod, opt, req){
    let result = 0
    for (let i=req; i<=Math.min(hod, opt); i++){
        result+=(a_choose_b(hod,i)*a_choose_b(cap-hod, opt-i))/a_choose_b(cap, opt)
    }
    return result
}