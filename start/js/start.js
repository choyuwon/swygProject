const main = document.querySelector("#main");
const qna = document.querySelector("#qna");
const result = document.querySelector("#result");
const allTypeSection = document.querySelector('#allType');
const endPoint = 9;
const select = [0, 0, 0, 0, 0, 0]; // I E N C F T

function calResult() {
    let IE, NC, FT;

    if (select[0] > select[1]) {
        IE = 0;
    } else {
        IE = 1;
    }

    if (select[2] > select[3]) {
        NC = 0;
    } else {
        NC = 1;
    }

    if (select[4] > select[5]) {
        FT = 0;
    } else {
        FT = 1;
    }

    const result = [IE, NC, FT];

    if (result.toString() === [0, 0, 0].toString()) {
        return 0; // INF 판다
    } 
    if (result.toString() === [0, 0, 1].toString()) {
        return 1; // INT 올빼미
    }
    if (result.toString() === [0, 1, 0].toString()) {
        return 2; // ICF 여우
    }
    if (result.toString() === [1, 0, 0].toString()) {
        return 3; // ENF 고양이
    }
    if (result.toString() === [0, 1, 1].toString()) {
        return 4; // ICT 베짱이
    }
    if (result.toString() === [1, 1, 0].toString()) {
        return 5; // ECF 호랑이
    }
    if (result.toString() === [1, 0, 1].toString()) {
        return 6; // ENT 햄스터
    }
    if (result.toString() === [1, 1, 1].toString()) {
        return 7; // ECT 토끼
    }
}

function setResult() {
    let point = calResult();
    const resultName = document.querySelector('.resultname');
    resultName.innerHTML = infoList[point].name;

    var resultImg = document.createElement('img');
    const imgDiv = document.querySelector('#resultImg');
    var imgURL = 'img/image-' + point + '.png';
    
    resultImg.src = imgURL;
    resultImg.alt = point;
    resultImg.classList.add('img-fluid');
    imgDiv.appendChild(resultImg);

    const resultDesc = document.querySelector('.resultDesc')
    resultDesc.innerHTML = infoList[point].desc;

    const command = document.querySelector('.command')
    command.innerHTML = infoList[point].command;


}

function goResult() {
    qna.style.WebkitAnimation = "fadeOut 1s";
    qna.style.animation = "fadeOut 1s";
    setTimeout(() => {
        result.style.WebkitAnimation = "fadeIn 1s";
        result.style.animation = "fadeIn 1s";
        setTimeout(() => {
            qna.style.display = "none";
            result.style.display = "block";
        }, 450)})    

        setResult();
        calResult();
}

function addAnswer(answerText, qIdx, idx) {
    var a = document.querySelector('.answerBox');
    var answer = document.createElement('button');
    answer.classList.add('answerList');
    answer.classList.add('my-3');
    answer.classList.add('py-3');
    answer.classList.add('mx-auto');
    answer.classList.add('fadeIn')

    a.appendChild(answer); // 소속
    answer.innerHTML = answerText;
    answer.addEventListener("click", function(){
        var children = document.querySelectorAll('.answerList');
        for (let i = 0; i < children.length; i++) {
            children[i].disabled = true;
            children[i].style.WebkitAnimation = "fadeOut 0.5s";
            children[i].style.animation = "fadeOut 0.5s";
        }
        setTimeout(() => {
            var target = qnaList[qIdx].a[idx].type;
            for (let i = 0; i < target.length; i++) {
                select[target[i]] += 1;
            }
            for (let i = 0; i < children.length; i++) {
                children[i].style.display = 'none';
            }
            goNext(++qIdx);
        }, 450);
    }, false);
}

function goNext(qIdx) {
    if (qIdx === endPoint) {
        goResult();
        return;
    }
    var q = document.querySelector('.qBox');
    q.innerHTML = qnaList[qIdx].q;
    for (let i in qnaList[qIdx].a) {
        addAnswer(qnaList[qIdx].a[i].answer, qIdx, i);
    }
    var status = document.querySelector('.statusBar');
    status.style.width = (100/endPoint) * (qIdx + 1) + '%';
}

function begin() {
    main.style.WebkitAnimation = "fadeOut 1s";
    main.style.animation = "fadeOut 1s";
    setTimeout(() => {
        qna.style.WebkitAnimation = "fadeIn 1s";
        qna.style.animation = "fadeIn 1s";
        setTimeout(() => {
            main.style.display = "none";
            qna.style.display = "block";
        }, 450);
        let qIdx = 0;
        goNext(qIdx);
    }, 450);
}

function showAllTypesPage() {
    // 결과 페이지 숨기기
    const resultSection = document.querySelector('#result');
    resultSection.style.display = 'none';

    // 전체 유형 보기 페이지 표시
    const allTypeSection = document.querySelector('#allType');
    allTypeSection.style.display = 'block';

    // '전체 유형 보기' 버튼 숨기기
    const viewAllTypesButton = document.querySelector('.kakao');
    viewAllTypesButton.style.display = 'none';

    // 'allType' 섹션에 유형 이름과 이미지들을 추가합니다.
    const typenameDiv = document.querySelector('.typename');
    for (let i = 0; i < infoList.length; i++) {
        const typeBlock = document.createElement('div');
        typeBlock.classList.add('typeBlock');

        // 이미지 엘리먼트 생성
        const imgDiv = document.createElement('div');
        imgDiv.classList.add('typeImg');
        const img = document.createElement('img');
        const imgURL = 'img/image-' + i + '.png';
        img.src = imgURL;
        img.alt = i;
        img.classList.add('img-fluid');
        imgDiv.appendChild(img);
        typeBlock.appendChild(imgDiv);

        // 유형 이름 추가
        const typeName = infoList[i].name;
        const typeNameElement = document.createElement('div');
        typeNameElement.classList.add('typeName');
        typeNameElement.textContent = typeName;
        typeBlock.appendChild(typeNameElement);

        typenameDiv.appendChild(typeBlock);
    }
}

function begin2() {
    result.style.WebkitAnimation = "fadeOut 1s";
    result.style.animation = "fadeOut 1s";
    setTimeout(() => {
        allTypeSection.style.WebkitAnimation = "fadeIn 1s";
        allTypeSection.style.animation = "fadeIn 1s";
        setTimeout(() => {
            result.style.display = "none";
            allTypeSection.style.display = "block";
        }, 450);
        showAllTypesPage();
    }, 450);
}

function back() {
    allTypeSection.style.WebkitAnimation = "fadeOut 1s";
    allTypeSection.style.animation = "fadeOut 1s";
    setTimeout(() => {
        result.style.WebkitAnimation = "fadeIn 1s";
        result.style.animation = "fadeIn 1s";
        setTimeout(() => {
            allTypeSection.style.display = "none";
            result.style.display = "block";
        }, 450);
    }, 450);
    const viewAllTypesButton = document.querySelector('.kakao');
    viewAllTypesButton.style.display = 'block';
    viewAllTypesButton.style = 'center';
}
