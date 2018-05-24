//制作方块材质
var color1=0xFF0000;//left
var color2=0x00FF00;//upper
var color3=0x0000FF;//front


function createNormalMateril(){
    var cubeMaterialArray = [];
    cubeMaterialArray.push( new THREE.MeshBasicMaterial( { color: color1,transparent:true,opacity:1,reflectivity:0.3,refractionRatio:0.2 } ) );
    cubeMaterialArray.push( new THREE.MeshBasicMaterial( { color: color1,transparent:true,opacity:1,reflectivity:0.3,refractionRatio:0.2} ) );
    cubeMaterialArray.push( new THREE.MeshBasicMaterial( { color: color2,transparent:true,opacity:1,reflectivity:0.3,refractionRatio:0.2 } ) );
    cubeMaterialArray.push( new THREE.MeshBasicMaterial( { color: color2,transparent:true,opacity:1,reflectivity:0.3,refractionRatio:0.2} ) );
    cubeMaterialArray.push( new THREE.MeshBasicMaterial( { color: color3,transparent:true,opacity:1,reflectivity:0.3,refractionRatio:0.2 } ) );
    cubeMaterialArray.push( new THREE.MeshBasicMaterial( { color: color3,transparent:true,opacity:1,reflectivity:0.3,refractionRatio:0.2 } ) );
    return new THREE.MeshFaceMaterial( cubeMaterialArray );
}


function initColor() {
    color1=0xff0000;
    color2=0x00ff00;
    color3=0x0000ff;
}


function moveBox(){
    up();
    down();
    left();
    right();
}





var down = (function () {
    var counter = 0;
    //if(counter>=25) return;
    //else {
        return function () {

            //alert(counter);
            if(!isDowm) return 30;
            else if(counter>=25){
                isDowm=false;
                counter=0;
                //alert("aaa");
                changecolor("down");
                replace();
                //alert("aaa");
                secondJudge();
                //voxel1.rotateZGlobally(Math.PI/4);
                return 30;
            }
            if(haveObstacle("down")){
                isDowm=false;
                return;
            }else {
                voxel1.rotateX(Math.PI / (25 * 2));
                voxel1.position.z += 2;
                return counter += 1;
            }
            //voxel1.rotation.x += Math.PI / (25 * 2);
        }
    //}
    //return counter;
})();




var up = (function () {
    var counter = 0;
    //if(counter>=25) return;
    //else {
        return function () {

            //alert(counter);
            if(!isUp) return 30;
            else if(counter>=25){
                isUp=false;
                counter=0;
                changecolor("up");
                replace();
                secondJudge();
                return 30;
            }
            if(haveObstacle("up")){
                isUp=false;
                return;
            }else{
                voxel1.rotateX(-Math.PI / (25 * 2));
                voxel1.position.z -= 2;
                return counter += 1;
            }
            //voxel1.rotation.x -= Math.PI / (25 * 2);
        }
    //}
    //return counter;
})();



var left = (function () {
    var counter = 0;
    //if(counter>=25) return;
    //else {
        return function () {

            //alert(counter);
            if(!isLeft) return 30;
            else if(counter>=25){
                isLeft=false;
                counter=0;
                changecolor("left");
                replace();
                secondJudge();
                return 30;
            }
            if(haveObstacle("left")){
                isLeft=false;
                return;
            }else{
                voxel1.rotateZ(Math.PI / (25 * 2));
                voxel1.position.x -= 2;
                return counter += 1;
            }
        }
    //}
})();


var right = (function () {
    var counter = 0;
    //if(counter>=25) return;
    //else {
        return function () {

            //alert(counter);
            if(!isRight) return 30;
            else if(counter>=25){
                isRight=false;
                counter=0;
                changecolor("right");
                replace();
                //alert("bbb");
                secondJudge();
                return 30;
            }
            if(haveObstacle("right")){
                isRight=false;
                return;
            }else{
                voxel1.rotateZ(-Math.PI / (25 * 2));
                voxel1.position.x += 2;
                return counter += 1;
            }
        }
    //}
})();



