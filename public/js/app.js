console.log('client side java script is loaded.')

fetch('http://puzzle.mead.io/puzzle').then((response) => {
    response.json().then((data) => {
        console.log(data)
    })
}
)

const weatherForm = document.querySelector('form')
const searhcTerm = document.querySelector('input')
const message1 = document.querySelector('#message1')
const message2 = document.querySelector('#message2')


weatherForm.addEventListener('submit' , (event) => {
    event.preventDefault()
    const location = searhcTerm.value
    //console.log('testing!')
    console.log(location)

    if(!location) {
        console.log('No location provided')
    } else {

        message1.textContent = 'Loading.....'
        message2.textContent = ''
        fetch('/weather?address='+location).then((res) => {
        res.json().then((data) => {
            if(data.error){
                message1.textContent = data.error
                //console.log(data.error)
            }
            else{
                message2.textContent = data.weather
                message1.textContent = 'Address : ' + location
                //console.log(data.weather)
                //console.log(data.location)
            }
    })
})
    }
})