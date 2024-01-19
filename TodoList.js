// import auth from './Auth';

function openModal() {
    document.getElementById("loginModal").style.display = "flex";
}

function closeModal() {
    document.getElementById("loginModal").style.display = "none";
}

function openSignupModal() {
    // 로그인 모달을 닫음
    document.getElementById("loginModal").style.display = "none";
    // 회원가입 모달을 나타나게 함
    document.getElementById("signupModal").style.display = "flex";
}

function closeSignupModal() {
    // 회원가입 모달을 닫음
    document.getElementById("signupModal").style.display = "none";

    // 회원가입 모달의 input 필드 초기화
    document.getElementById("signupId").value = "";
    document.getElementById("signupPassword").value = "";
}


function addTodo() {
    // 새로운 할 일을 생성
    var newTodoInput = document.getElementById("newTodoInput");
    var newTodoText = newTodoInput.value.trim(); // 입력값에서 공백을 제거

    // 빈 입력 상태에서 + 버튼을 눌렀을 때 알림창 띄우기
    if (newTodoText === "") {
        alert("할 일을 입력하세요.");
        return;
    }

    var todoContainer = document.getElementById("todosContainer");

    // 새로운 할 일을 담을 div 생성
    var newTodoDiv = document.createElement("div");
    newTodoDiv.className = "todos";

    // 할 일 텍스트 생성
    var todoText = document.createElement("span");
    todoText.textContent = newTodoText;

    // 랜덤 색상 생성 함수 호출하여 할 일에 적용
    applyRandomColor(newTodoDiv);

    // 완료 버튼 생성
    var completeButton = document.createElement("button");
    completeButton.textContent = "완료";
    completeButton.className = "complete-button";

    completeButton.addEventListener("click", function () {
        // 완료 버튼을 누르면 할 일의 텍스트에 가운데 줄 추가
        todoText.style.textDecoration = "line-through";
        // 완료 버튼을 비활성화
        completeButton.disabled = true;
    });

    // 삭제 버튼 생성
    var deleteButton = document.createElement("button");
    deleteButton.textContent = "삭제";
    deleteButton.className = "delete-button";

    deleteButton.addEventListener("click", function () {
        // 삭제 버튼을 누르면 할 일 삭제
        todoContainer.removeChild(newTodoDiv);
        // black-board 높이 조절
        adjustBlackBoardHeight();
    });

    // 완료 버튼과 삭제 버튼을 todos div의 오른쪽에 배치
    newTodoDiv.appendChild(todoText);
    newTodoDiv.appendChild(completeButton);
    newTodoDiv.appendChild(deleteButton);

    // 할 일을 div에 추가
    todoContainer.appendChild(newTodoDiv);

    // 입력 필드 초기화
    newTodoInput.value = "";

    // black-board 높이 조절
    adjustBlackBoardHeight();

    // 텍스트 길이에 맞게 높이 동적으로 조절
    updateTodoHeight();
}



function applyRandomColor(element) {
    var colors = ["#FFEB81", "#FF81D4", "#81D2FF"];
    var randomColor = colors[Math.floor(Math.random() * colors.length)];
    element.style.backgroundColor = randomColor;
}


function adjustBlackBoardHeight() {
    var blackBoard = document.getElementById("blackBoard");
    var todos = document.querySelectorAll(".todos");

    // 할 일이 5개 이상일 때만 높이 조절을 적용
    if (todos.length > 4) {
        var todosContainer = document.getElementById("todosContainer");

        // 각 할 일의 크기와 margin을 고려하여 높이 계산
        var additionalHeight = (todos.length - 4) * (102+38);

        // 840px보다 작으면 최소 높이 840px로 설정
        var newHeight = Math.max(840, 840 + additionalHeight);

        // 계산된 높이를 black-board에 적용
        blackBoard.style.height = newHeight + "px";
    }
}


// 회원가입 버튼을 눌렀을 때 실행되는 함수
function signup() {
    // 입력된 아이디와 비밀번호 가져오기
    var signupId = document.getElementById("signupId").value;
    var signupPassword = document.getElementById("signupPassword").value;

    // // 중복 체크
    // if (isDuplicate(signupId)) {
    //     alert("이미 사용 중인 아이디입니다.");
    //     return;
    // }

    // 사용자 정보를 배열에 추가
    users.push({ id: signupId, password: signupPassword });

    // 모달 닫기
    closeSignupModal();
}

// 중복확인 버튼을 눌렀을 때 실행되는 함수
function checkDuplicate() {
    var signupId = document.getElementById("signupId").value;

    // 중복 여부를 체크
    if (isDuplicate(signupId)) {
        alert("이미 사용 중인 아이디입니다.");
    } else {
        alert("사용 가능한 아이디입니다.");
    }
}

// 아이디 중복 여부를 체크하는 함수
function isDuplicate(id) {
    return users.some(function(user) {
        return user.id === id;
    });
}

// 사용자 정보를 담을 배열
var users = [
    { id: "user1", password: "pass1" },
    { id: "user2", password: "pass2" },
    { id: "user3", password: "pass3" }
];