function replace(){
    //alert("aaa");
    var tempGeo = new THREE.BoxGeometry( 50, 50, 50 );
    //alert("aaa");
    var tempFaceMaterial = new THREE.MeshBasicMaterial( { color: 0xff0000, opacity: 0.5, transparent: true } );

    var tempMaterial=[];
    tempMaterial.push(new THREE.MeshBasicMaterial({color:color1,transparent:true,opacity:1}));
    tempMaterial.push(new THREE.MeshBasicMaterial({color:color1,transparent:true,opacity:1}));
    tempMaterial.push(new THREE.MeshBasicMaterial({color:color2,transparent:true,opacity:1}));
    tempMaterial.push(new THREE.MeshBasicMaterial({color:color2,transparent:true,opacity:1}));
    tempMaterial.push(new THREE.MeshBasicMaterial({color:color3,transparent:true,opacity:1}));
    tempMaterial.push(new THREE.MeshBasicMaterial({color:color3,transparent:true,opacity:1}));
    //alert("aaa");
    //alert("ddd");
    tempFaceMaterial=new THREE.MeshFaceMaterial(tempMaterial);
    var tempCube=new THREE.Mesh(tempGeo,tempFaceMaterial);
    tempCube.position.x=voxel1.position.x;
    tempCube.position.y=voxel1.position.y;
    tempCube.position.z=voxel1.position.z;
    //tempCube.positionY=voxel1.positionY;
    //tempCube.positionZ=voxel1.positionZ;
    //scene.add(tempCube);
    scene.remove(voxel1);
    boxes.pop();

    voxel1=tempCube;
    // axes = new THREE.AxisHelper(1000);
    // voxel1.add(axes);
    scene.add(voxel1);
    //scene.remove(tempCube);
    boxes.push(voxel1);
}

function changecolor(x){
    switch(x){
        case "up":{
            var tempColor=color2;
            color2=color3;
            color3=tempColor;
            break;
        }
        case "down":{
            var tempColor=color2;
            color2=color3;
            color3=tempColor;
            break;
        }
        case "left":{
            var tempColor=color1;
            color1=color2;
            color2=tempColor;
            break;
        }
        case "right":{
            var tempColor=color1;
            color1=color2;
            color2=tempColor;
            break;
        }
    }
}


function haveObstacle(x){
    if(x=="up"){
        return judgeBoxUp();
    }else if(x=="down"){
        return judgeBoxDown();
    }else if(x=="left"){
        return judgeBoxLeft();
    }else if(x=="right"){
        return judgeBoxRight();
    }else return;
}

function judgeBoxUp() {
    var centerPoint = boxes[0].position.clone();

    
    //确定该点的相对坐标
    var localVertex=new THREE.Vector3( 0, 0, -1 );
    //方向向量初始化
    raycaster.set(centerPoint, localVertex.clone().normalize());
    //检测是否有焦点
    var collisionResults = raycaster.intersectObjects(walls);
    if (collisionResults.length > 0 && collisionResults[0].distance <= 25.1) return true;
    else return false;
}

function judgeBoxDown() {
    var centerPoint = boxes[0].position.clone();


    //确定该点的相对坐标
    var localVertex=new THREE.Vector3( 0, 0, 1 );
    //方向向量初始化
    raycaster.set(centerPoint, localVertex.clone().normalize());
    //检测是否有焦点
    var collisionResults = raycaster.intersectObjects(walls);
    if (collisionResults.length > 0 && collisionResults[0].distance <= 25.1) return true;
    else return false;
}

function judgeBoxLeft() {
    var centerPoint = boxes[0].position.clone();


    //确定该点的相对坐标
    var localVertex=new THREE.Vector3( -1, 0, 0 );
    //方向向量初始化
    raycaster.set(centerPoint, localVertex.clone().normalize());
    //检测是否有焦点
    var collisionResults = raycaster.intersectObjects(walls);
    if (collisionResults.length > 0 && collisionResults[0].distance <= 25.1) return true;
    else return false;
}

