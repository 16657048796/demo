



const validate_inputValue = (s) =>{ 
    var pattern = new RegExp("[`~!@#$^&*()=|{}':;',\\[\\].<>/?~！@#￥……&*（）——|{}【】‘；：”“'。，、？]")
    var rs = "";
    var ss=String(s)
    for (var i = 0; i < ss.length; i++) {
        rs = rs + ss.substr(i, 1).replace(pattern, '');
        // console.log( "11",rs)
    }
    
    // console.log(process.evn.NODE_NEV);
    return rs;
}

// const test_code = (value) =>{
//     let reg=/[0-9]$/
//     return reg.test(value)
// }

const test_email = (value) =>{
    let reg=/^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;
    return reg.test(value)
}

const test_pass = (value) =>{
    let reg=/^(\w){6,20}$/
    return reg.test(value)
}

export default{
    validate_inputValue,
    test_email,
    test_pass
}









