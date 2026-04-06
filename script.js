const  checkBoxList = document.querySelectorAll('.custom-checkbox')
const inputFields = document.querySelectorAll('.goal-input')
const errorLable = document.querySelector('.error-label')
const progressbar = document.querySelector('.progress-bar')
const progressvalue = document.querySelector('.progress-value')

checkBoxList.forEach((checkbox) =>{
    checkbox.addEventListener('click', (e) =>{
        const allInputFieldsFilled =[...inputFields].every((input) =>{
            return input.value
        })
        if(allInputFieldsFilled){
        checkbox.parentElement.classList.toggle('completed')
        progressvalue.style.width = '33.33%'

        } else {
            progressbar.classList.add('show-error')
        }
    })
})

inputFields.forEach((input) =>{
    input.addEventListener('focus', () =>{
        progressbar.classList.remove('show-error')
    })
})


// let allInputFieldsFilled = false;

// for (let index = 0; index < array.length; index++) {
//     const element = array[index];
    
// }