function judgeBoxRight() {
    var centerPoint = boxes[0].position.clone();


    //确定该点的相对坐标
    var localVertex=new THREE.Vector3( 1, 0, 0 );
    //方向向量初始化
    raycaster.set(centerPoint, localVertex.clone().normalize());
    //检测是否有焦点
    var collisionResults = raycaster.intersectObjects(walls);
    if (collisionResults.length > 0 && collisionResults[0].distance <= 25.1) return true;
    else return false;
}

function secondJudge() {
    //var self = this;
    var centerPoint = boxes[0].position.clone();
    var points=0;

    for (var vertexIndex = 0; vertexIndex <boxes[0].geometry.vertices.length; vertexIndex++) {
        //确定该点的相对坐标
        var localVertex = boxes[0].geometry.vertices[vertexIndex];
        // //方向向量初始化
        raycaster.set(centerPoint, localVertex.clone().normalize());
        // //检测是否有焦点
         var collisionResults = raycaster.intersectObjects(terminals);
         if (collisionResults.length > 0 && collisionResults[0].distance <= 44) {
             if(color2==0x00ff00){
                 points++;
             }
         }
         if(points>=4){alert("binggo");return;}
    }
}


function movePerson() {
    personUp();
    personDown();
    personLeft();
    personRight();
}

var personUp = (function () {
    var counter = 0;
    return function () {
        if(!personIsUp) return;
        else if(counter>=10){
            personIsUp=false;
            counter=0;
            return ;
        }
        if (judgePerson("up")=="up"){
            //aler("aaa");
            isUp=true;
            personIsUp=false;
            return;
        }else if(judgePerson("up")=="wallup"){
            //alert("bo");
            personIsUp=false;
        }else {
            //alert(judgePerson());
            personBody.position.z -= 5;
            return counter += 1;
        }

    }
})();


var personDown = (function () {
    var counter = 0;
    return function () {
        if(!personIsDowm) return;
        else if(counter>=10){
            personIsDowm=false;
            counter=0;
            return ;
        }
        if(judgePerson("down")=="down"){
            isDowm=true;
            personIsDowm=false;
            return;
        }else if(judgePerson("down")=="walldown"){
            //alert("bo");
            personIsDowm=false;
        }else {
            //alert(judgePerson());
            personBody.position.z += 5;
            return counter += 1;
        }

    }
})();


var personLeft = (function () {
    var counter = 0;
    return function () {
        if(!personIsLeft) return;
        else if(counter>=10){
            personIsLeft=false;
            counter=0;
            return ;
        }
        if(judgePerson("left")=="left"){
            isLeft=true;
            personIsLeft=false;
            return;
        }else if(judgePerson("left")=="wallleft"){
            //alert("bo");
            personIsLeft=false;
        }else {
            personBody.position.x -= 5;
            return counter += 1;
        }
    }
})();


var personRight = (function () {
    var counter = 0;
    return function () {
        if(!personIsRight) return;
        else if(counter>=10){
            personIsRight=false;
            counter=0;
            return ;
        }
        if(judgePerson("right")=="right"){
            isRight=true;
            personIsRight=false;
            return;
        } else if(judgePerson("right")=="wallright"){
            //alert("bo");
            personIsRight=false;
        }else {
            personBody.position.x += 5;
            return counter += 1;
        }
    }
})();


function judgePerson(x){
    if(x=="up"){
        if(judgePersonUp()=="box") return "up";
        else if(judgePersonUp()=="wall") return "wallup";
    }else if(x=="down"){
        if(judgePersonDown()=="box") return "down";
        else if(judgePersonDown()=="wall") return "walldown";
    }else if(x=="left"){
        if(judgePersonLeft()=="box") return "left";
        else if(judgePersonLeft()=="wall") return "wallleft";
    }else if(x=="right"){
        if(judgePersonRight()=="box") return "right";
        else if(judgePersonRight()=="wall") return "wallright";
    } else return "null";
}

