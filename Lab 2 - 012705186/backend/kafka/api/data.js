let currentUser = {};

module.exports.setUser = function(data){
console.log("setting current user : ",data);
currentUser.id = data.id;
currentUser.name = data.name;
currentUser.role = data.role;
currentUser.token = data.token;
}

module.exports.setAttr = function(attr,value){
    console.log("setting current user : ",data);
    currentUser.attr = value;
    console.log("Current User: ",currentUser)
    }

module.exports.getUser = function(){
    return currentUser
}    