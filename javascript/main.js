
document.querySelector('.image-wrapper').addEventListener('click', () =>{
    $('.image-input').trigger('click')
})

$('.start-btn').on('click', () => {
    gtag('event', 'start-btn')
    $('.start').removeClass('d-flex')
    $('.start').addClass('d-none')
    $('.loading').removeClass('d-none')
    $('.loading').addClass('d-flex')
    predict()
})

$('.restart-btn').on('click', () => {
    gtag('event', 'restart-btn')
    $('#label-container').children().remove()
    $('.result-message').children().remove()
    $('.user-message').children().remove()
    $('.result').addClass('d-none')
    $('.image-input').val('')
    $('.start-btn').addClass('disabled')
    $('.image-preview').addClass('d-none')
    $('.image-label').removeClass('d-none')
    $('.image-label').addClass('d-flex')
    $('.start').removeClass('d-none')
    $('.start').addClass('d-flex')
})

$('.image-input').change(function() {
    readURL(this)
})


$(document).ready(function() {
    fetch('https://api.countapi.xyz/hit/llama-ste/swf')
    .then(res => res.json())
    .then(json => {
        $('.hit-counter-text').html(`<small>총 ${json.value}명이 이용했어요😎</small>`)
    })
})


async function predict() {
    let model, maxPredictions
    
    const modelURL = "./my_model/model.json"
    const metadataURL = "./my_model/metadata.json"
    model = await tmImage.load(modelURL, metadataURL)
    maxPredictions = model.getTotalClasses()

    let image = document.querySelector('.image-preview')
    const prediction = await model.predict(image, false)
    prediction.sort((a, b) => {
        return parseFloat(b.probability) - parseFloat(a.probability)
    })
    let resultTitle, resultExplain, resultImage
    switch (prediction[0].className) {
        case "hook":
            resultImage = "./image/aiki.png"
            resultTitle = "아이키"
            resultExplain = "YOUNG한 에너지는 부족하다"
            userExplain = "어머! 어머!"
            break
        case "ygx":
            resultImage = "./image/leejung.png"
            resultTitle = "리정"
            resultExplain = "근데... 본인 24살에 뭐하셨어요?"
            userExplain = "(뼈 맞음..)"
            break
        case "prowdmon":
            resultImage = "./image/monika.png"
            resultTitle = "모니카"
            resultExplain = "제 얼굴 똑바로 보세요"
            userExplain = "(지려버림..)"
            break
        case "holybang":
            resultImage = "./image/honeyj.png"
            resultTitle = "허니제이"
            resultExplain = "잘 봐, 언니들 싸움이다"
            userExplain = "믓찌다(?) 믓찌다 울언니"
            break
        case "wayb":
            resultImage = "./image/noze.png"
            resultTitle = "노제"
            resultExplain = "괜찮아요! 네"
            userExplain = "노제씨 괜찮으세요?"
            break
        case "want":
            resultImage = "./image/hyojinchoi.png"
            resultTitle = "효진초이"
            resultExplain = "나 믿고 그냥 따라와"
            userExplain = "황 금 리 더 효진초이!"
            break
        case "lachica":
            resultImage = "./image/gabee.png"
            resultTitle = "가비"
            resultExplain = "어딜 뺏겨! 내 거를 그치?"
            userExplain = "못 뺏겨!"
            break
        case "cocanbutter":
            resultImage = "./image/rihey.png"
            resultTitle = "리헤이"
            resultExplain = "겁은 하나도 안나지"
            userExplain = "겁나세요?"
            break
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

    let barWidth
    for (let i = 0; i < maxPredictions; i++) {
        if (prediction[i].probability.toFixed(2) > 0.1) {
            barWidth = Math.round(prediction[i].probability.toFixed(2) * 100)
        } else if (prediction[i].probability.toFixed(2) <= 0.08) {
            barWidth = "8"
        } else {
            barWidth = barWidth = Math.round(prediction[i].probability.toFixed(2) * 100)
        }
        let labelTitle
        switch (prediction[i].className) {
            case "hook":
                labelTitle = "아이키"
                break
            case "ygx":
                labelTitle = "리정"
                break
            case "prowdmon":
                labelTitle = "모니카"
                break
            case "holybang":
                labelTitle = "허니제이"
                break
            case "wayb":
                labelTitle = "노제"
                break
            case "want":
                labelTitle = "효진초이"
                break
            case "lachica":
                labelTitle = "가비"
                break
            case "cocanbutter":
                labelTitle = "리헤이"
                break
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
    $('.loading').removeClass('d-flex')
    $('.loading').addClass('d-none')
    $('.result').addClass('d-flex')
    $('.result').removeClass('d-none')
}

function readURL(input) {
    if(input.files && input.files[0]) {
        const reader = new FileReader()
        reader.onload = function(event) {
            let imageUrl = `url(${event.target.result})`
            $('.image-preview').attr('src', event.target.result)
            $('.result-preview').css('background-image', imageUrl)
            $('.image-preview').removeClass('d-none')
            $('.start-btn').removeClass('disabled')
            $('.image-label').removeClass('d-flex')
            $('.image-label').addClass('d-none')
        }
        reader.readAsDataURL(input.files[0])
    }
}


