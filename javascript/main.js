
function readURL(input) {
    if(input.files && input.files[0]) {
        const reader = new FileReader();
        reader.onload = function(event) {
            let imageUrl = `url(${event.target.result})`
            $('.image-preview').attr('src', event.target.result);
            $('.result-preview').css('background-image', imageUrl);
            $('.image-preview').removeClass('d-none');
            $('.start-btn').removeClass('disabled');
            $('.image-label').removeClass('d-flex');
            $('.image-label').addClass('d-none');
        }
        reader.readAsDataURL(input.files[0])
    }
}

$('.image-input').change(function() {
    readURL(this)
})

let wrapper = document.querySelector('.image-wrapper')

wrapper.addEventListener('click', () =>{
    $('.image-input').trigger('click')
})

$('.start-btn').on('click', () => {
    gtag('event', 'start-btn');
    $('.start').removeClass('d-flex')
    $('.start').addClass('d-none')
    $('.loading').removeClass('d-none')
    predict()
})

$('.restart-btn').on('click', () => {
    gtag('event', 'restart-btn');
    $('#label-container').children().remove();
    $('.result-message').children().remove();
    $('.user-message').children().remove();
    $('.result').addClass('d-none')
    $('.image-input').val('')
    $('.start-btn').addClass('disabled')
    $('.image-preview').addClass('d-none')
    $('.image-label').removeClass('d-none')
    $('.image-label').addClass('d-flex')
    $('.start').removeClass('d-none')
    $('.start').addClass('d-flex')
})

// the link to your model provided by Teachable Machine export panel
const URL = "https://teachablemachine.withgoogle.com/models/oiaZynxdV/"

let model, labelContainer, maxPredictions;

// Load the image model and setup the webcam
async function init() {
    const modelURL = "./my_model/model.json";
    const metadataURL = "./my_model/metadata.json"

    // load the model and metadata
    // Refer to tmImage.loadFromFiles() in the API to support files from a file picker
    // or files from your local hard drive
    // Note: the pose library adds "tmImage" object to your window (window.tmImage)
    
    model = await tmImage.load(modelURL, metadataURL);
    maxPredictions = model.getTotalClasses();

}

