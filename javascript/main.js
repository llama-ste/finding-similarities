
function readURL(input) {
    if(input.files && input.files[0]) {
        const reader = new FileReader();
        reader.onload = function(event) {
            $('#imageInput').hide()
            $('#inputLabel').hide()
            $('#label-container').hide()
            $('#preview').attr('src', event.target.result);
            $('#preview').show();
            $('#delete').show();
        }
        reader.readAsDataURL(input.files[0])
    }
}

$('#imageInput').change(function() {
    readURL(this)
})

$('#delete').on('click', () => {
    $('#preview').hide();
    $('#delete').hide();
    $('#imageInput').val('');
    $('#imageInput').show();
    $('#inputLabel').show();
})

$('#replay').on('click', () => {
    $('#preview').hide();
    $('#delete').hide();
    $('#label-container').hide();
    $('#replay').hide();
    $('.result-message').hide();
    $('#imageInput').val('');
    $('#imageInput').show();
    $('.start-btn').show();
    $('#inputLabel').show();
})

// the link to your model provided by Teachable Machine export panel
const URL = "https://teachablemachine.withgoogle.com/models/oiaZynxdV/"

let model, labelContainer, maxPredictions;

// Load the image model and setup the webcam
async function init() {
    const modelURL = URL + "model.json";
    const metadataURL = URL + "metadata.json";

    // load the model and metadata
    // Refer to tmImage.loadFromFiles() in the API to support files from a file picker
    // or files from your local hard drive
    // Note: the pose library adds "tmImage" object to your window (window.tmImage)
    model = await tmImage.load(modelURL, metadataURL);
    maxPredictions = model.getTotalClasses();

    // append elements to the DOM
    labelContainer = document.getElementById("label-container");
    for (let i = 0; i < maxPredictions; i++) { // and class labels
        labelContainer.appendChild(document.createElement("div"));
    }
}
init()

// run the webcam image through the image model
async function predict() {
    // predict can take in an image, video or canvas html element
    let fileCheck = document.getElementById('imageInput').value;
    if (fileCheck) {
        $('#delete').hide()
        $('.start-btn').hide()
        $('#replay').show()
        let image = document.getElementById("preview");
        const prediction = await model.predict(image, false);
        prediction.sort((a, b) => {
            return parseFloat(b.probability) - parseFloat(a.probability);
        })
        let resultTitle, resultExplain;
        switch (prediction[0].className) {
            case "hook":
                resultTitle = "멋있는 아이키"
                resultExplain = "쏼라쏼라"
                break;
            case "ygx":
                resultTitle = "멋있는 리정"
                resultExplain = "쏼라쏼라"
                break;
            case "prowdmon":
                resultTitle = "멋있는 모니카"
                resultExplain = "쏼라쏼라"
                break;
            case "holybang":
                resultTitle = "멋있는 허니제이"
                resultExplain = "쏼라쏼라"
                break;
            case "wayb":
                resultTitle = "멋있는 노제"
                resultExplain = "쏼라쏼라"
                break;
            case "want":
                resultTitle = "멋있는 효진초이"
                resultExplain = "쏼라쏼라"
                break;
            case "lachica":
                resultTitle = "멋있는 가비"
                resultExplain = "쏼라쏼라"
                break;
            case "cocanbutter":
                resultTitle = "멋있는 리헤이"
                resultExplain = "쏼라쏼라"
                break;
            default:
                resultTitle = "알수없음"
                resultExplain = ""
        }
        let title = `<div class="${prediction[0].className} result-title">${resultTitle}</div>`
        let explain = `<div class="result-explain">${resultExplain}</div>`
        $('.result-message').html(title + explain)
        let barWidth;
        for (let i = 0; i < maxPredictions; i++) {
            if (prediction[i].probability.toFixed(2) > 0.1) {
                barWidth = Math.round(prediction[i].probability.toFixed(2) * 100) + "%"
            } else if (prediction[i].probability.toFixed(2) >= 0.01) {
                barWidth = "6%"
            } else {
                barWidth = "3%"
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

            const classPrediction =
                labelTitle + ": " + prediction[i].probability.toFixed(2) * 100 + "%";
            labelContainer.childNodes[i].innerHTML = classPrediction
        }
        $('#label-container').show();
        $('.result-message').show();
    } else {
        alert("이미지를 넣어주세요.")
    }
}
