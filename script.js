const wrapper = document.querySelector('.wrapper')
form = wrapper.querySelector('form')
fileInput = form.querySelector('input')
infotext = form.querySelector('p')
copyBtn = wrapper.querySelector('.copy')
closeBtn = wrapper.querySelector('.close')

function fetchRequest(formData, file) {
    infotext.innerText = 'Scanning Qr code ...'
    fetch("http://api.qrserver.com/v1/read-qr-code/", {
        method: "POST",
        body: formData
    })
    .then( res => res.json())
    .then( result => {
        result = result[0].symbol[0].data
        infotext.innerText = result ? "Upload Qr Code to scan" : "Couldn't scan Qr Code"
        if (!result) {
            return
        }
        wrapper.querySelector('textarea').innerText = result
        form.querySelector('img').src = URL.createObjectURL(file)
        wrapper.classList.add('active')
    })
    .catch( () => {
        infotext.innerText = "Couldn't scan Qr Code"
    })
}

fileInput.addEventListener('change', e => {
    let file = e.target.files[0];
    if (!file) {
        return
    }
    let formData = new FormData()
    formData.append('file', file)
    fetchRequest(formData, file)
})

copyBtn.addEventListener('click', () => {
    let text = wrapper.querySelector('textarea').textContent;
    navigator.clipboard.writeText(text)
})

form.addEventListener('click', () => fileInput.click())

closeBtn.addEventListener('click', () => wrapper.classList.remove('active'))