function judgePersonUp(){
    var centerPoint = personBody.position.clone();
    //确定该点的相对坐标
    var localVertex =  new THREE.Vector3( 0, 0, -1 );
    //方向向量初始化
    raycaster.set(centerPoint, localVertex.clone().normalize());
    //检测是否有焦点
    var collisionResults = raycaster.intersectObjects(boxes);
    if (collisionResults.length > 0 && collisionResults[0].distance <= 26) {
        return "box";
    }
    collisionResults = raycaster.intersectObjects(walls);
    if (collisionResults.length > 0 && collisionResults[0].distance <= 26) {
        //alert("ao");
        return "wall";
    }
}

function judgePersonDown() {
    var centerPoint = personBody.position.clone();
    //确定该点的相对坐标
    var localVertex =  new THREE.Vector3( 0, 0, 1 );
    //方向向量初始化
    raycaster.set(centerPoint, localVertex.clone().normalize());
    //检测是否有焦点
    var collisionResults = raycaster.intersectObjects(boxes);
    if (collisionResults.length > 0 && collisionResults[0].distance <= 26) {
        return "box";
    }
    collisionResults = raycaster.intersectObjects(walls);
    if (collisionResults.length > 0 && collisionResults[0].distance <= 26) {
        //alert("ao");
        return "wall";
    }
}

function judgePersonLeft() {
    var centerPoint = personBody.position.clone();
    //确定该点的相对坐标
    var localVertex =  new THREE.Vector3( -1, 0, 0 );
    //方向向量初始化
    raycaster.set(centerPoint, localVertex.clone().normalize());
    //检测是否有焦点
    var collisionResults = raycaster.intersectObjects(boxes);
    if (collisionResults.length > 0 && collisionResults[0].distance <= 26) {
        return "box";
    }
    collisionResults = raycaster.intersectObjects(walls);
    if (collisionResults.length > 0 && collisionResults[0].distance <= 26) {
        //alert("ao");
        return "wall";
    }
}

function judgePersonRight() {
    var centerPoint = personBody.position.clone();
    //确定该点的相对坐标
    var localVertex =  new THREE.Vector3( 1, 0, 0 );
    //方向向量初始化
    raycaster.set(centerPoint, localVertex.clone().normalize());
    //检测是否有焦点
    var collisionResults = raycaster.intersectObjects(boxes);
    if (collisionResults.length > 0 && collisionResults[0].distance <= 26) {
        return "box";
    }
    collisionResults = raycaster.intersectObjects(walls);
    if (collisionResults.length > 0 && collisionResults[0].distance <= 26) {
        //alert("ao");
        return "wall";
    }
}


function drawWall(x,y) {
    var wallGeometry=new THREE.BoxGeometry( 50, 30, 50 );
    //var wallMaterial=new THREE.MeshBasicMaterial( {color: 0xfffd91} );
    var wallMaterial=new THREE.MeshBasicMaterial( {color: 0xf5ff72,opacity:1} );
    //var wallMaterial=new THREE.MeshBasicMaterial( {color: 0x1535f7} );
    var wall=new THREE.Mesh(wallGeometry,wallMaterial);
    wall.position.set(x*50,0,y*50);
    wall.position.divideScalar( 50 ).floor().multiplyScalar( 50 ).addScalar( 25 );
    wall.position.y=15;

    scene.add(wall);
    walls.push(wall);
    var hex  = 0x404040;
    var bbox = new THREE.BoundingBoxHelper( wall, hex );
    bbox.update();
    scene.add( bbox );
    return;
}

function drawOuterWall(max) {
    for(var i=-1*max;i<=max;i++){drawWall(i,max);}
    for(var i=-1*max;i<=max;i++){drawWall(i,-1*max);}
    for(var i=-1*max;i<=max;i++){drawWall(max,i);}
    for(var i=-1*max;i<=max;i++){drawWall(-1*max,i);}
}


function abs(x) {
    if(x>=0)return x;
    else return(-1) * x;
}