function getUser() {
    var xhr = new XMLHttpRequest();
    xhr.onload = function() {
        if(xhr.status === 200){
            var users = JSON.parse(xhr.responseText);
            var list = document.getElementById('list');
            list.innerHTML = '';

            //users의 키를 하나씩 뽑아서 개별로 function 돌리기
            Object.keys(users).map(function (key) {
                var userDiv = document.createElement("div");
                var span = document.createElement("span");
                span.textContent = users[key];

                var edit = document.createElement('button');
                edit.textContent = '수정';
                edit.addEventListener('click', function () {
                    var name = prompt("바꿀 이름 입력");
                    if(!name){
                        return alert("이름을 꼭 입력하세요");
                    }
                    var xhr = new XMLHttpRequest();

                    //1 start
                    xhr.onload = function () {
                        if(xhr.status==200){
                            console.log(xhr.responseText);
                            getUser();
                        } else {
                            console.error(xhr.responseText);
                        }
                    }; ///1

                    xhr.open('PUT', '/users/'+key);
                    xhr.setRequestHeader('Content-Type', 'application/json');
                    xhr.send(JSON.stringify({name : name}));
                }); //click listener

                var remove = document.createElement('button');
                remove.textContent = '삭제';
                remove.addEventListener('click', function () { //삭제 버튼
                    var xhr = new XMLHttpRequest();
                    xhr.onload = function () {
                        if(xhr.status===200){
                            console.log(xhr.responseText);
                            getUser();
                        } else {
                            console.log(xhr.responseText);
                        }
                    };

                    xhr.open('DELETE', '/users' + key);
                    xhr.send();
                }); //삭제 버튼 끝
                userDiv.appendChild(span);
                userDiv.appendChild(edit);
                userDiv.appendChild(remove);
                list.appendChild(userDiv);
            });
        } else {
            console.error(xhr.responseText);
        }
    };
    xhr.open('GET', '/users');
    xhr.send();
} // getUser() 끝



window.onload = getUser; //페이지 로딩 시 바로 호출

//폼 제출
document.getElementById('form').addEventListener('submit', function (e) {
    e.preventDefault();
    var name = e.target.username.value;
    if(!name){
        return alert('이름을 입력하세요');
    }
    var xhr = new XMLHttpRequest();
    xhr.onload = function () {
        if(xhr.status===201){
            console.log(xhr.responseText);
            getUser();
        } else {
            console.error(xhr.responseText);
        }
    };

    xhr.open('POST', '/users');
    xhr.setRequestHeader('Content-type', 'application/json');
    xhr.send(JSON.stringify({name:name}));
    e.target.username.value='';
});