// run the webcam image through the image model
async function predict() {
    await init()
    // predict can take in an image, video or canvas html element
    let image = document.querySelector('.image-preview')
    const prediction = await model.predict(image, false);
    prediction.sort((a, b) => {
        return parseFloat(b.probability) - parseFloat(a.probability);
    })
    let resultTitle, resultExplain, resultImage;
    switch (prediction[0].className) {
        case "hook":
            resultImage = "https://w.namu.la/s/8535eec672b108fbe37b065203431a3a0e69de663b2c69d55d1a455afe4762960ee65745c2e79969b6095ca8c821ce0273201c6e2ca662f0f136cc05be8d2d6e3bea37af56dcf1df801f39bdd9cd8155"
            resultTitle = "아이키"
            resultExplain = "근데 저희 윤경이, 제가 본 것 중에 제일 섹시했습니다."
            userExplain = "유저"
            break;
        case "ygx":
            resultImage = "https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyMTA5MjlfMjc4%2FMDAxNjMyODQ1MTY4MjMy.KgV-yA7nAdCbQZfjx94uugg48s2H74UczntCsbIeZ-gg.vMpvJAbIPeBq7QiK4enjS9kuLpS9DXUx_ghf4kFpNhIg.JPEG.cwmylee%2Foutput_3532490675.jpg&type=sc960_832"
            resultTitle = "리정"
            resultExplain = "근데... 본인 24살에 뭐하셨어요?"
            userExplain = "유저"
            break;
        case "prowdmon":
            resultImage = "https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyMTA4MjZfMjY4%2FMDAxNjI5OTQwMzg4Mzkw.ZBi5XP_mQOd0dDdPUKUc2rXfIsz4TMzUaOg1o1fBe8Mg.3H_s5fZZ_CcS9NJi8Hqe-HyTT9N9xf9KZCLqRUiP4yog.JPEG.tjgus1237%2FIMG_1297.JPG&type=sc960_832"
            resultTitle = "모니카"
            resultExplain = "제 얼굴 똑바로 보세요"
            userExplain = "유저"
            break;
        case "holybang":
            resultImage = "https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyMTExMDVfODIg%2FMDAxNjM2MTAzNTkxOTI5.RpmFKCPXotYpav3zB5vr64uYiAHHWhVZAECe1eaw-7Eg.iCuDdTLy6qXDxCxTKnvJqQTlNIKLNCFpS2dFizGYPycg.PNG.tjdud1012000%2FKakaoTalk_20211105_180625628_05.png&type=sc960_832"
            resultTitle = "허니제이"
            resultExplain = "잘 봐, 언니들 싸움이다"
            userExplain = "유저"
            break;
        case "wayb":
            resultImage = "https://search.pstatic.net/common/?src=http%3A%2F%2Fimgnews.naver.net%2Fimage%2F417%2F2021%2F08%2F29%2F0000729645_001_20210829093018215.png&type=sc960_832"
            resultTitle = "노제"
            resultExplain = "괜찮아요! 네"
            userExplain = "노제씨 괜찮으세요?"
            break;
        case "want":
            resultImage = "https://search.pstatic.net/common/?src=http%3A%2F%2Fimgnews.naver.net%2Fimage%2F5349%2F2021%2F10%2F06%2F1633478993_395697_20211006091234918.jpg&type=sc960_832"
            resultTitle = "효진초이"
            resultExplain = "그럼 언니 최선을 다해서 이길게"
            userExplain = "유저"
            break;
        case "lachica":
            resultImage = "https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyMTA5MTZfMTUg%2FMDAxNjMxNzc3ODc0MjI0.XmJIMB4_mlCaf2EKxDXHv5Bwy1cUOiahlVRNDJgtZPkg.vKThbi1o6HggHeG7XahOKxFu-Oiilej3eBS9lBWPszcg.JPEG.imbeauty007%2F%25B0%25A1%25BA%25F1.JPG&type=sc960_832"
            resultTitle = "가비"
            resultExplain = "Hey~!"
            userExplain = "Hey~"
            break;
        case "cocanbutter":
            resultImage = "https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyMTEwMTFfMjUz%2FMDAxNjMzOTUwODE5Mjk3.pCUHJt9SIFkzIfiRGxRPBBJbQ-RVW-i2xsNVc0VPV64g.ssuNj-i-7d0fMJeFM3DDNeYl1YdqtKeDr5F-AMs64Zgg.JPEG.eett7777%2FIMG_8196.jpg&type=sc960_832"
            resultTitle = "리헤이"
            resultExplain = "쏼라쏼라"
            userExplain = "유저"
            break;
        default:
            resultTitle = "알수없음"
            resultExplain = ""
            userExplain = "알수없음"
    }
    let title = `<p class="${prediction[0].className} result-title">${resultTitle}</p>`
    let explain = `<p class="result-explain">${resultExplain}</p>`
    $('.leader').attr('src', resultImage)
    $('.result-message').append(title + explain)

    let username = `<p class="${prediction[0].className} user-name">ME</p>`
    let userMessage = `<p class="user-explain">${userExplain}</p>`
    $('.user-message').append(username + userMessage)

    let barWidth;
    for (let i = 0; i < maxPredictions; i++) {
        if (prediction[i].probability.toFixed(2) > 0.1) {
            barWidth = Math.round(prediction[i].probability.toFixed(2) * 100)
        } else if (prediction[i].probability.toFixed(2) <= 0.08) {
            barWidth = "8"
        } else {
            barWidth = barWidth = Math.round(prediction[i].probability.toFixed(2) * 100)
        }
        let labelTitle;
        switch (prediction[i].className) {
            case "hook":
                labelTitle = "아이키"
                break;
            case "ygx":
                labelTitle = "리정"
                break;
            case "prowdmon":
                labelTitle = "모니카"
                break;
            case "holybang":
                labelTitle = "허니제이"
                break;
            case "wayb":
                labelTitle = "노제"
                break;
            case "want":
                labelTitle = "효진초이"
                break;
            case "lachica":
                labelTitle = "가비"
                break;
            case "cocanbutter":
                labelTitle = "리헤이"
                break;
            default:
                labelTitle = "알수없음"
        }

        const progressTitle = `<div class="bar-title d-flex align-items-center w-25">${labelTitle}</div>`
        const progressBar = `<div class="bar-wrapper container position-relative w-75"><div class="${prediction[i].className}-box"></div><div class="d-flex justify-content-center align-items-center ${prediction[i].className}-bar" style="width: ${barWidth}%"><span class="bar-text">${Math.round(prediction[i].probability.toFixed(2) * 100)}%</span></div></div>`

        if (prediction[i].probability.toFixed(2) >= 0.01) {
            $('#label-container').append(`<div class="d-flex ${prediction[i].className}-div">`)
            $(`.${prediction[i].className}-div`).append(progressTitle + progressBar)
        }
    }
    $('.loading').addClass('d-none')
    $('.result').addClass('d-flex')
    $('.result').removeClass('d-none')
}


